/*----------------------Variables des limites maximales-----------------------*/

/*Limites maximales de la carte de la France métropolitaine*/
var maxBoundsFranceMetropolitaine = [
    [38.135,-8.481], // Coordonnées limites du sud-ouest
    [52.456,11.909]  // Coordonnées limites du nord-est
  ];

/*Limites maximales de la carte de la Guadeloupe*/
var maxBoundsGuadeloupe = [
    [15.7989,-61.8558],
    [16.5651,-60.9439]
  ];

/*Limites maximales de la carte de la Martinique*/
var maxBoundsMartinique = [
    [14.3589,-61.3161],
    [14.9249,-60.7544]
  ];

/*Limites maximales de la carte de la Guyane*/
var maxBoundsGuyane = [
    [1.977,-54.921],
    [6.206,-50.977]
  ];

/*Limites maximales de la carte de la Réunion*/
var maxBoundsReunion = [
    [-21.4262,55.1376],
    [-20.8254,55.8943]
  ];

/*Limites maximales de la carte de Mayotte*/
var maxBoundsMayotte = [
    [-13.0434,44.9945],
    [-12.6162,45.3255]
  ];

/*----------------------------Création des cartes-----------------------------*/

/*
Initialisation de la carte en centrant au centre de la France métropolitaine
Zoom est de 5.5, 5.5 est le niveau de zoom minimal
Il est possible de zoomer avec un pas de 0.25
On ne peut pas sortir de la France avec maxBounds
*/
var mapFranceMetropolitaine = L.map('mapFranceMetropolitaine', {
	center: [46.6033540, 1.8883335],
	zoom: 5.5,
	zoomSnap: 0.25,
	minZoom:5.5,
	maxZoom:15,
	attributionControl: false,
	zoomControl:false,
	maxBounds:maxBoundsFranceMetropolitaine,
	renderer: L.canvas()
});

/*
Carte de la Guadeloupe
*/
var mapGuadeloupe = L.map('mapGuadeloupe', {
  center: [16.2490067,-61.5650444],
  zoom: 8,
  zoomSnap:0.25,
  zoomControl:false,
  attributionControl: false
});

/*
Carte de la Martinique
*/
var mapMartinique = L.map('mapMartinique', {
  center: [14.6553,-60.9906],
  zoom: 8,
  zoomSnap:0.25,
  zoomControl:false,
  attributionControl: false
});

/*
Carte de la Guyane
*/
var mapGuyane = L.map('mapGuyane', {
  center: [4.0039882, -52.9999980],
  zoom: 5,
  zoomSnap:0.25,
  zoomControl:false,
  attributionControl: false
});

/*
Carte de la Réunion
*/
var mapReunion = L.map('mapReunion', {
  center: [-21.1309332, 55.5265771],
  zoom: 8,
  zoomSnap:0.25,
  zoomControl:false,
  attributionControl: false
});

/*
Carte de Mayotte
*/
var mapMayotte = L.map('mapMayotte', {
  center: [-12.8230480, 45.1520755],
  zoom: 9,
  zoomSnap:0.25,
  zoomControl:false,
  attributionControl: false
});

function zoomSelonBounds() {
  //Zoom sur la France métropolitaine
  mapFranceMetropolitaine.fitBounds(maxBoundsFranceMetropolitaine);
  //Zoom sur les DROM
  mapGuadeloupe.fitBounds(maxBoundsGuadeloupe);
  mapMartinique.fitBounds(maxBoundsMartinique);
  mapGuyane.fitBounds(maxBoundsGuyane);
  mapReunion.fitBounds(maxBoundsReunion);
  mapMayotte.fitBounds(maxBoundsMayotte);
}

/*----------------------Propriétés des cartes Outre-Mer-----------------------*/

/*
Fonction pour bloquer la navigation dans dans une carte
*/
function bloquerFonctionnalitesMap(map) {
  map.dragging.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();
  map.boxZoom.disable();
  map.keyboard.disable();
}

/*
Fonction pour bloquer la navigation dans les cartes des Outre-mer
*/
function bloquerFonctionnalitesMapsOutreMer() {
  bloquerFonctionnalitesMap(mapGuadeloupe);
  bloquerFonctionnalitesMap(mapMartinique);
  bloquerFonctionnalitesMap(mapGuyane);
  bloquerFonctionnalitesMap(mapReunion);
  bloquerFonctionnalitesMap(mapMayotte);
}

