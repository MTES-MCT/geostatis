<?php

//Récupération des limites de la bbox
$xmin = $_POST["xmin"];
$ymin = $_POST["ymin"];
$xmax = $_POST["xmax"];
$ymax = $_POST["ymax"];
$table = $_POST["couche"];

$nomBDD = "postgres"; //Nom de la base de données
$hote = "localhost"; //Nom de l'hôte

$dataConn = "dbname=".$nomBDD." host=".$hote; //Données pour se connecter

// connexion à une base de données donnée par $nomBDD
$conn = pg_connect($dataConn);

//On regarde s'il est possible de se connecter
if (!$conn) {
  echo "erreur";
  exit;
}

//Objet géométrie de la base définisant la bbox
$bbox = "ST_MakeEnvelope($xmin, $ymin, $xmax, $ymax)";

//Requête pour sélectionner les communes situées dans la bbox
$requete = "SELECT code_insee, nom, ST_ASGeoJSON(geom) FROM $table WHERE ST_Intersects(geom,%s)";

//%s est remplacé par le chaine définie par $bbox
$requete = sprintf($requete, $bbox);

//Execution de la requête, le résultat est dans $resultat
$resultat = pg_query($conn, $requete);

//On regarde s'il existe un résultat
if (!$resultat) {
  echo "erreur";
  exit;
}

//Initialisation de la chaine définissant le geojson
$geojson = "{\"type\": \"FeatureCollection\",\"features\": [";

//Insertion des données fournies dans le geojson
while ($row = pg_fetch_row($resultat)) {
  $geojson = $geojson."{\"type\":\"Feature\",\"properties\":{";
  $geojson = $geojson."\"id\":\"";
  $geojson = $geojson.$row[0];
  $geojson = $geojson."\",\"nom\":\"";
  $geojson = $geojson.$row[1];
  $geojson = $geojson."\"},\"geometry\":";
  $geojson = $geojson.$row[2];
  $geojson = $geojson."},";
}

/*
Finalisation du geojson, la dernière virgule est supprimée car elle ne sert
à rien et peut poser des problèmes
*/
$geojson = substr($geojson, 0, -1). "]}";

//Renvoi du résultat final : un objet Geojson
echo $geojson;

?>
