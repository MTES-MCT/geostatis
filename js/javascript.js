/*----------------------Variables des limites maximales-----------------------*/

/*Limites maximales de la France métropolitaine*/
var MetropolitanFranceInitBounds = [
    [41.340624,-4.936423], // Coordonnées limites du sud-ouest
    [51.248691, 9.651224]  // Coordonnées limites du nord-est
  ];

  /*Limites maximales de la carte de la France métropolitaine qu'on autorise*/
var MetropolitanFranceMaxBounds = [
    [38.135,-8.481], // Southwest coordinates
    [52.456,11.909]  // Coordonnées limites du nord-est
  ];

/*Limites maximales de la carte de la Guadeloupe*/
var GuadeloupeMaxBounds = [
    [15.7989,-61.8558],
    [16.5651,-60.9439]
  ];

/*Limites maximales de la carte de la Martinique*/
var MartiniqueMaxBounds = [
    [14.3589,-61.3161],
    [14.9249,-60.7544]
  ];

/*Limites maximales de la carte de la Guyane*/
var GuyaneMaxBounds = [
    [1.977,-54.921],
    [6.206,-50.977]
  ];

/*Limites maximales de la carte de la Réunion*/
var ReunionMaxBounds = [
    [-21.4262,55.1376],
    [-20.8254,55.8943]
  ];

/*Limites maximales de la carte de Mayotte*/
var MayotteMaxBounds = [
    [-13.0434,44.9945],
    [-12.6162,45.3255]
  ];

/*----------------------------Création des cartes-----------------------------*/

/*
Initialisation de la carte en centrant au centre de la France métropolitaine
Zoom est de 5, 5 est le niveau de zoom minimal
Il est possible de zoomer avec un pas de 0.25
On ne peut pas sortir de la France avec maxBounds
*/
var MetropolitanFranceMap = L.map('MetropolitanFranceMap', {
	center: [46.6033540, 1.8883335],
	zoom: 5.5,
	zoomSnap: 0.25,
	minZoom:5.5,
	maxZoom:15,
	attributionControl: false,
  zoomControl:false,
	maxBounds:MetropolitanFranceMaxBounds,
	renderer: L.canvas()
});

/*
Carte de la Guadeloupe
*/
var GuadeloupeMap = L.map('GuadeloupeMap', {
  center: [16.2490067,-61.5650444],
  zoom: 8,
  zoomSnap:0.25,
  zoomControl:false,
  attributionControl: false
});

/*
Carte de la Martinique
*/
var MartiniqueMap = L.map('MartiniqueMap', {
  center: [14.6553,-60.9906],
  zoom: 8,
  zoomSnap:0.25,
  zoomControl:false,
  attributionControl: false
});

/*
Carte de la Guyane
*/
var GuyaneMap = L.map('GuyaneMap', {
  center: [4.0039882, -52.9999980],
  zoom: 5,
  zoomSnap:0.25,
  zoomControl:false,
  attributionControl: false
});

/*
Carte de la Réunion
*/
var ReunionMap = L.map('ReunionMap', {
  center: [-21.1309332, 55.5265771],
  zoom: 8,
  zoomSnap:0.25,
  zoomControl:false,
  attributionControl: false
});

/*
Carte de Mayotte
*/
var MayotteMap = L.map('MayotteMap', {
  center: [-12.8230480, 45.1520755],
  zoom: 9,
  zoomSnap:0.25,
  zoomControl:false,
  attributionControl: false
});

function zoomWithBounds() {
  //Zoom sur la France métropolitaine
  MetropolitanFranceMap.fitBounds(MetropolitanFranceInitBounds);

  //Zoom sur la Guadeloupe
  GuadeloupeMap.fitBounds(GuadeloupeMaxBounds);

  //Zoom sur la Martinique
  MartiniqueMap.fitBounds(MartiniqueMaxBounds);

  //Zoom sur la Guyane
  GuyaneMap.fitBounds(GuyaneMaxBounds);

  //Zoom sur la Réunion
  ReunionMap.fitBounds(ReunionMaxBounds);

  //Zoom sur Mayotte
  MayotteMap.fitBounds(MayotteMaxBounds);
}