/*----------------------Propriétés des cartes Outre-Mer-----------------------*/

/*
Fonction permettant l'ajout des couches sur les cartes
*/
function ajouterFondsDeCartes() {
  //Ajout de la couche fond de carte France Métropolitaine
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mapFranceMetropolitaine);
  //Ajout de la couche fond de carte sur les DROM
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mapGuadeloupe);
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mapMartinique);
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mapGuyane);
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mapReunion);
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mapMayotte);
}

/*-------------------------------Variables globales---------------------------*/

//Ensemble des balises du fichier html
var choixRegion = document.getElementById("choixRegion");
var choixDepartement = document.getElementById("choixDepartement");
var choixCommune = document.getElementById("choixCommune");
var choixZone = document.getElementById("menuChoixZone");
var region = document.getElementById("region");
var departement = document.getElementById("departement");
var commune = document.getElementById("commune");
var affichageStats = document.getElementById("affichageStats");
var choixMode = document.getElementById("choixMode");
var choixCouleurPalette = document.getElementById("choixCouleurPalette");
var choixStat = document.getElementById("choixStat");
var statAffichee = document.getElementById("statAffichee");
var metadonneesStat = document.getElementById("metadonneesStat");
var nombreClasses = document.getElementById("nombreClasses");
var afficheNombreClasses = document.getElementById("afficheNombreClasses");
var choixCercle = document.getElementById("menuChoixCercle");
afficheNombreClasses.innerHTML = nombreClasses.value;

//Variables globales
var layerMetropole; //Objet layer GeoJSON de la métropole affiché sur la carte
var layerGuadeloupe; //Objet layer GeoJSON de la Guadeloupe affiché sur la carte
var layerMartinique; //Objet layer GeoJSON de la Martinique affiché sur la carte
var layerGuyane; //Objet layer GeoJSON de la Guyane affiché sur la carte
var layerReunion; //Objet layer GeoJSON de la Réunion affiché sur la carte
var layerMayotte; //Objet layer GeoJSON de Mayotte affiché sur la carte

var layerCercle = L.layerGroup(); //Objet layerGroup contenant les cercles propo
var layerCercleGuadeloupe = L.layerGroup();
var layerCercleMartinique = L.layerGroup();
var layerCercleGuyane = L.layerGroup();
var layerCercleReunion = L.layerGroup();
var layerCercleMayotte = L.layerGroup();

var topoJsonParEchelle = {}; //Tableau des géométries TopoJSON par échelle

var controlLegende = L.control({position: 'bottomleft'}); //Légende
var echelleGeometrieJson = "regions"; //Nom de l'échelle pour les fichiers de zones JSON
var controlEchelle = L.control.scale({imperial:false, position: 'bottomright'}); //Échelle
var statsJson = ''; //Fichier JSON affichant les stats
var grades = [];
var colors;
var info = L.control({position: 'topright'}); //Objet affichant les données de la zone de survol
var zoneAffichee = 'region';
var stats;
var maxStats=NaN;
var statsMetadata = null;
var places;
var valeurs;
var valeursNumeriques = []; //Même tableau que valeurs mais qu'avec des nombres
var mode = choixMode.value;
var valeurNombreClasses; //Nombre de classes

var colorPalettes = {"0":{"nom":"Classique","couleurs":['#FFEDCD','#FFEDA0','#FED976','#FEB24C','#FD8D3C','#FC4E2A','#E31A1C','#BD0026','#800026','#799026','#570026']},"1":{"nom":"Bleus","couleurs":['#0000FF','#0000EE','#0000DD','#0000CC','#0000BB','#0000AA','#000099','#000088','#000077','#000066','#000055']},"2":{"nom":"Verts","couleurs":['#00FF00','#00EE00','#00DD00','#00CC00','#00BB00','#00AA00','#009900','#008800','#007700','#006600','#005500']},"3":{"nom":"Rouges","couleurs":['#FF0000','#EE0000','#DD0000','#CC0000','#BB0000','#AA0000','#990000','#880000','#770000','#660000','#550000']}}


/*------------------------Lecture d'un fichier JSON---------------------------*/

