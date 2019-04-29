import json, os
from collections import namedtuple

stats = ['FG', 'FGA', 'FG%', '3P', '3PA', '3P%', 'FT', 'FTA', 'FT%', 'ORB', 'DRB', 'TRB', 'AST', 'STL', 'BLK', 'TOV', 'PF']

def getDirTeam():
	curDir = os.getcwd()
	return curDir[-7:-4]

def getTeamIndex(json, target):
	for x, obj in enumerate(json):
		if obj['TEAM'] == target:
			return x

def getFullTeamName():
	curDir = os.getcwd()
	return curDir[-7:]

def aggreData():
	teamTarget = getDirTeam()
	teamName = getFullTeamName()
	data = {}

	data['TEAM'] = []
	data['GAME'] = []
	for stat in stats:
		data[stat] = []

	# print(data)

	for num in range(0,82):
		filename = 'G' + str(num) + '.json'
		with open(filename) as jsonFile:
			jsonFile = json.load(jsonFile)

			teamIndex = getTeamIndex(jsonFile, teamTarget)
			teamData = jsonFile[teamIndex]

			for stat in stats:
				data[stat].append(teamData['STATS']['BASIC'][stat])
		data['GAME'].append(num+1)
		data['TEAM'].append(str(teamName))
			



			# for stat in stats:
			# 	data[stat].append(jsonFile)

	with open('aggregate.json', 'w') as outfile:
		json.dump(data, outfile, indent = 4)

def getMarginOfVictory(json, goatTeam, goatElo):
	Team = namedtuple('Team' , ['team', 'score', 'record', 'home'])

	t1 = Team(json[0]['TEAM'], json[0]['STATS']['BASIC']['PTS'], json[0]['RECORD'], json[0]['HOME'])
	t2 = Team(json[1]['TEAM'], json[1]['STATS']['BASIC']['PTS'], json[1]['RECORD'], json[1]['HOME'])

	if t1.team != goatTeam:
		t1, t2 = t2, t1

	# print(t1, ' goat team')
	# print(t2, ' other team')
	# print('-------------')

	#returns margin of victory, whether team won or lost, and elo diff..
	if t1.home:
		return (int(t1.score) - 3) - int(t2.score), int(t1.score) > int(t2.score), 1500 - 100
	return int(t1.score)  - int(t2.score), int(t1.score) > int(t2.score), 1500 + 100

def getMarginOfVictory2(json, goatTeam, goatElo):

	elo = {
	80:1800,
	70:1700,
	60:1600,
	50:1500,
	37:1400,
	26:1300,
	18:1200
	}

	Team = namedtuple('Team' , ['team', 'score', 'record', 'home'])

	t1 = Team(json[0]['TEAM'], json[0]['STATS']['BASIC']['PTS'], json[0]['RECORD'], json[0]['HOME'])
	t2 = Team(json[1]['TEAM'], json[1]['STATS']['BASIC']['PTS'], json[1]['RECORD'], json[1]['HOME'])

	if t1.team != goatTeam:
		t1, t2 = t2, t1

	# print(t1, ' goat team')
	# print(t2, ' other team')
	# print('-------------')

	#get the record of the team
	oppoRecord = t2.record.split('-')
	oppWins, oppLoses = int(oppoRecord[0]), int(oppoRecord[1])
	winrate = oppWins/(oppWins+oppLoses) * 100

	# print(winrate, ' ---- winrate')
	closest = None
	difference = 10000000
	for num in [80, 70, 60, 50, 37, 26, 18]:
		if abs(num - winrate) < difference:
			closest = num
			difference = abs(num - winrate)


	# print(elo[closest], ' -- calculated elo')	


	#calculate opponent elo
	oppElo = elo[closest]

	#returns margin of victory, whether team won or lost, and elo diff..
	if t1.home:
		return (int(t1.score) - 3) - int(t2.score), int(t1.score) > int(t2.score), oppElo - 100
	return int(t1.score)  - int(t2.score), int(t1.score) > int(t2.score), oppElo + 100

def calculateExpected(goatElo, oppElo):

	diff = (oppElo - goatElo)/400
	res = (1 / (1 + (10**diff)))

	return res

def calculateK(marginWin, eloDiff):
	numerator = (marginWin + 3)**0.8
	denom = 7.5 + (0.006*eloDiff)
	return 20*(numerator/denom)
		
def evaluateElo():
	elo = [1500]

	goatTeam = getDirTeam();

	for num in range(0,82):
		filename = 'G' + str(num) + '.json'
		with open(filename) as jsonFile:
			jsonFile = json.load(jsonFile)

			#first 10 games... everyone is 1500 to stablize elo first.
			if num < 10:
				margin, goatWon, oppElo = getMarginOfVictory(jsonFile, goatTeam, 0)
			else:
				margin, goatWon, oppElo = getMarginOfVictory2(jsonFile, goatTeam, 0)



			expectedWin = calculateExpected(elo[num], oppElo)
			eloDiff = 0
			if goatWon:
				eloDiff = elo[num] - oppElo
			else:
				eloDiff = oppElo - elo[num]

			calculatedK = calculateK(abs(margin), eloDiff)
			
			newElo = calculatedK*(goatWon - expectedWin) + elo[num]
			elo.append(int(newElo))
			print(int(newElo), ' --- new elo')
			print(' ------- ')
	print(len(elo))

evaluateElo()
