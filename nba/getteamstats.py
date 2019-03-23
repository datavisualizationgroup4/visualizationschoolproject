import pandas as pd
import requests, pickle, os
from bs4 import BeautifulSoup

#direct path to user directory
dir_path = os.path.dirname(os.path.realpath(__file__))

def ensure_dir(folder):
	# directory = os.path.dirname(file_path)
	if not os.path.exists(folder):
		os.makedirs(folder)

def grabTeamData(team, year):
	games = []

	request_url = ("https://www.basketball-reference.com/teams/%s/%s.html" %(team, year))
	response = requests.get(request_url)
	soup = BeautifulSoup(response.content, 'html.parser')
	#Finding the tag associated with all the games played for the team for that season
	timeline = soup.find(id = "timeline_results")

	base_url = "https://www.basketball-reference.com"

	#grab all the links for the games
	for day in timeline.findAll('a'):
	    link = day.get('href')
	    
	    if link:
	        games.append(base_url + link)

	return games

def populateFolders(file):
	df = pd.read_excel(file, sheet_name = 'Sheet1')

	print("Column headings:")
	print(df.columns)

	#Create a folder for each team and a subfolder for each year of that team listed on excel
	for i in df.index:
		#Team name -> folder name
		teamName = df['Team'][i]
		ensure_dir(teamName)

		#Newly made dir for the team -> cd to new dir
		teamdir = dir_path + "\\" + teamName
		os.chdir(teamdir)

		#Create new dir for years of the teams
		teamYear = df['Year'][i]
		ensure_dir(str(teamYear))

		yeardir = teamdir + "\\" + str(teamYear)
		os.chdir(yeardir)

		# for num in range(1,83):
		# 	ensure_dir("G" + str(num))
		games = grabTeamData(teamName, teamYear)
		with open('games_link.txt', 'a') as f:
			f.write('\n'.join(games))

		#return to main dir
		os.chdir(dir_path)

def main():
	filename = 'NBATeams.xlsx'
	populateFolders(filename)



main()