/*
Fonction permettant le changement de couche géométrique
*/
function majGeometrie() {

  majEchelle();

  var json = topoJsonParEchelle[echelleGeometrieJson];
  places = topojson.feature(json, json.objects[echelleGeometrieJson]);
  placesDROM = topojson.feature(json, json.objects[echelleGeometrieJson + "DROM"]);

  obtenirCheminFichierJsonStats(); //Obtention du chemin du fichier
  var promesse = majStats();
  if (!promesse) {
    majLegende();
    ajouterGeojsonLayers();
  }
  else {
    promesse.then(function() {
      majLegende();
      ajouterGeojsonLayers();
    });
  }
}

/*
Fonction permettant de mettre à jour les données statistiques pour un objet JSON
*/
function majStats(){

  valeurs = [];
  valeursNumeriques = [];
  var promesse = null;
  if (statsJson != '') {
    promesse = obtenirStats();
  } else {
    for (let i=0; i< places.features.length; i++) {
      places.features[i].properties["stats"] = NaN;
    }
    for (let i=0; i< placesDROM.features.length; i++) {
      placesDROM.features[i].properties["stats"] = NaN;
    }
  }
  return promesse;
}


/*
Fonction permettant de charger un fichier TopoJSON pour être décompressé.
*/
function chargerDecompresserTopoJSON(scale = echelleGeometrieJson) {

  var filename = "./fonds_carte/json/" + scale + ".json.txt";
  var promesse = d3.text(filename).then(function(data) {
    topoJsonParEchelle[scale] = JSON.parse(LZString.decompressFromUTF16(data));
  });
  return promesse;
}

/*------------------------Gestion des statistiques----------------------------*/

/*
Fonction pour permettre d'afficher les métadonnées de la statistique
*/
function afficherMetadonneesStats(){
  if (statsMetadata != null){
  metadonneesStat.innerHTML = statsMetadata.stat_name;
    for (x in statsMetadata){
      if (x!="stat_name" && x!="scale"){
        metadonneesStat.innerHTML += "<br>" + x + " : " +  statsMetadata[x];
      }
    }
  }
  else{
    metadonneesStat.innerHTML = "";
  }
}

/*
Fonction permettant d'obtenir toutes les valeurs numériques d'un tableau
*/
function obtenirArrayNumerique(array){
  var nouvelArray = [];

  for (var i=0;i<array.length;i++){
    if (!isNaN(array[i]) && array[i]!="" && array[i]!= null){
      nouvelArray.push(array[i]);
    }
  }
  return nouvelArray;
}

/*
Fonction pour créer une liste de fichiers stats disponibles
*/
function obtenirListeFichiersStat(){
  //Interroge un fichier php pour obtenir la liste des fichiers du dossier stats
  var promesse = d3.text("./fichiers_php/liste_fichiers_stats.php").then(function(listeFichiers){
    //Liste des fichiers de statistique sous forme de liste
    listeFichiers = listeFichiers.split(";") ;
    var majListeFichiers = [];
    for (var i =0;i<listeFichiers.length;i++){
      //Cas où le fichier est un JSON
      if (listeFichiers[i].split('.')[1] == 'json'){
        majListeFichiers.push(listeFichiers[i]);
      }
    }
    return majListeFichiers;
  });
  return promesse;
}

var listeStats = [];
var listeStatsEtTitres = [];
var listeFichiersJson = [];

/*
Fonction pour lire chacun des fichiers stats de la liste pour récupérer leur titre
*/
function lireFichiersStatDeListe(i = 0){
  //Lecture du titre de la statistique associée au fichier
  var nouvellePromesse = d3.json("./fichiers_stats/" + listeFichiersJson[i]).then(function(stats) {
    var titreStat = stats.metadata.stat_name;
    //Cas où la statistique n'existe pas
    if (!listeStats.includes(titreStat)){
      listeStats.push(titreStat);
      listeStatsEtTitres.push([listeFichiersJson[i].split('_')[0],titreStat]);
    }
    return i+1;
  });
  //Appel récursif jusqu'à ce que la liste soit entièrement parcourue
  if (i < listeFichiersJson.length - 1) {
    return nouvellePromesse.then(lireFichiersStatDeListe);
  }
}

