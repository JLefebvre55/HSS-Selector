import json, csv

'''
Converts the CSV of HSS data into a JSON, with the member designations as the keys
Written by JLefebvre55
'''

#Path to CSV
csv_path = 'src/hss-v1.csv'
export_path = 'src/hss-v1.json'

#HSS, sorted by designation
hss_json = {}
headers = []

with open(csv_path, newline='') as csvfile:
    hss_csv = csv.reader(csvfile, dialect='excel')
    #Get headers
    headers = hss_csv.__next__()
    #Get each designation and its info
    for row in hss_csv:
        #This member
        member = {}
        #All but designation
        for i in range(1, len(headers)):
            try:
                #Is it a number?
                a = float(row[i])
            except:
                #It ain't a number bro
                a = row[i]
            finally:
                #I.e. index(row) = 0, i = 1, member["mass"] = 113
                member[str(headers[i])] = a
        #I.e. index(row) = 0, hss_json["HSS 305x305x13"] = {"mass" : 113, ...}
        hss_json[str(row[0])] = member

#Export JSON
with open(export_path, "x") as jsonfile:
    json.dump(hss_json, jsonfile, indent=4, separators=(', ',' : '))
print(len(hss_json), "members loaded, exported to", export_path)