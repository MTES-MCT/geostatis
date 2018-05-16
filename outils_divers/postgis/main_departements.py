#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Mar 21 15:09:01 2018

@author: hiyamelbadri
"""

import psycopg2
import json


file=open("./fichiers_json/depa_carto_wgs84.json","r",encoding="utf8")
file_content = file.read()

json_content = json.loads(file_content)["features"]

#connexion au serveur postgres

PG_CONN_STRING = "dbname='admin' user='postgres' host='localhost' password='postgres'"

data_dir = "data"
connexion = psycopg2.connect(PG_CONN_STRING)

curseur = connexion.cursor()

#supprimer la table departement si elle existe déjà
curseur.execute('''DROP TABLE IF EXISTS departement;''')

#création de la table departement
curseur.execute('''CREATE TABLE departement(
    code_insee TEXT,
    nom TEXT,
    geom GEOMETRY
)''')

for i in range(len(json_content)):
    code_insee = json_content[i]["properties"]["INSEE_DEP"]
    nom = json_content[i]["properties"]["NOM_DEP"]
    
    if json_content[i]["geometry"]["type"]=="MultiPolygon":
        str_multipolygon = "'MULTIPOLYGON("
        for j in range(len(json_content[i]["geometry"]["coordinates"])):
            if j != 0:
                str_multipolygon += ","
            str_multipolygon += "(("
            premieres_coordonnees = json_content[i]["geometry"]["coordinates"][j][0][0]
            for k in range(len(json_content[i]["geometry"]["coordinates"][j][0])):
                coordonnees = json_content[i]["geometry"]["coordinates"][j][0][k]
                print(coordonnees)
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
        print(str_multipolygon)


    
    curseur.execute("""INSERT INTO departement (code_insee,nom,geom) VALUES('{}','{}',{})""".format(code_insee,nom,str_multipolygon))

# Sauvegarder les changements
connexion.commit()
#ou connexion.rollback() pour revenir à la sauvegarde précédente

#Etre sur de ne pas perdre les sauvegardes
connexion.close()