/*
Fonction pour remplir la liste de stats sélectionnables
*/
function remplirListeStats(){
  var promesse = obtenirListeFichiersStat();
  promesse.then(function(listeFichiers) {
    for (let i=0;i<listeFichiers.length;i++){
      listeFichiersJson.push(listeFichiers[i]);
    }
    lireFichiersStatDeListe().then(function(){
      choixStat.innerHTML = "<option>-------</option>\n";
      choixStat.style = "width:50px;"
      for (var i=0; i<listeStats.length;i++){
        choixStat.innerHTML += "<option value =" + i +">" + listeStatsEtTitres[i][1] + "</option>\n";
      }
    });
  });
}

/*
Fonction permettant de récupérer le chemin du fichier voulu
*/
function obtenirCheminFichierJsonStats(){
  statsJson = "./fichiers_stats/";
  var nomFichierStatsJson;

  try {
    nomFichierStatsJson = listeStatsEtTitres[parseFloat(choixStat.value)][0];
    nomFichierStatsJson += "_" + choixZone.choixzone.value + ".json";

    if (!listeFichiersJson.includes(nomFichierStatsJson)){
      statsJson = "";
    }
    else{
      statsJson += nomFichierStatsJson;
    }
  }
  catch(error) {
    statsJson = "";
  }
}

/*
Fonction permettant de lire un fichier de statistiques et le traiter afin
de les représenter sur les cartes.
*/
function obtenirStats() {

  var promesse = d3.json(statsJson).then(function(stats) {
    statsMetadata = stats.metadata;
    afficherMetadonneesStats();

    if (stats.metadata.scale == choixZone.choixzone.value) {
      for (let i=0; i< places.features.length; i++) {
        let code_insee = places.features[i].properties.id;
        valeurs.push(stats.data[code_insee]);
        places.features[i].properties["stats"] = stats.data[code_insee];
      }
      for (let i=0; i< placesDROM.features.length; i++) {
        let code_insee = placesDROM.features[i].properties.id;
        valeurs.push(stats.data[code_insee]);
        placesDROM.features[i].properties["stats"] = stats.data[code_insee];
      }
    }
    valeursNumeriques = obtenirArrayNumerique(valeurs);
    statsMetadata = null;
    maxStats = Math.max.apply(Math, valeursNumeriques);
    // console.log(maxStats);
  });
  return promesse;
}

/*-------------------------Gestion des objets JSON----------------------------*/

function ajouterGeojsonLayers() {

  if (layerMetropole) {
    mapFranceMetropolitaine.removeLayer(layerMetropole);
    mapGuadeloupe.removeLayer(layerGuadeloupe);
    mapMartinique.removeLayer(layerMartinique);
    mapGuyane.removeLayer(layerGuyane);
    mapReunion.removeLayer(layerReunion);
    mapMayotte.removeLayer(layerMayotte);
    layerCercle.clearLayers();
    layerCercleGuadeloupe.clearLayers();
    layerCercleMartinique.clearLayers();
    layerCercleGuyane.clearLayers();
    layerCercleReunion.clearLayers();
    layerCercleMayotte.clearLayers();
    mapFranceMetropolitaine.removeLayer(layerCercle);
    mapGuadeloupe.removeLayer(layerCercleGuadeloupe);
    mapMartinique.removeLayer(layerCercleMartinique);
    mapGuyane.removeLayer(layerCercleGuyane);
    mapReunion.removeLayer(layerCercleReunion);
    mapMayotte.removeLayer(layerCercleMayotte);
  }

  //Ajout des différents objets sur les cartes
  layerMetropole = L.geoJSON(places,{style: style, onEachFeature: onEachFeature}).addTo(mapFranceMetropolitaine);
  layerGuadeloupe = L.geoJSON(placesDROM,{style: style, onEachFeature: onEachFeatureGuadeloupe}).addTo(mapGuadeloupe);
  layerMartinique = L.geoJSON(placesDROM,{style: style, onEachFeature: onEachFeatureMartinique}).addTo(mapMartinique);
  layerGuyane = L.geoJSON(placesDROM,{style: style, onEachFeature: onEachFeatureGuyane}).addTo(mapGuyane);
  layerReunion = L.geoJSON(placesDROM,{style: style, onEachFeature: onEachFeatureReunion}).addTo(mapReunion);
  layerMayotte = L.geoJSON(placesDROM,{style: style, onEachFeature: onEachFeatureMayotte}).addTo(mapMayotte);
  if (choixCercle.choixcercle.value=="cercles" && choixStat.value!='-------'){
    layerCercle.addTo(mapFranceMetropolitaine);
    layerCercleGuadeloupe.addTo(mapGuadeloupe);
    layerCercleMartinique.addTo(mapMartinique);
    layerCercleGuyane.addTo(mapGuyane);
    layerCercleReunion.addTo(mapReunion);
    layerCercleMayotte.addTo(mapMayotte);
    layerMetropole.bringToFront();
    layerGuadeloupe.bringToFront();
    layerMartinique.bringToFront();
    layerGuyane.bringToFront();
    layerReunion.bringToFront();
    layerMayotte.bringToFront();
    // var i=0;
    // layerCercleDROM.eachLayer(function(layer){console.log(layer);});
  }
}

