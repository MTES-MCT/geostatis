/*----------------------Variables des limites maximales-----------------------*/

/*Limites maximales de la France métropolitaine*/
  var MetropolitanFranceInitBounds = [
    [41.340624,-4.936423], // Southwest coordinates
    [51.248691, 9.651224]  // Northeast coordinates
  ];

  /*Limites maximales de la carte de la France métropolitaine qu'on autorise*/
  var MetropolitanFranceMaxBounds = [
    [38.135,-8.481], // Southwest coordinates
    [52.456,11.909]  // Northeast coordinates
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
      zoom: 5,
      zoomSnap: 0.25,
      minZoom:5,
      attributionControl: false,
      maxBounds:MetropolitanFranceMaxBounds
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
        //maxBounds:maxBounds
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
          //maxBounds:maxBounds
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
    //maxBounds:maxBounds
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
  //maxBounds:maxBounds
  });

/*
Carte de MayotteMap
*/
var MayotteMap = L.map('MayotteMap', {
    center: [-12.8230480, 45.1520755],
    zoom: 9,
    zoomSnap:0.25,
    zoomControl:false,
    attributionControl: false
    //maxBounds:maxBounds
});

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

/*----------------------Propriétés des cartes Outre-Mer-----------------------*/

/*
Fonction pour bloquer la navigation dans dans une carte
*/
function disableMovingInMap(mapObject){
  var map = mapObject;
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
function disableMovingInOverseasMaps(){
  disableMovingInMap(GuadeloupeMap);
  disableMovingInMap(MartiniqueMap);
  disableMovingInMap(GuyaneMap);
  disableMovingInMap(ReunionMap);
  disableMovingInMap(MayotteMap);
}

disableMovingInOverseasMaps();

/*----------------------Propriétés des cartes Outre-Mer-----------------------*/

//Ajout de la couche sur les cartes
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(MetropolitanFranceMap);

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(GuadeloupeMap);

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(MartiniqueMap);

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(GuyaneMap);

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(ReunionMap);

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(MayotteMap);

/*-------------------------------Variables globales---------------------------*/

//Variables globales
var geojson; //Objet GeoJSON affiché sur la carte
var legend = L.control({position: 'bottomleft'}); //Légende
var JSONFile; //Fichier JSON affichant les zones
var grades = [10, 20, 30, 40, 50, 60, 70];
var colors = ['#800026','#BD0026','#E31A1C','#FC4E2A','#FD8D3C','#FEB24C','#FED976','#FFEDA0'];
var info = L.control({position: 'topright'}); //Objet affichant les données de la zone de survol

//Ensemble des balises du fichier html
var choixRegion = document.getElementById("choixRegion");
var choixDepartement = document.getElementById("choixDepartement");
var choixCommune = document.getElementById("choixCommune");
var choixZone = document.getElementById("choixZone");
var region = document.getElementById("region");
var departement = document.getElementById("departement");
var commune = document.getElementById("commune");
var affichageStats = document.getElementById("affichageStats");

/*------------------------Lecture d'un fichier JSON---------------------------*/

/*
Fonction permettant la lecture d'un fichier JSON pour l'afficher sur la Carte
*/
function lire_fichier_JSON(JSON_filename){

  var JSONFile = JSON_filename;
  var places;
  var request = new XMLHttpRequest();
  request.open('GET', JSONFile);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    places = request.response;
    if (geojson){
      MetropolitanFranceMap.removeLayer(geojson);
    }

    geojson = L.geoJSON(places,{style: style, onEachFeature: onEachFeature}).addTo(MetropolitanFranceMap);

    L.geoJSON(places,{style: style, onEachFeature: onEachFeature}).addTo(GuadeloupeMap);
    L.geoJSON(places,{style: style, onEachFeature: onEachFeature}).addTo(MartiniqueMap);
    L.geoJSON(places,{style: style, onEachFeature: onEachFeature}).addTo(GuyaneMap);
    L.geoJSON(places,{style: style, onEachFeature: onEachFeature}).addTo(ReunionMap);
    L.geoJSON(places,{style: style, onEachFeature: onEachFeature}).addTo(MayotteMap);
  }

}

/*--------------------Interactivité avec la carte, design---------------------*/

/*
Fonction permettant de créer le style des polygones
*/
function style(feature) {
    return {
        fillColor: getColor(parseInt(feature.properties.code_insee)),
        weight: 1,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

/*
Fonction permettant d'obtenir la couleur d'un polygone
en fonction d'une échelles de valeurs et de couleurs
 */
function getColor(d) {

    for (var i = 0; i < grades.length-1; i++) {
      if (d >= grades[i] && d < grades[i+1]){
        return colors[i];
      }
    }
    return colors[colors.length-1];
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
    geojson.resetStyle(e.target);
    info.update();
}

/*
Fonction permettant de zoomer sur l'objet lorsqu'on clique dessus
*/
function zoomToFeature(e) {
    MetropolitanFranceMap.fitBounds(e.target.getBounds());
}

/*
Fonction gérant les événements liés à la carte (mouseout, mouseover...)
*/
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        //click: zoomToFeature
    });
}

