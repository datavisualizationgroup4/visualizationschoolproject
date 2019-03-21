import requests
import csv
from bs4 import BeautifulSoup




# Fill in your details here to be posted to the login form.
payload = {
    '_target_path': 'https://www.google.com/',
    '_username': '', #username here
    '_password': '', #passsword here
    '_remember_me': '',
    'login[go]': ''
}

headers = {'user-agent': "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36"}
cookies = {'PHPSESSID':'k9vr28mtgt5ujd3e1esvs3o874', 'loggedIn':'yes'} #shitty hack

boxers={
180,
9032,
352,
6129,
9625,
9031,
150,
147,
8119,
90,
474,
659461,
659771,
348759,
447121,
659772,
356831,
9019,
80,
43,
774820,
9027,
9012,
8995
}



# Use 'with' to ensure the session context is closed after use.
with requests.Session() as s:
    for i in boxers:
        p = s.post('http://boxrec.com/en/boxer/' + str(i), headers=headers, cookies=cookies)
        # print the html returned or something more intelligent to see if it's a successful login page.
        #print (p.text)
        
        soup = BeautifulSoup(p.content, "html.parser")
        if(soup.find_all("table")):
            infoTable = soup.find_all("table")[0]
        
            f = open("boxers20/boxer" + str(i) + ".html", "w")
            f.write(infoTable.prettify())
        else:
            f = open("boxers20/boxer" + str(i) + "_NotFound.html", "w")
            f.write(infoTable.prettify())
    print("done")
    # An authorised request.
    #r = s.get('http://boxrec.com/en/boxer/' + str(180))
    # print (r.text)
        # etc...