/*
Fonction permettant d'éviter de sélectionner certaines données
en fonction du niveau de zoom
*/
function restreindreDonneesSelonZoom() {
  var niveauZoom = mapFranceMetropolitaine.getZoom();

  // //Interdiction de l'accès aux communes
  // if (niveauZoom < 7) {
  //   /*
  //   On enlève la carte des communes si le niveau de zoom est inférieur à 7.
  //   On met celle des départements par défaut
  //   */
  //   if (choixZone.choixzone.value == "commune") {
  //     departement.checked = true;
  //     majGeometrie();
  //   }
  //
  //   //On cache la case des communes
  //   choixCommune.style.display = "none";
  //   choixDepartement.style.display = "block";
  //   choixRegion.style.display = "block";
  //
  // } else if (niveauZoom < 8) {

  if (niveauZoom < 8) {
    //On affiche toutes les possibilités
    choixCommune.style.display = "block";
    choixDepartement.style.display = "block";
    choixRegion.style.display = "block";
  } else {
    /*
    On enlève la carte des régions si le niveau de zoom est supérieur à 8.
    On met celle des départements par défaut
    */
    if (choixZone.choixzone.value == "region") {
      departement.checked = true;
      majGeometrie();
    }

    //On cache la case des régions
    choixCommune.style.display = "block";
    choixDepartement.style.display = "block";
    choixRegion.style.display = "none";
  }
}

/*--------------------Interactivité avec la carte, design---------------------*/

/*
Ajout d'une échelle sur la carte de la France métropolitaine
*/
function ajouterEchelle() {
  controlEchelle.addTo(mapFranceMetropolitaine);
}

/*
Ajout d'une série de boutons avec 3 choix de zoom :
- zoomer
- dézoomer
- retourner à la vue initiale (zoom à 5.5)
*/
function afficherBoutonsZoomHome(){
  var controlZoomHome = L.Control.zoomHome({homeZoom:5.5});
  controlZoomHome.addTo(mapFranceMetropolitaine);
}

/*
Fonction permettant d'obtenir la couleur d'un polygone
en fonction d'une échelles de valeurs (grades) et de couleurs (colors)
 */
//var obtenirCouleur = d3.scaleThreshold().domain(grades).range(colors);

/*
Fonction permettant d'obtenir la couleur d'un polygone
en fonction d'une échelle de valeurs et de couleurs
 */
function obtenirCouleur(d) {

    for (var i = 0; i < grades.length-1; i++) {
      if (isNaN(d) || choixCercle.choixcercle.value=="cercles"){
        return '#AAAAAA';
      }
      else if (d >= grades[i] && d < grades[i+1]){
        return colors[i];
      }
    }
    return colors[colors.length-1];
}

/*
Fonction permettant de créer le style des polygones
*/
function style(feature) {
  var color = ["#AAAAAA"];
  var valeur = feature.properties.stats;
  if (!isNaN(valeur) && valeur != null && valeur != "") {
    color = obtenirCouleur(valeur);
  }
  if (choixCercle.choixcercle.value=="cercles"){
    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: 'black',
      dashArray: '3',
      fillOpacity: 0,
      fill: true
    };
  }
  if (choixZone.choixzone.value == "commune" && mapFranceMetropolitaine.getZoom() <= 7) {
    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: color,
      dashArray: '3',
      fillOpacity: 0.7,
      fill: true
    };
  }
  return {
    fillColor: color,
    weight: 1,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
    fill: true
  };
}

