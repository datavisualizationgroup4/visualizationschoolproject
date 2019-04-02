from selenium import webdriver
import pandas as pd
import csv, json
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def csvPretty(csv):
    index = csv.find('\n')
    index += 1
    return csv[index:]

def getTeams(driver):
    awayTeam = driver.find_element_by_xpath('//*[@id="line_score"]/tbody/tr[2]/td[1]/a')
    homeTeam = driver.find_element_by_xpath('//*[@id="line_score"]/tbody/tr[3]/td[1]/a')
    
    return awayTeam.text.lower(), homeTeam.text.lower()

def teamRecords(driver):
    awayRecord = driver.find_element_by_xpath('//*[@id="content"]/div[2]/div[1]/div[3]')
    homeRecord = driver.find_element_by_xpath('//*[@id="content"]/div[2]/div[2]/div[3]')
        
    return awayRecord.text, homeRecord.text

def extract_team_data(driver, team):
    scores = {}
    
    basicOne = '//*[@id="all_box_' + team + '_basic"]/div[1]/div/ul/li[1]'
    basicTwo = '//*[@id="all_box_' + team + '_basic"]/div[1]/div/ul/li[1]/div/ul/li[4]/button'
    basicThree = '//*[@id="csv_box_' + team +'_basic"]'
        
    basicTable = WebDriverWait(driver, 30).until(EC.element_to_be_clickable((By.XPATH, basicOne)))
    basicTable.click()
    
    basicTable = WebDriverWait(driver, 30).until(EC.element_to_be_clickable((By.XPATH, basicTwo)))
    basicTable.click()
    
    tableScore = driver.find_element_by_xpath(basicThree)
    
    tableText = csvPretty(tableScore.text)
    stripped = tableText.split()
    
    results = []
    results.append(stripped[0].split(","))
    results.append(stripped[-1].split(","))
        
    basic_dict = dict(zip(results[0], results[1]))
    
    scores['BASIC'] = basic_dict
    
    advancedOne = '//*[@id="all_box_'+ team + '_advanced"]/div[1]/div/ul/li[1]'
    advancedTwo = '//*[@id="all_box_' + team + '_advanced"]/div[1]/div/ul/li[1]/div/ul/li[4]/button'
    advancedThree = '//*[@id="csv_box_' + team +'_advanced"]'
    
    advancedTable = WebDriverWait(driver, 30).until(EC.element_to_be_clickable((By.XPATH, advancedOne)))
    advancedTable.click()
    
    advancedTable = WebDriverWait(driver, 30).until(EC.element_to_be_clickable((By.XPATH, advancedTwo)))
    advancedTable.click()
    
    advancedScore = driver.find_element_by_xpath(advancedThree)
    advancedText = csvPretty(advancedScore.text)
    s_stripped = advancedText.split()
    
    res = []
    res.append(s_stripped[0].split(","))
    res.append(s_stripped[-1].split(","))
    
    advanced_dict = dict(zip(res[0], res[1]))
    
    scores['ADVANCE'] = advanced_dict
    
    return scores

def visit_url(driver, url):
    data = []
   
    driver.get(url)
    
    away, home = getTeams(driver)
    awayRecord, homeRecord = teamRecords(driver)
    
    awayTable = extract_team_data(driver, away)
    homeTable = extract_team_data(driver,home)
    
    data.append({'TEAM': away.upper(), 'HOME':False, 'RECORD': awayRecord, 'STATS': awayTable})
    data.append({'TEAM': home.upper(), 'HOME':True, 'RECORD': homeRecord, 'STATS': homeTable})
    
    return data