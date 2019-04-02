import pandas as pd
import requests, pickle, os, selenium, json
from selenium import webdriver
from tqdm import tqdm
from bs4 import BeautifulSoup
from utils import visit_url
from selenium.webdriver.chrome.options import Options

path_to_extension = 'C:/webdrivers/1.18.10_0'
chrome_options = Options()
chrome_options.add_argument('load-extension=' + path_to_extension)

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

	'''
	Creates folders based on team name and team year.
	Ex: {Team}{Year} -> GSW2017
		Always 3 characters for team name followed by 4 year character for year
	'''

	df = pd.read_excel(file, sheet_name = 'Sheet1')

	for n, team in enumerate(df['Team']):
		#Year of team
		year = df['Year'][n]
		#folder name that will be created
		folderName = str(team) + str(year)
		#print(folderName)

		ensure_dir(folderName)

		#Newly made dir for the team -> cd to new dir
		teamdir = dir_path + "\\" + folderName
		os.chdir(teamdir)

		#Gets the links for all the games played in the regular season for the team.
		games = grabTeamData(team, year)
		with open('games_link.txt', 'a') as f:
			f.write('\n'.join(games))

		# #return to main dir
		os.chdir(dir_path)

def team_dirs(dir):
	#gets the list of folders we must traverse into and extract data from
	subfolders = [f.path for f in os.scandir(dir) if f.is_dir() ]    
	#visiting deeply into the folders
	return subfolders

def extract_data(gamesFile, driver):
	#opens the games_link.txt file generated and pulls the csvs from the website links
	with open(gamesFile) as f:
		links = f.readlines()
		for n, link in enumerate(links):
			data = visit_url(driver, link)
			jsonfile = 'G' + str(n) + '.json'
			with open(jsonfile, 'w') as fp:
				json.dump(data, fp, indent = 4)

			#Saves the csv files in the current working directory



def main():
	# filename = 'NBATeams.xlsx'
	# populateFolders(filename)
	driver = webdriver.Chrome(chrome_options=chrome_options)
	driver.create_options()
	# driver = webdriver.Chrome('C:\webdrivers\chromedriver.exe')
	foldersToVisit = team_dirs(dir_path)
	for i in tqdm(range(len(foldersToVisit))):
		team = foldersToVisit[i]
		os.chdir(team)
		extract_data(team + '\games_link.txt', driver)

	print("done")

main()