/*
Surbrillance de la carte
*/
function highlightFeature(e) {
  var layer = e.target;

  if (choixCercle.choixcercle.value=="cercles"){
    layer.setStyle({
      fillColor: '#3498db',
      weight: 3,
      opacity: 1,
      color: '#2c3e50',
      dashArray: '',
      fillOpacity: 0.2
    });
  }else{
    layer.setStyle({
      weight: 3,
      color: '#000000',
      dashArray: '',
      fillOpacity: 0.8
    });
  }

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  controlInfo.update(layer.feature.properties);
}

/*
Fonction permettant de remettre l'objet à l'état initial lorsqu'on ne le survole plus
*/
function resetHighlight(e) {
  layerMetropole.resetStyle(e.target);
  layerGuadeloupe.resetStyle(e.target);
  layerMartinique.resetStyle(e.target);
  layerGuyane.resetStyle(e.target);
  layerReunion.resetStyle(e.target);
  layerMayotte.resetStyle(e.target);
  controlInfo.update();
}

/*
Fonction gérant les événements liés à la carte (mouseout, mouseover...)
*/
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
  });
  if (choixCercle.choixcercle.value=="cercles"){
    creerCercle(feature, layer, layerCercle);
  }
}

/*
Fonction gérant les événements liés à la carte pour la Martinique
*/
function onEachFeatureMartinique(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
  });
  if (choixCercle.choixcercle.value=="cercles"){
    creerCercle(feature, layer, layerCercleMartinique);
  }
}

/*
Fonction gérant les événements liés à la carte pour la Martinique
*/
function onEachFeatureGuadeloupe(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
  });
  if (choixCercle.choixcercle.value=="cercles"){
    creerCercle(feature, layer, layerCercleGuadeloupe);
  }
}

/*
Fonction gérant les événements liés à la carte pour la Martinique
*/
function onEachFeatureGuyane(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
  });
  if (choixCercle.choixcercle.value=="cercles"){
    creerCercle(feature, layer, layerCercleGuyane);
  }
}

/*
Fonction gérant les événements liés à la carte pour la Martinique
*/
function onEachFeatureReunion(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
  });
  if (choixCercle.choixcercle.value=="cercles"){
    creerCercle(feature, layer, layerCercleReunion);
  }
}

/*
Fonction gérant les événements liés à la carte pour la Martinique
*/
function onEachFeatureMayotte(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
  });
  if (choixCercle.choixcercle.value=="cercles"){
    creerCercle(feature, layer, layerCercleMayotte);
  }
}

/*
Fonction créant un cercle proportionnel dans layerCercle
*/
function creerCercle(feature, layer, layerC){
  if(choixCercle.choixcercle.value=="cercles"){
    var stat = feature.properties["stats"];
    var centroid = getCentroid(feature);
    marq_circ=L.circleMarker(centroid, {
      radius : setCircleSize(stat, maxStats),
      color : '#7d3c98',
      weight : 1,
      fillOpacity: 0.6,
      fillColor: '#bb8fce'
    }).addTo(layerC);
  }
}

/*
Fonction permettant d'arrondir un nombre avec un precision définie
*/
function precisionDecimale(nombre, precision) {
  var facteur = Math.pow(10, precision);
  return Math.round(nombre * facteur) / facteur;
}

//Fonction permettant de créer la syntaxe HTML pour la légende
function creerLegende() {
  if (choixCercle.choixcercle.value=="cercles" && choixStat.value!='-------'){
    var div = L.DomUtil.create('div', 'info legend'),
      labels = [];

    var r2=10
    var v2=(r2/20*Math.sqrt(maxStats))**2

    var legendeCercle = "<svg height='100' width='100'>";
    legendeCercle += "<circle cx='30' cy='50' r='20' stroke='#7d3c98' stroke-width='1' stroke-opacity='1' fill='#bb8fce' fill-opacity='0.6' />";
    legendeCercle += "<text x='52' y='45' fill='black'>"+maxStats.toString()+"</text>";
    legendeCercle += "<circle cx='30' cy='60' r="+r2.toString()+" stroke='#7d3c98' stroke-width='1' stroke-opacity='1' fill='#bb8fce' fill-opacity='0.6' />";
    legendeCercle += "<text x='47' y='75' fill='black'>"+v2.toString()+"</text>";
    legendeCercle += "</svg>";

    div.innerHTML = legendeCercle

  }else{
  var div = L.DomUtil.create('div', 'info legend'),
      labels = [];

  //Ajout d'une ligne dans la légende pour les valeurs inconnues
  div.innerHTML += '<i style="background:#AAAAAA"></i>NC<br>'

  // Boucle pour ajouter dans la légende : la couleur et les bornes
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
        '<i style="background:' + obtenirCouleur(grades[i] + 1) + '"></i> ' +
        precisionDecimale(grades[i], 2) + (precisionDecimale(grades[i + 1], 2) ? ' &ndash; ' + precisionDecimale(grades[i + 1], 2) + '<br>' : '+');
  }
  }
  return div;
}

