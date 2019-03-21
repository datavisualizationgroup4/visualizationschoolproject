
import os, os.path


DIR = 'boxers20'
print (len([name for name in os.listdir(DIR) if os.path.isfile(os.path.join(DIR, name))]))


for i in os.listdir(DIR):        
    f = open("boxers20/" + i, "r")
    for line in f:
        if line == "KOs\n":
            nextline = f.readline()
            print (nextline)