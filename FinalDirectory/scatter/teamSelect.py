'''
ARIKUZZAMAN IDRISY
DV - TEAM SELECTOR SCRIPT
'''
import numpy as np
import pandas as pd

file = open('finalData.csv','r')
df = pd.read_csv(file)

current = 1
for row in df.itertuples():
    print(row.TEAM)