/*
Fonction permettant d'afficher la légende
*/
function afficherLegende() {
  controlLegende.onAdd = function (map) {
    return creerLegende();
  };
  controlLegende.addTo(mapFranceMetropolitaine);
}

/*
Fonction permettant d'afficher la barre d'information qui affiche le nom de la
zone sélectionnée avec d'autres infos
*/
function afficherCartouche(mapObject) {

  var map = mapObject;

  /* Pop-up sur le côté avec les infos de la zone étudiée */
  controlInfo = L.control({position: 'topright'});

  controlInfo.onAdd = function (mapFranceMetropolitaine) {
    this._div = L.DomUtil.create('div', 'controlInfo'); // Création d'une div de classe INFO
    this.update();
    return this._div;
  };

  /*
  Méthode pour afficher les données principales dans la box en haut à droite
  les informations principales :
  - nom de la zone survolée ;
  - code INSEE de cette zone ;
  - valeur statistique associée à la zone. Non connue si elle n'existe pas.
  */
  controlInfo.update = function (properties) {
    var valeurStat = "Non connue";
    if (properties && !isNaN(properties.stats) && properties.stats != null && properties.stats != ""){
      valeurStat = parseFloat(properties.stats);
    }

    this._div.innerHTML = '<h4>Informations</h4>' +  (properties ?
        '<b>' + properties.nom + '</b><br />Code INSEE : ' + properties.id + '</b><br />Valeur : ' +  valeurStat
        : 'Survoler une région');
  };

  controlInfo.addTo(mapObject); //Ajout de l'objet sur la carte
}

/*------------------------Sélection des palettes------------------------------*/


/*
Fonction permettant de faire la liste des palettes de couleurs disponibles dans
le fichier HTML
*/
function majChoixCouleurPalette(){
  choixCouleurPalette.innerHTML = "";

  for (var i=0;i<Object.keys(colorPalettes).length;i++){
    choixCouleurPalette.innerHTML += "<option value =" + i +">" + colorPalettes[i].nom + "</option>\n"
  }
}


/*------------------------Sélection de la couche------------------------------*/

/*
Fonction permettant d'autoriser à l'utilisateur de choisir telle ou telle échelle en fonction du niveau de zoom (Région, département, EPCI, commune)
*/
function majEchelle() {
  if (choixZone.choixzone.value == "departement") {
    echelleGeometrieJson = "departements";
  }
  else if (choixZone.choixzone.value == "commune") {
    echelleGeometrieJson = "communes";
  }
  else {
    echelleGeometrieJson = "regions";
  }
  //Mise à jour de la zone affichée
  zoneAffichee = choixZone.choixzone.value;
}

/*
Fonction permettant de changer de zone (région, département, commune) seulement
lorsque l'utilisateur change et non lorsqu'il clique une nouvelle fois sur la
même zone.
*/
function onClickChoixZone(){
  if (choixZone.choixzone.value != zoneAffichee){
    majGeometrie();
  }
}

/*-----------------------Personnalisation de la carte-------------------------*/

/*
Fonction pour permettre de mettre à jour le mode d'intervalle sélectionné
*/
function majMode(){
  mode = choixMode.value;
}

/*
Fonction pour permettre de mettre à jour le palette de couleur sélectionnée
*/
function majPaletteCouleur(){
  var i = choixCouleurPalette.value;
  colors = colorPalettes[i].couleurs;
}