/*
Fonction permettant d'éviter de sélectionner certaines données
en fonction du niveau de zoom
*/
function restreindre_donnees(){
  var zoomLevel = MetropolitanFranceMap.getZoom();

  //Interdiction de l'accès aux communes
  if (zoomLevel < 7){

    /*
    On enlève la carte des communes si le niveau de zoom est inférieur à 7.
    On met celle des départements par défaut
    */
    if (choixZone.choixzone.value == "commune"){
      departement.checked = true;
      choisir_zone();
    }

    //On cache la case des communes
    choixCommune.style.display = "none";
    choixDepartement.style.display = "block";
    choixRegion.style.display = "block";

  }else if (zoomLevel < 8 ){
    //On affiche toutes les possibilités
    choixCommune.style.display = "block";
    choixDepartement.style.display = "block";
    choixRegion.style.display = "block";
  }else{
    /*
    On enlève la carte des région si le niveau de zoom est supérieur à 8.
    On met celle des départements par défaut
    */
    if (choixZone.choixzone.value == "region"){
      departement.checked = true;
      choisir_zone();
    }

    //On cache la case des régions
    choixCommune.style.display = "block";
    choixDepartement.style.display = "block";
    choixRegion.style.display = "none";
    }
}

//Fonction permettant de créer la syntaxe HTML pour la légende
function createLegend(){
  var div = L.DomUtil.create('div', 'info legend'),
      labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }

  return div;
}

/*
Fonction permettant d'afficher la légende
*/
function showLegend(){
  legend.onAdd = function (map){
    return createLegend();
  };
  legend.addTo(MetropolitanFranceMap);
}

/*
Fonction permettant d'afficher la barre d'information qui affiche le nom de la
zone sélectionnée avec d'autres infos
*/
function showPopUp(mapObject){

  var map = mapObject;

  /* Pop-up sur le côté avec les infos de la zone étudiée */
  info = L.control({position: 'topright'});

  info.onAdd = function (MetropolitanFranceMap) {
      this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
      this.update();
      return this._div;
  };

  // method that we will use to update the control based on feature properties passed
  info.update = function (properties) {
      this._div.innerHTML = '<h4>Region information</h4>' +  (properties ?
          '<b>' + properties.nom + '</b><br />' + properties.code_insee
          : 'Survoler une région');
  };

  info.addTo(mapObject); //Ajout de l'objet sur la carte
}

showPopUp(MetropolitanFranceMap);

/*------------------------Sélection de la couche------------------------------*/

function choisir_zone() {
  if (choixZone.choixzone.value == "region"){
    JSONFile = "./Fichiers_Geojson/Regions2016.json";
    grades = [10, 20, 30, 40, 50, 60, 70];
    colors = ['#800026','#BD0026','#E31A1C','#FC4E2A','#FD8D3C','#FEB24C','#FED976','#FFEDA0'];
}
  else if (choixZone.choixzone.value == "departement") {
    JSONFile = "./Fichiers_Geojson/Departements2016.json";
    grades = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    colors = ['#800026','#BD0026','#E31A1C','#FC4E2A','#FD8D3C','#FEB24C','#FED976','#FFEDA0'];
  }
  else if (choixZone.choixzone.value == "commune") {
    JSONFile = "./Fichiers_Geojson/comm_carto_wgs84.json";
    grades = [10000, 20000, 30000];
    colors = ['#800026','#BD0026','#E31A1C','#FC4E2A','#FD8D3C','#FEB24C','#FED976','#FFEDA0'];
  }
  else {
    JSONFile = "./Fichiers_Geojson/Regions2016.json";
    grades = [10, 20, 30, 40, 50, 60, 70];
    colors = ['#800026','#BD0026','#E31A1C','#FC4E2A','#FD8D3C','#FEB24C','#FED976','#FFEDA0'];
  }

  showLegend(grades);
  lire_fichier_JSON(JSONFile);

}

/*----------------------*/

/*
Fonction qui s'effectue au chargement de la page pour afficher des données
*/
function onLoad(){
  lire_fichier_JSON("./Fichiers_Geojson/Regions2016.json");
  showLegend(grades);
}

window.onload = onLoad;
choixZone.addEventListener('click',choisir_zone);
MetropolitanFranceMap.on('zoom',restreindre_donnees);
