#!/usr/bin/env python
# -*- coding: utf-8 -*-
import psycopg2
import json


file=open("./fichiers_json/Regions2016.json","r",encoding="utf8")
file_content = file.read()

json_content = json.loads(file_content)["features"]

#connexion au serveur postgres

PG_CONN_STRING = "dbname='admin' user='postgres' host='localhost' password='postgres'"

data_dir = "data"
connexion = psycopg2.connect(PG_CONN_STRING)

curseur = connexion.cursor()

#supprimer la table region si elle existe déjà
curseur.execute('''DROP TABLE IF EXISTS region;''')

#création de la table region
curseur.execute('''CREATE TABLE region(
    code_insee INTEGER,
    nom TEXT,
    geom GEOMETRY
)''')

for i in range(len(json_content)):
    code_insee = json_content[i]["properties"]["code_insee"]
    nom = json_content[i]["properties"]["nom"]
    
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

    
    curseur.execute("""INSERT INTO region (code_insee,nom,geom) VALUES({},'{}',{})""".format(code_insee,nom,str_multipolygon))

# Sauvegarder les changements
connexion.commit()
#ou connexion.rollback() pour revenir à la sauvegarde précédente

#Etre sure de ne pas perdre les sauvegardes
connexion.close()
