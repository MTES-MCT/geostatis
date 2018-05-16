#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 21 15:31:23 2018

@author: hiyamelbadri
"""

#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 21 15:09:01 2018

@author: hiyamelbadri
"""

import psycopg2
import json

filename1 = "./fichiers_json/comm_carto_wgs84_1.json"
filename2 = "./fichiers_json/comm_carto_wgs84_2.json" 
filename3 = "./fichiers_json/comm_carto_wgs84_3.json"
filename4 = "./fichiers_json/comm_carto_wgs84_4.json"
filename5 = "./fichiers_json/communesDROM.json"

#connexion au serveur postgres

PG_CONN_STRING = "dbname='admin' user='postgres' host='localhost' password='postgres'"

data_dir = "data"
connexion = psycopg2.connect(PG_CONN_STRING)

curseur = connexion.cursor()

#supprimer la table regions si elle existe déjà
curseur.execute('''DROP TABLE IF EXISTS commune;''')

#création de la table regions
curseur.execute('''CREATE TABLE commune(
    code_insee TEXT,
    nom TEXT,
    code_epci TEXT,
    geom GEOMETRY
)''')
def addcommune(filename):
    
    file=open(filename,"r",encoding="utf8")
    file_content = file.read()

    json_content = json.loads(file_content)["features"]

    for i in range(len(json_content)):
        code_insee = json_content[i]["properties"]["INSEE_COM"]
        nom = json_content[i]["properties"]["NOM_COM"]
        epci = json_content[i]["properties"]["CODE_EPCI"]
        
        if json_content[i]["geometry"]["type"]=="MultiPolygon":
            str_multipolygon = "'MULTIPOLYGON("
            for j in range(len(json_content[i]["geometry"]["coordinates"])):
                if j != 0:
                    str_multipolygon += ","
                str_multipolygon += "(("
                premieres_coordonnees = json_content[i]["geometry"]["coordinates"][j][0][0]
                for k in range(len(json_content[i]["geometry"]["coordinates"][j][0])):
                    coordonnees = json_content[i]["geometry"]["coordinates"][j][0][k]
                    str_multipolygon += str(coordonnees[0]) + " " + str(coordonnees[1]) + ","
                str_multipolygon += str(premieres_coordonnees[0]) + " " + str(premieres_coordonnees[1]) + "))"   
            str_multipolygon += ")'"
                    
        else:
            str_multipolygon = "'MULTIPOLYGON((("
            premieres_coordonnees = json_content[i]["geometry"]["coordinates"][0][0]
            for k in range(len(json_content[i]["geometry"]["coordinates"][0])):
                coordonnees = json_content[i]["geometry"]["coordinates"][0][k]
                str_multipolygon += str(coordonnees[0]) + " " + str(coordonnees[1]) + ","
            str_multipolygon += str(premieres_coordonnees[0]) + " " + str(premieres_coordonnees[1]) + "))"   
            str_multipolygon += ")'"    
    
        
        curseur.execute("""INSERT INTO commune (code_insee,nom,code_epci,geom) VALUES('{}','{}','{}',{})""".format(code_insee,nom,epci,str_multipolygon))
    
    # Sauvegarder les changements
    connexion.commit()
    #ou connexion.rollback() pour revenir à la sauvegarde précédente
addcommune(filename1)
addcommune(filename2)
addcommune(filename3)
addcommune(filename4)
addcommune(filename5)

#Etre sur de ne pas perdre les sauvegardes
connexion.close()
