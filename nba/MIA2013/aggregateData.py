import json, os

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

def main():
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

		

main()