/*----------------------Propriétés des cartes Outre-Mer-----------------------*/

/*
Fonction pour bloquer la navigation dans dans une carte
*/
function disableMovingInMap(map) {
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
function disableMovingInOverseasMaps() {
  disableMovingInMap(GuadeloupeMap);
  disableMovingInMap(MartiniqueMap);
  disableMovingInMap(GuyaneMap);
  disableMovingInMap(ReunionMap);
  disableMovingInMap(MayotteMap);
}

/*----------------------Propriétés des cartes Outre-Mer-----------------------*/

/*
Fonction permettant l'ajout des couches sur les cartes
*/
function addLayers() {

  //Ajout de la couche France Métropolitaine
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(MetropolitanFranceMap);

  //Ajout de la couche Guadeloupe
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(GuadeloupeMap);

  //Ajout de la couche Martinique
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(MartiniqueMap);

  //Ajout de la couche Guyane
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(GuyaneMap);

  //Ajout de la couche Reunion
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(ReunionMap);

  //Ajout de la couche Mayotte
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(MayotteMap);
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
var choose_mode = document.getElementById("choose_mode");
var choose_color_palette = document.getElementById("choose_color_palette");
var statAffichee = document.getElementById("statAffichee");
var metadonneesStat = document.getElementById("metadonneesStat");
var numberOfRange = document.getElementById("numberOfRange");
var showNumberOfRange = document.getElementById("showNumberOfRange");
showNumberOfRange.innerHTML = numberOfRange.value;

//Variables globales
var layerMetropole; //Objet layer GeoJSON de la métropole affiché sur la carte
var layerGuadeloupe; //Objet layer GeoJSON de la Guadeloupe affiché sur la carte
var layerMartinique; //Objet layer GeoJSON de la Martinique affiché sur la carte
var layerGuyane; //Objet layer GeoJSON de la Guyane affiché sur la carte
var layerReunion; //Objet layer GeoJSON de la Réunion affiché sur la carte
var layerMayotte; //Objet layer GeoJSON de Mayotte affiché sur la carte

var topoJSONByScale = {};
var highlightedFeatureId;

var legend = L.control({position: 'bottomleft'}); //Légende
var Geometry_JSON_scale = "regions"; //Nom de l'échelle pour les fichiers de zones JSON
var scale = L.control.scale({imperial:false, position: 'bottomright'}); //Échelle
var Stats_JSON; //Fichier JSON affichant les stats
var grades = [0, 1, 2, 4, 5, 10, 20, 50, 80];
var colors = ['#FFEDCD','#FFEDA0','#FED976','#FEB24C','#FD8D3C','#FC4E2A','#E31A1C','#BD0026','#800026','#799026','#570026'];
var info = L.control({position: 'topright'}); //Objet affichant les données de la zone de survol
var zoneAffichee = 'region';
var stats;
var statsMetadata;
var places;
var valeurs;
var numeriquesValeurs; //Même tableau que valeurs mais qu'avec des nombres
var mode = choose_mode.value;
var color_palette = choose_color_palette.value;
var valueNumberOfRange; //Nombre de classes


/*------------------------Lecture d'un fichier JSON---------------------------*/

/*
Fonction permettant la lecture d'un fichier JSON pour l'afficher sur la carte
*/
function lire_fichier_JSON() {

  var json = topoJSONByScale[Geometry_JSON_scale];
  places = topojson.feature(json, json.objects[Geometry_JSON_scale]);
  placesDROM = topojson.feature(json, json.objects[Geometry_JSON_scale + "DROM"]);

  if (Stats_JSON && Stats_JSON != '') {
    getStats();
  } else {
    addGeojsonLayers();
  }
}

/*
Fonction permettant de charger d'un fichier TopoJSON pour qui va être décompressé.
*/
function load_fichier_topoJSON(scale = Geometry_JSON_scale) {

  var filename = "./fonds_carte/json/" + scale + ".json.txt";
  var promesse = d3.text(filename).then(function(data) {
    topoJSONByScale[scale] = JSON.parse(LZString.decompressFromUTF16(data));
  });
  return promesse;
}

/*------------------------Gestion des statistiques----------------------------*/

/*
Fonction pour permettre d'afficher les métadoonées de la statistique
*/
function showStatMetadata(){
  metadonneesStat.innerHTML = statsMetadata.stat_name;
}

/*
Fonction permettant d'obtenir toutes les valeurs numériques d'un tableau
*/
function getNumericArray(array){
  var newArray = [];

  for (var i=0;i<array.length;i++){
    if (!isNaN(array[i])){
      newArray.push(array[i]);
    }
  }
  return newArray;
}

/*
Fonction permettant de lire un fichier de statistiques de le traiter afin
de les représenter sur les cartes.
*/
function getStats() {

  valeurs = [];

  d3.json(Stats_JSON).then(function(stats) {
    statsMetadata = stats.metadata;

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
    addGeojsonLayers();
    numeriquesValeurs = getNumericArray(valeurs);
  });
}

/*-------------------------Gestion des objets JSON----------------------------*/

function addGeojsonLayers() {

  if (layerMetropole) {
    MetropolitanFranceMap.removeLayer(layerMetropole);
    GuadeloupeMap.removeLayer(layerGuadeloupe);
    MartiniqueMap.removeLayer(layerMartinique);
    GuyaneMap.removeLayer(layerGuyane);
    ReunionMap.removeLayer(layerReunion);
    MayotteMap.removeLayer(layerMayotte);
  }

  /*
  layerMetropole = L.vectorGrid.slicer(places,{
    vectorTileLayerName: 'metropole',
    rendererFactory: L.svg.tile,
    interactive: true,
    getFeatureId: function(f) {
        return f.properties.id;
    },
    vectorTileLayerStyles: {metropole: gridStyle},
    // onEachFeature: onEachFeature
  })
  .on('mouseover', function(e) {
    if (e.layer.properties.id != highlightedFeatureId || !highlightedFeatureId) {
      if (highlightedFeatureId) {
        layerMetropole.resetFeatureStyle(highlightedFeatureId);
      }
      highlightedFeatureId = e.layer.properties.id;
      var style = gridStyle(e.layer.properties);
      style.weight = 3;
      layerMetropole.setFeatureStyle(e.layer.properties.id, style);
      info.update(e.layer.properties);
    }
  })
  .addTo(MetropolitanFranceMap);
  */

  //Ajout des différents objets sur les cartes
  layerMetropole = L.geoJSON(places,{style: style, onEachFeature: onEachFeature}).addTo(MetropolitanFranceMap);
  layerGuadeloupe = L.geoJSON(placesDROM,{style: style, onEachFeature: onEachFeature}).addTo(GuadeloupeMap);
  layerMartinique = L.geoJSON(placesDROM,{style: style, onEachFeature: onEachFeature}).addTo(MartiniqueMap);
  layerGuyane = L.geoJSON(placesDROM,{style: style, onEachFeature: onEachFeature}).addTo(GuyaneMap);
  layerReunion = L.geoJSON(placesDROM,{style: style, onEachFeature: onEachFeature}).addTo(ReunionMap);
  layerMayotte = L.geoJSON(placesDROM,{style: style, onEachFeature: onEachFeature}).addTo(MayotteMap);
}

/*
Fonction permettant d'éviter de sélectionner certaines données
en fonction du niveau de zoom
*/
function restreindre_donnees() {
  var zoomLevel = MetropolitanFranceMap.getZoom();

  //Interdiction de l'accès aux communes
  if (zoomLevel < 7) {
    /*
    On enlève la carte des communes si le niveau de zoom est inférieur à 7.
    On met celle des départements par défaut
    */
    if (choixZone.choixzone.value == "commune") {
      departement.checked = true;
      montrer_zone();
    }

    //On cache la case des communes
    choixCommune.style.display = "none";
    choixDepartement.style.display = "block";
    choixRegion.style.display = "block";

  } else if (zoomLevel < 8) {
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
      montrer_zone();
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
function addScale() {
  scale.addTo(MetropolitanFranceMap);
}

/*
Ajout d'une série de boutons avec 3 choix de zoom :
- zoomer
- dézoomer
- retourner à la vue initiale (zoom à 5.5)
*/
function zoomButtons(){
  var zoomHome = L.Control.zoomHome({homeZoom:5.5});
  zoomHome.addTo(MetropolitanFranceMap);
}

/*
Fonction permettant d'obtenir la couleur d'un polygone
en fonction d'une échelles de valeurs (grades) et de couleurs (colors)
 */
//var getColor = d3.scaleThreshold().domain(grades).range(colors);

/*
Fonction permettant d'obtenir la couleur d'un polygone
en fonction d'une échelle de valeurs et de couleurs
 */
function getColor(d) {

    for (var i = 0; i < grades.length-1; i++) {
      if (isNaN(d)){
        return '#AAAAAA'
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
  if (feature.properties.stats) {
    color = getColor(feature.properties.stats);
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
Fonction permettant de...
*/
function gridStyle(properties) {
  return style({properties:properties});
}

/*
Surbrillance de la carte
*/
function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 3,
    color: '#000000',
    dashArray: '',
    fillOpacity: 0.8
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }

  info.update(layer.feature.properties);
}

/*
Fonction permettant de remettre l'objet à l'état initial lorsqu'on ne le survole plus
*/
function resetHighlight(e) {
  // layerMetropole.resetFeatureStyle(e.target);
  layerGuadeloupe.resetStyle(e.target);
  layerMartinique.resetStyle(e.target);
  layerGuyane.resetStyle(e.target);
  layerReunion.resetStyle(e.target);
  layerMayotte.resetStyle(e.target);
  info.update();
}

/*
Fonction gérant les événements liés à la carte (mouseout, mouseover...)
*/
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
  });
}

/*
Fonction permettant d'arrondir un nombre avec un precision définie
*/
function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

//Fonction permettant de créer la syntaxe HTML pour la légende
function createLegend() {
  var div = L.DomUtil.create('div', 'info legend'),
      labels = [];

  //Ajout d'une ligne dans la légende pour les valeurs inconnues
  div.innerHTML += '<i style="background:#AAAAAA"></i>NC<br>'

  // Boucle pour ajouter dans la légende : la couleur et les bornes
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
        '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
        precisionRound(grades[i], 2) + (precisionRound(grades[i + 1], 2) ? '&ndash;' + precisionRound(grades[i + 1], 2) + '<br>' : '+');
  }

  return div;
}

/*
Fonction permettant d'afficher la légende
*/
function showLegend() {
  legend.onAdd = function (map) {
    return createLegend();
  };
  legend.addTo(MetropolitanFranceMap);
}

/*
Fonction permettant d'afficher la barre d'information qui affiche le nom de la
zone sélectionnée avec d'autres infos
*/
function showPopUp(mapObject) {

  var map = mapObject;

  /* Pop-up sur le côté avec les infos de la zone étudiée */
  info = L.control({position: 'topright'});

  info.onAdd = function (MetropolitanFranceMap) {
    this._div = L.DomUtil.create('div', 'info'); // Création d'une div de classe INFO
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
  info.update = function (properties) {
    var p = properties;
    var valeurStat = "Non connue";
    if (p && !isNaN(p.stats)){
      valeurStat = parseFloat(p.stats);
    }

    this._div.innerHTML = '<h4>Informations</h4>' +  (properties ?
        '<b>' + properties.nom + '</b><br />Code INSEE : ' + properties.id + '</b><br />Valeur : ' +  valeurStat
        : 'Survoler une région');
  };

  info.addTo(mapObject); //Ajout de l'objet sur la carte
}


/*------------------------Sélection de la couche------------------------------*/

/*
Fonction permettant d'autoriser à l'utilisateur de choisir telle ou telle échelle en fonction du niveau de zoom (Région, département, EPCI, commune)
*/
function choisir_zone() {
  if (choixZone.choixzone.value == "departement") {
    Geometry_JSON_scale = "departements";
  }
  else if (choixZone.choixzone.value == "commune") {
    Geometry_JSON_scale = "communes";
  }
  else {
    Geometry_JSON_scale = "regions";
  }
  //Mise à jour de la zone affichée
  zoneAffichee = choixZone.choixzone.value;
}

function montrer_zone(){
  choisir_zone();
  showLegend(grades);
  lire_fichier_JSON();
}

/*
Fonction permettant de changer de zone (région, département, commune) seulement
lorsque l'utilisateur change et non lorsqu'il clique une nouvelle fois sur la
même zone.
*/
function onClickChoixZone(){
  if (choixZone.choixzone.value == zoneAffichee){
    //Ne rien faire
  }
  else{
    montrer_zone();
    showStatMetadata();
  }
}


/*-----------------------Personnalisation de la carte-------------------------*/


/*
Fonction pour permettre de mettre à jour le mode d'intervalle sélectionné
*/
function updateMode(){
  mode = choose_mode.value;
}

/*
Fonction pour permettre de mettre à jour le palette de couleur sélectionnée
*/
function updateColorPalette(){
  color_palette = choose_color_palette.value;
}

/*
Fonction permettant de mettre à jour le nombre de classes que l'utilisateur a
entré avec la barre
*/
function getNumberOfRange(){
  var tempNumberOfRange = parseInt(numberOfRange.value);
  if (isNaN(tempNumberOfRange)) {
    tempNumberOfRange = 5;
  }
  showNumberOfRange.innerHTML = tempNumberOfRange;
  valueNumberOfRange = tempNumberOfRange;
}

/*
Fonction pour permettre de mettre à jour les bornes des intervalles
*/
function getGrades(){
  grades = []; //Réinitialisation de grades

  if (mode == 'intervallesEgaux'){
    getGradesWithEgalIntervals();
  }
  else if (mode == 'effectifsEgaux'){
    getGradesWithEgalEffectifs();
  }
  else{
    //Voir ce qu'il faut faire
  }
}

/*
Fonction pour permettre de mettre à jour la légende
*/
function updateLegend(){
  updateMode();
  updateColorPalette();
  getNumberOfRange();
  getGrades();
  showLegend();
  addGeojsonLayers(); //Mise à jour des couleurs
}


/*
Fonction pour permettre de mettre à jour les bornes des intervalles lorsque
"Intervalles Égaux" est choisi
*/
function getGradesWithEgalIntervals(){

  var minStats = Math.min.apply(Math, numeriquesValeurs);
  var maxStats = Math.max.apply(Math, numeriquesValeurs);
  var size = (maxStats-minStats)/valueNumberOfRange;
  var tempGrades = minStats;

  for (var i=0;i<valueNumberOfRange;i++){

    grades.push(tempGrades);
    tempGrades += size;
  }
}

/*
Fonction pour permettre de mettre à jour les bornes des intervalles lorsque
"Effectif Égaux" est choisi
*/
function getGradesWithEgalEffectifs(){
  //Tri des valeurs dans l'ordre numérique
  numeriquesValeurs.sort(function(a,b) { return a - b;});

  var valeursLength = numeriquesValeurs.length;
  var sizeClasse = valeursLength/valueNumberOfRange;

  var i = 0;

  while (i<valeursLength) {
    grades.push(numeriquesValeurs[parseInt(i)]);
    i += sizeClasse;
  }

}

/*
Fonction qui s'effectuera au chargement de la page pour afficher les données
liées au TopoJSON
*/
function onLoadTopoJSON(){
  load_fichier_topoJSON().then(lire_fichier_JSON);
  load_fichier_topoJSON("departements").then(load_fichier_topoJSON("communes"));
}

/*
Fonction qui s'effectue au chargement de la page pour afficher des données
*/
function onLoad() {
  addScale();
  zoomButtons();
  onLoadTopoJSON();
  showLegend();
  zoomWithBounds();
  disableMovingInOverseasMaps();
  addLayers();
  showPopUp(MetropolitanFranceMap);
}

/*------------------------Appel aux différentes fonctions---------------------*/

window.onload = onLoad;
choixZone.addEventListener('click',onClickChoixZone);
MetropolitanFranceMap.on('zoom',restreindre_donnees);

choose_mode.addEventListener("change",updateLegend);
choose_color_palette.addEventListener("change",updateLegend);
numberOfRange.addEventListener("change",updateLegend);

Stats_JSON = './fichiers_stats/export_population-zone-inondable_copie.json';