/*
Fonction permettant de mettre à jour le nombre de classes que l'utilisateur a
entré avec la barre
*/
function obtenirNombreClasses(){
  var tempNombreClasses = parseInt(nombreClasses.value);
  if (isNaN(tempNombreClasses)) {
    tempNombreClasses = 5;
  }
  afficheNombreClasses.innerHTML = tempNombreClasses;
  valeurNombreClasses = tempNombreClasses;
}

/*
Fonction pour permettre de mettre à jour les bornes des intervalles
*/
function obtenirBornes(){
  grades = []; //Réinitialisation de grades
  if (valeursNumeriques.length == 0){
    grades = [];
  }
  else if (mode == 'intervallesEgaux'){
    obtenirBornesAvecIntervallesEgaux();
  }
  else if (mode == 'effectifsEgaux'){
    obtenirBornesAvecEffectifsEgaux();
  }
  else{
    //Voir ce qu'il faut faire
  }
}

/*
Fonction pour permettre de mettre à jour les bornes des intervalles lorsque
"Intervalles Égaux" est choisi
*/
function obtenirBornesAvecIntervallesEgaux(){
    var minStats = Math.min.apply(Math, valeursNumeriques);
    //var maxStats = Math.max.apply(Math, valeursNumeriques);
    var taille = (maxStats-minStats)/valeurNombreClasses;
    var tempGrades = minStats;

    for (var i=0;i<valeurNombreClasses;i++){

      grades.push(tempGrades);
      tempGrades += taille;
    }
}

/*
Fonction pour permettre de mettre à jour les bornes des intervalles lorsque
"Effectif Égaux" est choisi
*/
function obtenirBornesAvecEffectifsEgaux(){
  //Tri des valeurs dans l'ordre numérique
  valeursNumeriques.sort(function(a,b) { return a - b;});

  var lengthValeurs = valeursNumeriques.length;
  var tailleClasse = lengthValeurs/valeurNombreClasses;

  var i = 0;

  while (i<lengthValeurs) {
    grades.push(valeursNumeriques[parseInt(i)]);
    i += tailleClasse;
  }

}

/*
Fonction pour permettre de mettre à jour la légende
*/
function majLegende(){
  majMode();
  majPaletteCouleur();
  obtenirNombreClasses();
  obtenirBornes();
  afficherLegende();
}

/*
Fonction permettant de calculer le rayon d'un cercle proportionnel à la valeur statistique
*/
function setCircleSize(stat,max_stat){
  if (isNaN(stat)==true){
    return 0
  }else{
  return radius=Math.sqrt(stat)*(20/Math.sqrt(max_stat));
}
}

/*
Fonction permettant de récupérer le centroide d'un Feature
*/
function getCentroid(feature){
  coord = feature.geometry.coordinates;
  if (feature.geometry.type=="MultiPolygon"){
    var polygon = turf.multiPolygon(coord);
  }else{
    var polygon = turf.polygon(coord);
  }
  centro = turf.centroid(polygon).geometry.coordinates;
  long = parseFloat(centro[0]);
  lat = parseFloat(centro[1]);
  return L.latLng(lat, long);
}


/*
Fonction qui s'effectuera au chargement de la page pour afficher les données
liées au TopoJSON
*/
function chargerAfficherGeometriesOnLoad(){
  chargerDecompresserTopoJSON().then(majGeometrie);
  chargerDecompresserTopoJSON("departements").then(chargerDecompresserTopoJSON("communes"));
}

/*
Fonction qui s'effectue au chargement de la page pour afficher des données
*/
function onLoad() {
  remplirListeStats();
  majChoixCouleurPalette();
  majPaletteCouleur();
  ajouterEchelle();
  afficherBoutonsZoomHome();
  chargerAfficherGeometriesOnLoad();
  zoomSelonBounds();
  bloquerFonctionnalitesMapsOutreMer();
  ajouterFondsDeCartes();
  afficherCartouche(mapFranceMetropolitaine);
  afficherLegende();
}

/*------------------------Appel aux différentes fonctions---------------------*/

window.onload = onLoad;
choixZone.addEventListener('click',onClickChoixZone);
mapFranceMetropolitaine.on('zoom',restreindreDonneesSelonZoom);

choixMode.addEventListener("change",majGeometrie);
choixCouleurPalette.addEventListener("change",majGeometrie);
nombreClasses.addEventListener("change",majGeometrie);
choixStat.addEventListener("change",majGeometrie);
choixCercle.addEventListener("change",majGeometrie);
