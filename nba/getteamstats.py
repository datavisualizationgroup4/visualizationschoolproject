import pandas as pd
import os

def ensure_dir(folder):
	# directory = os.path.dirname(file_path)
	if not os.path.exists(folder):
		os.makedirs(folder)

#direct path to user directory
dir_path = os.path.dirname(os.path.realpath(__file__))


def grabTeamData(team, year):
	print('grabbing %s with the year %s' % (team, year))
	pass


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
		ensure_dir(teamYear)

		grabTeamData(teamName, teamYear)

		#return to main dir
		os.chdir(dir_path)

def main():
	filename = 'NBATeams.xlsx'

	populateFolders(filename)

main()