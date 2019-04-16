import os
import json

i = 0
MPArray =[]
FGArray = []
FGAArray =[]
FGPercentArray=[]
ThreePointArray=[]
ThreePA=[]
ThreePercent=[]
FTArray=[]
FTAArray=[]
FTPercent=[]
ORBArray=[]
DRBArray=[]
TRBArray=[]
ASTArray=[]
STLArray=[]
BLKArray=[]
TOVArray=[]
PFArray=[]
PTSArray=[]



while(i < 82):
    with open("G" + str(i) + ".json") as json_file:
        data = json.load(json_file)
        #for p in data['BASIC']:
        print(data[0]["STATS"]["BASIC"])
        MPArray.append(data[0]["STATS"]["BASIC"]["MP"])
        FGArray.append(data[0]["STATS"]["BASIC"]["FG"])
        FGAArray.append(data[0]["STATS"]["BASIC"]["FGA"])
        FGPercentArray.append(data[0]["STATS"]["BASIC"]["FG%"])
        ThreePointArray.append(data[0]["STATS"]["BASIC"]["3P"])
        ThreePA.append(data[0]["STATS"]["BASIC"]["3PA"])
        ThreePercent.append(data[0]["STATS"]["BASIC"]["3P%"])
        FTArray.append(data[0]["STATS"]["BASIC"]["FT"])
        FTAArray.append(data[0]["STATS"]["BASIC"]["FTA"])
        FTPercent.append(data[0]["STATS"]["BASIC"]["FT%"])
        ORBArray.append(data[0]["STATS"]["BASIC"]["ORB"])
        DRBArray.append(data[0]["STATS"]["BASIC"]["DRB"])
        TRBArray.append(data[0]["STATS"]["BASIC"]["TRB"])
        ASTArray.append(data[0]["STATS"]["BASIC"]["AST"])
        STLArray.append(data[0]["STATS"]["BASIC"]["STL"])
        BLKArray.append(data[0]["STATS"]["BASIC"]["BLK"])
        TOVArray.append(data[0]["STATS"]["BASIC"]["TOV"])
        PFArray.append(data[0]["STATS"]["BASIC"]["PF"])
        PTSArray.append(data[0]["STATS"]["BASIC"]["PTS"])
        print()
        print()
        i = i + 1
        
print(MPArray)

    #print (data.name)
    
with open('MP.txt', 'w') as outfile:  
    json.dump(MPArray, outfile)
    
with open('FG.txt', 'w') as outfile:  
    json.dump(FGArray, outfile)
    
with open('FGA.txt', 'w') as outfile:  
    json.dump(FGAArray, outfile)
    
with open('FG%.txt', 'w') as outfile:  
    json.dump(FGPercentArray, outfile)
    
with open('3P.txt', 'w') as outfile:  
    json.dump(ThreePointArray, outfile)
    
with open('3PA.txt', 'w') as outfile:  
    json.dump(ThreePA, outfile)
    
with open('3P%.txt', 'w') as outfile:  
    json.dump(ThreePercent, outfile)
    
with open('FT.txt', 'w') as outfile:  
    json.dump(FTArray, outfile)
    
with open('FTA.txt', 'w') as outfile:  
    json.dump(FTAArray, outfile)    

with open('FT%.txt', 'w') as outfile:  
    json.dump(FTPercent, outfile)    
    
with open('ORB.txt', 'w') as outfile:  
    json.dump(ORBArray, outfile)
    
with open('DRB.txt', 'w') as outfile:  
    json.dump(DRBArray, outfile)
    
with open('TRB.txt', 'w') as outfile:  
    json.dump(TRBArray, outfile)
    
with open('AST.txt', 'w') as outfile:  
    json.dump(ASTArray, outfile)
    
with open('STL.txt', 'w') as outfile:  
    json.dump(STLArray, outfile)
    
with open('BLK.txt', 'w') as outfile:  
    json.dump(BLKArray, outfile)
    
with open('TOV.txt', 'w') as outfile:  
    json.dump(TOVArray, outfile)
    
with open('PF.txt', 'w') as outfile:  
    json.dump(PFArray, outfile)
    
with open('PTS.txt', 'w') as outfile:  
    json.dump(PTSArray, outfile)