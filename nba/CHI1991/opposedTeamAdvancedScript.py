import json

i = 0
MPArray =[]
TSPArray = []
EFGPArray =[]
ThreePARArray=[]
FTrArray=[]
ORBPercentArray=[]
DRBPercentArray=[]
TRBPercentArray=[]
ASTArray=[]
STLArray=[]
BLKArray=[]
TOVArray=[]
USGArray=[]
ORtgArray=[]
DRtgArray=[]



while(i < 11):
    with open("G" + str(i) + ".json") as json_file:
        data = json.load(json_file)
        #for p in data['ADVANCE']:
        print(data[1]["STATS"]["ADVANCE"])
        MPArray.append(data[1]["STATS"]["ADVANCE"]["MP"])
        #.append(data[0]["STATS"]["ADVANCE"]["FG"])
        TSPArray.append(data[1]["STATS"]["ADVANCE"]["TS%"])
        ThreePARArray.append(data[1]["STATS"]["ADVANCE"]["3PAr"])
        EFGPArray.append(data[1]["STATS"]["ADVANCE"]["eFG%"])
        
        FTrArray.append(data[1]["STATS"]["ADVANCE"]["FTr"])
        ORBPercentArray.append(data[1]["STATS"]["ADVANCE"]["ORB%"])
        DRBPercentArray.append(data[1]["STATS"]["ADVANCE"]["DRB%"])
        TRBPercentArray.append(data[1]["STATS"]["ADVANCE"]["TRB%"])
        
        ASTArray.append(data[1]["STATS"]["ADVANCE"]["AST%"])
        STLArray.append(data[1]["STATS"]["ADVANCE"]["STL%"])
        BLKArray.append(data[1]["STATS"]["ADVANCE"]["BLK%"])
        TOVArray.append(data[1]["STATS"]["ADVANCE"]["TOV%"])
        USGArray.append(data[1]["STATS"]["ADVANCE"]["USG%"])
        ORtgArray.append(data[1]["STATS"]["ADVANCE"]["ORtg"])
        DRtgArray.append(data[1]["STATS"]["ADVANCE"]["DRtg"])
        
        print()
        print()
        i = i + 1
        
print(MPArray)

outputDict = {}
outputDict['MP'] = MPArray
outputDict['TS%'] = TSPArray
outputDict['eFG%'] = EFGPArray
outputDict['3PAr'] = ThreePARArray
outputDict['FTr'] = FTrArray
outputDict['ORB%'] =  ORBPercentArray
outputDict['DRB%'] = DRBPercentArray
outputDict['TRB%'] = TRBPercentArray
outputDict['AST%'] = ASTArray
outputDict['STL%'] = STLArray
outputDict['BLK%'] = BLKArray
outputDict['TOV%'] = TOVArray
outputDict['USG%'] = USGArray
outputDict['ORtg'] = ORtgArray
outputDict['DRtg'] = DRtgArray
#finish

output = {"ADVANCE" : outputDict}
outputstring = json.dumps(output, indent=4, separators=(',', ': '))
with open('opposedADVANCE.txt', 'w') as outfile:
    outfile.write(outputstring)
   # print(outputstring)

    #print (data.name)
    


    
# with open('MP2.txt', 'w') as outfile:  
#     json.dump(MPArray, outfile)
#     json.dump(TSPArray, outfile)
#     json.dump(EFGPArray, outfile)
#     json.dump(FGPercentArray, outfile)
    
# with open('3P.txt', 'w') as outfile:  
#     json.dump(ThreePointArray, outfile)
    
# with open('3PA.txt', 'w') as outfile:  
#     json.dump(ThreePA, outfile)
    
# with open('3P%.txt', 'w') as outfile:  
#     json.dump(ThreePercent, outfile)
    
# with open('FT.txt', 'w') as outfile:  
#     json.dump(FTArray, outfile)
    
# with open('FTA.txt', 'w') as outfile:  
#     json.dump(FTAArray, outfile)    

# with open('FT%.txt', 'w') as outfile:  
#     json.dump(FTPercent, outfile)    
    
# with open('ORB.txt', 'w') as outfile:  
#     json.dump(ORBArray, outfile)
    
# with open('DRB.txt', 'w') as outfile:  
#     json.dump(DRBArray, outfile)
    
# with open('TRB.txt', 'w') as outfile:  
#     json.dump(TRBArray, outfile)
    
# with open('AST.txt', 'w') as outfile:  
#     json.dump(ASTArray, outfile)
    
# with open('STL.txt', 'w') as outfile:  
#     json.dump(STLArray, outfile)
    
# with open('BLK.txt', 'w') as outfile:  
#     json.dump(BLKArray, outfile)
    
# with open('TOV.txt', 'w') as outfile:  
#     json.dump(TOVArray, outfile)
    
# with open('PF.txt', 'w') as outfile:  
#     json.dump(PFArray, outfile)
    
# with open('PTS.txt', 'w') as outfile:  
#     json.dump(PTSArray, outfile)