'use strict';

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
  zoomSnap: 0.25,  // pour permettre d'ajuster finement le zoom aux limites de la carte
  zoomControl:false,
  attributionControl: false
});

/*
Carte de la Martinique
*/
var mapMartinique = L.map('mapMartinique', {
  center: [14.6553,-60.9906],
  zoom: 8,
  zoomSnap: 0.25,
  zoomControl:false,
  attributionControl: false
});

/*
Carte de la Guyane
*/
var mapGuyane = L.map('mapGuyane', {
  center: [4.0039882, -52.9999980],
  zoom: 5,
  zoomSnap: 0.25,
  zoomControl:false,
  attributionControl: false
});

/*
Carte de la Réunion
*/
var mapReunion = L.map('mapReunion', {
  center: [-21.1309332, 55.5265771],
  zoom: 8,
  zoomSnap: 0.25,
  zoomControl:false,
  attributionControl: false
});

/*
Carte de Mayotte
*/
var mapMayotte = L.map('mapMayotte', {
  center: [-12.8230480, 45.1520755],
  zoom: 9,
  zoomSnap: 0.25,
  zoomControl:false,
  attributionControl: false
});

/*----------------------Gestion des cartes-----------------------*/

/*
Fonction pour ajuster le zoom des cartes afin de contenir les emprises
*/
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

/*
Fonction permettant l'ajout des couches sur les cartes à partir d'une URL du serveur de fonds de carte
*/
function ajouterFondsDeCartes(url) {
  //Ajout de la couche fond de carte France Métropolitaine
  L.tileLayer(url).addTo(mapFranceMetropolitaine);
  //Ajout de la couche fond de carte sur les DROM
  L.tileLayer(url).addTo(mapGuadeloupe);
  L.tileLayer(url).addTo(mapMartinique);
  L.tileLayer(url).addTo(mapGuyane);
  L.tileLayer(url).addTo(mapReunion);
  L.tileLayer(url).addTo(mapMayotte);
}

/*-------------------------------Variables globales---------------------------*/

//Ensemble des balises du fichier html
var titrePrincipal = document.getElementById("titrePrincipal");
var sousTitre = document.getElementById("sousTitre");
var choixRegion = document.getElementById("choixRegion");
var choixDepartement = document.getElementById("choixDepartement");
var choixCommune = document.getElementById("choixCommune");
var choixEchelle = document.getElementById("menuChoixEchelle");
var departement = document.getElementById("departement");
var choixMode = document.getElementById("choixMode");
var choixPaletteCouleur = document.getElementById("choixPaletteCouleur");
var choixStat = document.getElementById("choixStat");
var menuChoixNombreClasses = document.getElementById("menuChoixNombreClasses");
var nombreClasses = document.getElementById("nombreClasses");
var afficheNombreClasses = document.getElementById("afficheNombreClasses");
afficheNombreClasses.innerHTML = nombreClasses.value;

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

var url = 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png' //Url du serveur de fonds de carte
var topoJsonParEchelle = {}; //Tableau des TopoJSON par échelle
var echelleGeometrieJson = "regions"; //Nom de l'échelle pour les fichiers de zones JSON
var places; //Contiendra les géométries geoJSON de métropole issues du TopoJSON de l'échelle sélectionnée
var placesDROM; //Même chose pour les DROM
var grades = [];
var colors;
var couleurCercleNegatif;
var couleurCerclePositif;
var maxAbsoluStats = NaN;
var uniteStat; //Unité associée à la statistique
var titreStat; //Titre associé à la statistique
var valeursNumeriques = []; //Tableau des valeurs numériques de la stat
var geostatsObject = new geostats();
var mode = choixMode.value;
var valeurNombreClasses; //Nombre de classes
var controlLegende = L.control({position: 'bottomleft'}); //Légende
var controlInfo = L.control({position: 'topright'}); //Objet affichant les données de la zone de survol
var echelleAffichee = 'region';
var miniMap; //Variable liée à la mini-map
var miniMapAffichee = false; //Indique si la mini-map est affichée ou non
var statExiste = false;

var colorPalettes = {"0":{"nom":"Classique","couleurs":['#FFEDCD','#FFEDA0','#FED976','#FEB24C','#FD8D3C','#FC4E2A','#E31A1C','#BD0026','#800026','#799026','#570026'],"couleurCerclePositif":'#00FF00',"couleurCercleNegatif":'#FF0000'},"1":{"nom":"Bleus","couleurs":['#0000FF','#0000EE','#0000DD','#0000CC','#0000BB','#0000AA','#000099','#000088','#000077','#000066','#000055'],"couleurCerclePositif":'#0000FF',"couleurCercleNegatif":'#000055'},"2":{"nom":"Verts","couleurs":['#00FF00','#00EE00','#00DD00','#00CC00','#00BB00','#00AA00','#009900','#008800','#007700','#006600','#005500'],"couleurCerclePositif":'#00FF00',"couleurCercleNegatif":'#FF0000'},"3":{"nom":"Rouges","couleurs":['#FF0000','#EE0000','#DD0000','#CC0000','#BB0000','#AA0000','#990000','#880000','#770000','#660000','#550000'],"couleurCerclePositif":'#FF0000',"couleurCercleNegatif":'#00FF00'}}


/*------------------------Gestion des mises à jour géométrie et stats---------------------------*/

/*
Fonction permettant le changement de couche géométrique
*/
function majGeometrie() {

  majEchelle();

  var json = topoJsonParEchelle[echelleGeometrieJson];
  places = topojson.feature(json, json.objects[echelleGeometrieJson]);
  placesDROM = topojson.feature(json, json.objects[echelleGeometrieJson + "DROM"]);

  //Peut être dans majGeometrie()
  // if (mapFranceMetropolitaine.getZoom() >= 8 && choixEchelle.choixEchelle.value == "commune"){
  //   placesAvecBasePostGis();
  // }


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

  var cheminFichier = obtenirCheminFichierJsonStats(); //Obtention du chemin du fichier
  valeursNumeriques = [];
  var promesse = null;
  if (cheminFichier != '') {
    statExiste = true;
    promesse = obtenirStats(cheminFichier);
  } else {
    statExiste = false;
    recupererMetadonneesStats(); // Réinitialisation des métadonnées
    // Réinitialisation des statistiques sur les géométries
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
Fonction pour permettre de mettre à jour la légende
*/
function majLegende(){
  majMode();
  majPaletteCouleur();
  majNombreClasses();
  obtenirBornes();
  afficherLegende();
}

/*
Fonction pour permettre de mettre à jour le mode d'intervalle sélectionné.
Si "cerclesProportionnels" est sélectionné, il devient impossible de choisir
le nombre de classes.
*/
function majMode(){
  mode = choixMode.value;
  if (mode == "cerclesProportionnels"){
    nombreClasses.disabled = true;
    menuChoixNombreClasses.style.display = 'none';
  }
  else{
    nombreClasses.disabled = false;
    menuChoixNombreClasses.style.display = '';
  }
}

/*
Fonction pour permettre de mettre à jour le palette de couleur sélectionnée
*/
function majPaletteCouleur(){
  var i = choixPaletteCouleur.value;
  colors = colorPalettes[i].couleurs;
  couleurCerclePositif = colorPalettes[i].couleurCerclePositif;
  couleurCercleNegatif = colorPalettes[i].couleurCercleNegatif;
}

/*
Fonction permettant de mettre à jour le nombre de classes que l'utilisateur a
entré avec la barre
*/
function majNombreClasses(){
  var tempNombreClasses = parseInt(nombreClasses.value);
  if (isNaN(tempNombreClasses)) {
    tempNombreClasses = 5;
  }
  afficheNombreClasses.innerHTML = tempNombreClasses;
  valeurNombreClasses = tempNombreClasses;
}

/*
Fonction permettant de choisir telle ou telle échelle (Région, département, commune)
*/
function majEchelle() {
  if (choixEchelle.choixEchelle.value == "departement") {
    echelleGeometrieJson = "departements";
  }
  else if (choixEchelle.choixEchelle.value == "commune") {
    echelleGeometrieJson = "communes";
  }
  else {
    echelleGeometrieJson = "regions";
  }
  //Mise à jour de l'échelle affichée
  echelleAffichee = choixEchelle.choixEchelle.value;
}

/*
Fonction permettant de changer d'échelle (région, département, commune) seulement
lorsque l'utilisateur change et non lorsqu'il clique une nouvelle fois sur la
même échelle.
*/
function onClickChoixEchelle(){
  if (choixEchelle.choixEchelle.value != echelleAffichee){
    majGeometrie();
  }
}

/*
Fonction permettant d'éviter de sélectionner certaines données
en fonction du niveau de zoom
*/
function restreindreChoixEchelleSelonZoom() {
  var niveauZoom = mapFranceMetropolitaine.getZoom();

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
    if (choixEchelle.choixEchelle.value == "region") {
      departement.checked = true;
      majGeometrie();
    }
    //On cache la case des régions
    choixCommune.style.display = "block";
    choixDepartement.style.display = "block";
    choixRegion.style.display = "none";
  }
}


/*-------------------------Gestion des objets TopoJSON/GeoJSON----------------------------*/

/*
Fonction permettant de charger un fichier TopoJSON pour être décompressé.
*/
function chargerDecompresserTopoJSON(scale) {
  var filename = "./fonds_carte/json/" + scale + ".json.txt";
  var promesse = d3.text(filename).then(function(data) {
    topoJsonParEchelle[scale] = JSON.parse(LZString.decompressFromUTF16(data));
  });
  return promesse;
}


/*
Fonction qui s'effectuera au chargement de la page pour afficher les données
liées au TopoJSON
*/
function chargerAfficherGeometriesOnLoad(){
  chargerDecompresserTopoJSON(echelleGeometrieJson).then(majGeometrie);
  // Dans le cas d'une visualisation normale, on précharge les départements et les communes
  if (echelleGeometrieJson == "regions") {
    chargerDecompresserTopoJSON("departements").then(chargerDecompresserTopoJSON("communes"));
  }
}

/*
Fonction qui ajoute à la (ou réinitialise) les couches de géométries
*/
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

  if (mode == "cerclesProportionnels" && statExiste){
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
  }
}


/*------------------------Gestion des statistiques----------------------------*/

/*
Fonction pour permettre de récupérer les métadonnées de la statistique.
Si elles n'existent pas, on ne donne pas d'unité et le titre est "Création de cartes statistiques"
*/
function recupererMetadonneesStats(statsMetadata = null){

  var sousTitreStat = "";

  //Obtention de l'unité
  try{
    uniteStat = statsMetadata.unit_name;
    if (uniteStat == undefined){
      uniteStat = "";
    }
  }
  catch(error) {
    uniteStat = "";
  }

  if (statExiste){
    //Obtention du titre et suppression du sous-titre
    titreStat = statsMetadata.stat_name;
  }else{
    titreStat = "Création de cartes statistiques";
    sousTitreStat = "Donnée non disponible à cette échelle";
  }

  titrePrincipal.innerHTML = titreStat;
  sousTitre.innerHTML = sousTitreStat;

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
  var statsJson = "./fichiers_stats/";
  var nomFichierStatsJson;

  try {
    nomFichierStatsJson = listeStatsEtTitres[parseFloat(choixStat.value)][0];
    nomFichierStatsJson += "_" + choixEchelle.choixEchelle.value + ".json";

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
  return statsJson;
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
Fonction permettant de lire un fichier de statistiques et le traiter afin
de les représenter sur les cartes.
*/
function obtenirStats(fichierJson) {

  var promesse = d3.json(fichierJson).then(function(stats) {
    // On essaye de récupérer les métadonnées de la stat
    recupererMetadonneesStats(stats.metadata);
    var valeurs = [];
    if (stats.metadata.scale == choixEchelle.choixEchelle.value) {
      // Ajout des stats sur les objets géométriques de métropole
      for (let i=0; i< places.features.length; i++) {
        let code_insee = places.features[i].properties.id;
        valeurs.push(stats.data[code_insee]);
        places.features[i].properties["stats"] = stats.data[code_insee];
      }
      // Ajout des stats sur les objets géométriques des DROM
      for (let i=0; i< placesDROM.features.length; i++) {
        let code_insee = placesDROM.features[i].properties.id;
        valeurs.push(stats.data[code_insee]);
        placesDROM.features[i].properties["stats"] = stats.data[code_insee];
      }
    }
    valeursNumeriques = obtenirArrayNumerique(valeurs);
    // Ajout des valeurs numériques à l'objet geostats pour les classifications
    geostatsObject.setSerie(valeursNumeriques);
    maxAbsoluStats = Math.max(Math.abs(geostatsObject.min()),geostatsObject.max());
  });
  return promesse;
}


/*--------------------Gestion des classifications et styles---------------------*/

/*
Fonction pour permettre de mettre à jour les bornes des intervalles
*/
function obtenirBornes(){
  grades = []; //Réinitialisation de grades
  if (valeursNumeriques.length == 0){
    grades = [];
  }
  else if (mode == 'intervallesEgaux'){
    grades = geostatsObject.getClassEqInterval(valeurNombreClasses).slice(0, -1);
  }
  else if (mode == 'effectifsEgaux'){
    grades = geostatsObject.getClassQuantile(valeurNombreClasses).slice(0, -1);
  }
  else if (mode == 'ecartType'){
    grades = geostatsObject.getClassStdDeviation(valeurNombreClasses).slice(0, -1);
  }
  else if (mode == 'rupturesNaturelles'){
    grades = geostatsObject.getClassJenks(valeurNombreClasses).slice(0, -1);
  }
  else{
    //Voir ce qu'il faut faire
  }
}

/*
Fonction permettant d'obtenir la couleur d'un polygone
en fonction d'une échelle de valeurs et de couleurs
 */
function obtenirCouleur(d) {

  //Cas où d n'est pas un nombre
  if (isNaN(d)){
    return '#AAAAAA'; //Couleur grise
  }

  for (var i = 0; i < grades.length-1; i++) {
    if (d >= grades[i] && d < grades[i+1]){
      return colors[i];
    }
  }
  return colors[colors.length-1];
}

/*
Fonction permettant de calculer le rayon d'un cercle proportionnel à la valeur statistique
*/
function setCircleSize(stat,max_stat){
  if (isNaN(stat)==true){
    return 0
  }else{
    return Math.sqrt(Math.abs(stat))*(20/Math.sqrt(max_stat));
  }
}

/*
Fonction permettant de récupérer le centroide d'un Feature
*/
function getCentroid(feature){
  var coord = feature.geometry.coordinates;
  var polygon = null;
  if (feature.geometry.type=="MultiPolygon"){
    polygon = turf.multiPolygon(coord);
  }else{
    polygon = turf.polygon(coord);
  }
  var centro = turf.centroid(polygon).geometry.coordinates;
  var long = parseFloat(centro[0]);
  var lat = parseFloat(centro[1]);
  return L.latLng(lat, long);
}

/*
Fonction permettant de créer le style des polygones
*/
function style(feature) {
  var color = "#AAAAAA"; //Couleur du remplissage par défaut
  var valeur = feature.properties.stats; //Valeur statistique numérique liée à une zone

  //Récupération de la couleur associée à la valeur (si elle est numérique)
  if (!isNaN(valeur) && valeur != null && valeur != "") {
    color = obtenirCouleur(valeur);
  }

  //Cas où aucune statistique existe
  if (!statExiste){
    var couleurDefaut = "#AAAAAA"; //Couleur du remplissage par défaut
    var styleGeometrie = styleDefaut(couleurDefaut);
  }
  //Cas où on affiche des cercles proportionnels
  else if(mode == "cerclesProportionnels"){
    styleGeometrie = styleCercles(color);
  }
  //Cas où on affiche des données colorisées
  else{
    styleGeometrie = styleCouleur(color);
  }

  return styleGeometrie;
}

/*
Fonction permettant de créer le style des polygones si "cerclesProportionnels"
est choisi.
/!\ Cette fonction ne donne par le style des cercles.
*/
function styleCercles(color){
  //Opacité de la frontère par défaut
  var opacite = 1;

  //Si la couche est la commune, la frontière devient invisible
  if (echelleAffichee == 'commune'){
    opacite = 0;
  }

  return {
    fillColor: color,
    weight: 1,
    opacity: opacite,
    color: 'black',
    dashArray: '3',
    fillOpacity: 0,
    fill: true
  };
}

/*
Fonction permettant de créer le style des polygones si aucune statistique n'existe
*/
function styleDefaut(color){
    return {
      fillColor: color,
      weight: 1,
      opacity: 1,
      color: color,
      fillOpacity: 0.7,
      fill: true
    };
  }

/*
Fonction permettant de créer le style des polygones si on désire colorier les régions
*/
function styleCouleur(color){
  //Couleur de la Frontière par défaut
  var couleurFrontiere = 'white';

  //Si la couche est la commune, la frontière prend la même couleur que le remplissage
  if (echelleAffichee == 'commune'){
    couleurFrontiere = color;
  }

  return {
    fillColor: color,
    weight: 1,
    opacity: 1,
    color: couleurFrontiere,
    fillOpacity: 0.7,
    fill: true
  };
}

/*
Surbrillance de la carte
*/
function highlightFeature(e) {
  var layer = e.target;

  if (mode == "cerclesProportionnels"){
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
function onEachFeatureCercle(feature, layer, layerCercle) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
  });
  if (mode == "cerclesProportionnels"){
    creerCercle(feature, layer, layerCercle);
  }
}

/*
Fonctions enrobant la fonction gérant les événements liés à la carte (mouseout, mouseover...)
*/
function onEachFeature(feature, layer) {
  onEachFeatureCercle(feature, layer, layerCercle);
}

function onEachFeatureMartinique(feature, layer) {
  onEachFeatureCercle(feature, layer, layerCercleMartinique);
}

function onEachFeatureGuadeloupe(feature, layer) {
  onEachFeatureCercle(feature, layer, layerCercleGuadeloupe);
}

function onEachFeatureGuyane(feature, layer) {
  onEachFeatureCercle(feature, layer, layerCercleGuyane);
}

function onEachFeatureReunion(feature, layer) {
  onEachFeatureCercle(feature, layer, layerCercleReunion);
}

function onEachFeatureMayotte(feature, layer) {
  onEachFeatureCercle(feature, layer, layerCercleMayotte);
}

/*
Fonction créant un cercle proportionnel dans layerCercle
*/
function creerCercle(feature, layer, layerC){
  var stat = feature.properties["stats"];
  var centroid = getCentroid(feature);

  //Définition de la couleur du cercle en fonction de sa valeur
  var couleurCercle = '#000000';
  if (stat >= 0){
    couleurCercle = couleurCerclePositif;
  }
  else if (stat < 0) {
    couleurCercle = couleurCercleNegatif;
  }
  var marqueurCercle = L.circleMarker(centroid, {
    radius: setCircleSize(stat, maxAbsoluStats),
    weight: 0.1,
    color: '#000000',
    opacity: 1.0,
    fillOpacity: 0.6,
    fillColor: couleurCercle
  }).addTo(layerC);
}

/*--------------------Création et ajout des différents éléments de contrôle et d'habillage---------------------*/

/*
Fonction permettant d'arrondir un nombre avec un precision définie
*/
function precisionDecimale(nombre, precision) {
  var facteur = Math.pow(10, precision);
  return Math.round(nombre * facteur) / facteur;
}

//Fonction permettant de créer la syntaxe HTML pour la légende
function creerLegende() {
  //Création de la div liée à la légende
  var div = L.DomUtil.create('div', 'info legend'),
      labels = [];

  //Mise à jour de la légende si on choisit des cercles proportionnels
  if (mode == "cerclesProportionnels" && statExiste){
    div = remplirLegendeCercle(div);
  }
  //Mise à jour de la légende si on choisit de colorier les zones
  else{
    div = remplirLegendeCouleur(div);
  }
  return div;
}

/*
Fonction pour remplir le contenu de la légende dans le cas où on choisit
de colorier les zones
*/
function remplirLegendeCouleur(div){

  //Ajout d'une ligne dans la légende pour les valeurs inconnues
  div.innerHTML += '<i style="background:#AAAAAA"></i>NC<br>'

  // Boucle pour ajouter dans la légende : la couleur et les bornes
  for (var i = 0; i < grades.length; i++) {

    var borneInf = ecritureScientifique(precisionDecimale(grades[i], 2));
    var borneSup = ecritureScientifique(precisionDecimale(grades[i + 1], 2));

    if (borneSup == "NaN</sup>"){
      borneSup = '+';
    }

    div.innerHTML +=
        '<i style="background:' + obtenirCouleur(grades[i]) + '"></i> ' +
        borneInf + ' &ndash; ' + borneSup + '<br>';
  }

  //Ajout de l'unité si elle existe
  if (uniteStat != ""){
    div.innerHTML += "<i style='font-style:italic;color:black;'>Unité&nbsp;:" + uniteStat.replace(" ", "&nbsp;") + "</i><br>";
  }

  return div;
}

/*
Fonction pour remplir le contenu de la légende dans le cas où on choisit
des cercles proportionnels
*/
function remplirLegendeCercle(div){

  var minValeursNumeriques = Math.min(...valeursNumeriques);
  var maxValeursNumeriques = Math.max(...valeursNumeriques);

  var legendePositif = "";
  var legendeNegatif = "";
  var nomUnite = "Sans unité";
  var couleurCercleLegende = "#AAAAAA"; //Cercle est gris

  if (uniteStat != ""){
    nomUnite = uniteStat;
  }

  var unite = "<text x='5' y='70' font-style = 'italic' fill='black'>Unité : " + nomUnite + "</text>"; //Nom de l'unité



  //Cas où il n'existe que des valeurs positives
  if (minValeursNumeriques >= 0){
    //Le couleur des cercles de la légende celle affichée
    couleurCercleLegende = couleurCerclePositif;
  }
  //Cas où il n'existe que des valeurs négatives
  else if (maxValeursNumeriques <= 0){
    //Le couleur des cercles de la légende sera celle affichée
    couleurCercleLegende = couleurCercleNegatif;
  }
  //Cas où il existe des valeurs positives et négatives
  else{
    legendePositif = "<rect x='10' y='60' width='30' height='20' fill='" + couleurCerclePositif +"'/>" + "<text x='45' y='75' fill='black'>Positif</text>";
    legendeNegatif = "<rect x='10' y='85' width='30' height='20' fill='" + couleurCercleNegatif +"'/>" + "<text x='45' y='100' fill='black'>Négatif</text>";
    if (uniteStat != ""){
      unite = "<text x='10' y='125' font-style = 'italic' fill='black'>Unité : " + nomUnite + "</text>"; //Nom de l'unité
    }
  }

  var r2=10;
  var v2=(r2/20*Math.sqrt(maxAbsoluStats))**2;

  //Ouverture de la balise SVG
  var legendeCercle = "<svg id='legendeSvg'>";

  //Ajout des cercles
  var cercle1 = "<circle cx='25' cy='30' r='20' stroke='black' stroke-width='1' stroke-opacity='1' fill=" + couleurCercleLegende + " fill-opacity='0.6' />";
  var cercle2 = "<circle cx='25' cy='40' r=" + r2.toString() + " stroke='black' stroke-width='1' stroke-opacity='1' fill=" + couleurCercleLegende + " fill-opacity='0.6' />";

  //Ajout des lignes en pointillé
  var ligne1 = "<line x1='25' y1='10' x2='60' y2='10' stroke='black' stroke-dasharray='3, 2' />"
  var ligne2 = "<line x1='25' y1='30' x2='60' y2='30' stroke='black' stroke-dasharray='3, 2' />"

  //Ajout des textes
  var text1 = "<text x='65' y='13.5' fill='black'>"+ ecritureNumeriqueFrancaise(maxAbsoluStats) + "</text>";
  var text2 = "<text x='65' y='33.5' fill='black'>"+ ecritureNumeriqueFrancaise(v2) + "</text>";

  legendeCercle += cercle1 + cercle2 + ligne1 + ligne2 + text1 + text2 + unite + legendePositif + legendeNegatif;

  //Fermeture de la balise SVG
  legendeCercle += "</svg>";

  div.innerHTML = legendeCercle;

  return div;
}

/*
Fonction pour convertir les nombres avec l'écriture scientifique avec les
conventions françaises.
*/
function ecritureScientifique(nombre){
  var nouveauNombre = d3.format(".4")(nombre).replace(/e/g, "x10<sup>") + "</sup>";

  return nouveauNombre.replace(/,/g, " ").replace(".", ",").replace("+", "");
}

/*
Fonction pour convertir les nombres avec l'écriture française
*/
function ecritureNumeriqueFrancaise(nombre){
  return d3.format(",")(nombre).replace(/,/g, " ").replace(".", ",");
}

/*
Fonction pour mettre à jour la largeur de l'image SVG de la légende
des cercles proportionnels pour optimiser l'affichage
Ne peut être appelée qu'après ajout de cette image
*/
function majLargeurSvg(){
  try {
    var legendeSvg = document.getElementById('legendeSvg');
    var bbox = legendeSvg.getBBox();
    legendeSvg.style.width = (bbox.width + 10) + "px";
    legendeSvg.style.height = (bbox.height) + "px";
  }
  catch(error) {
    //Ne rien faire
  }
}


/*
Fonction permettant d'afficher la légende
*/
function afficherLegende() {
  controlLegende.onAdd = function (map) {
    return creerLegende();
  };
  controlLegende.addTo(mapFranceMetropolitaine);
  majLargeurSvg();
}

/*
Fonction permettant d'afficher la barre d'information qui affiche le nom de la
zone sélectionnée avec d'autres infos
*/
function afficherCartouche(mapObject) {

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
    var nomUnite = "";
    var nomTitre = "Pas de donnée";

    if (properties && !isNaN(properties.stats) && properties.stats != null && properties.stats != ""){
      valeurStat = parseFloat(properties.stats);
      valeurStat = ecritureNumeriqueFrancaise(valeurStat); //Mise en syntaxe française de la valeur numérique
    }
    if (valeurStat != "Non connue"){
      nomUnite = uniteStat;
    }

    if (titreStat != undefined){
      nomTitre = titreStat;
    }

    this._div.innerHTML = '<h4>Informations</h4>' +  (properties ?
        '<b>' + properties.nom + '</b><br />Code INSEE : ' + properties.id + '</b><br />Valeur : ' +  valeurStat + " " + nomUnite
        : 'Survoler une région');
  };

  controlInfo.addTo(mapObject); //Ajout de l'objet sur la carte
}

/*
Création d'une mini-carte pour savoir où se situe l'utilisateur dans la France métropolitaine.
Elle s'affiche à partir d'un certain niveau de zoom minimal.
Elle est enlevée à partir d'un certain niveau de zoom maximal.
*/
function afficherMiniMap(){
  var niveauZoom = mapFranceMetropolitaine.getZoom();

  //Affichage de la mini-map si le niveau de zoom est supérieur ou égal à 7 et qu'elle n'est pas encore affichée
  if (niveauZoom >= 7 && !miniMapAffichee){

    //Création des paramètres de la mini-map
    var url = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
    var donneesMiniMap = new L.TileLayer(url,{minZoom: 3, maxZoom: 4});

    //Création de la carte
    miniMap = new L.Control.MiniMap(donneesMiniMap).addTo(mapFranceMetropolitaine);
    miniMapAffichee = true; //Indication de la présence de la carte
  }
  //Supression de la mini-map
  else if (niveauZoom < 7 && miniMapAffichee){
    mapFranceMetropolitaine.removeControl(miniMap);
    miniMapAffichee = false; //Indication de l'absence de la carte
  }

}

/*
Ajout d'une échelle sur la carte de la France métropolitaine
*/
function afficherEchelleGraphique() {
  var controlEchelleGraphique = L.control.scale({imperial:false, position: 'bottomright'}); //Échelle
  controlEchelleGraphique.addTo(mapFranceMetropolitaine);
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
Fonction permettant de faire la liste des palettes de couleurs disponibles dans
le fichier HTML
*/
function remplirChoixPaletteCouleur(){
  choixPaletteCouleur.innerHTML = "";

  for (var i=0;i<Object.keys(colorPalettes).length;i++){
    choixPaletteCouleur.innerHTML += "<option value =" + i +">" + colorPalettes[i].nom + "</option>\n"
  }
}


/*-----------------------Initialisation de la carte-------------------------*/

/*
Fonction qui s'effectue au chargement de la page pour afficher des données
*/
function onLoad() {
  bloquerFonctionnalitesMapsOutreMer();
  zoomSelonBounds();
  ajouterFondsDeCartes(url);
  chargerAfficherGeometriesOnLoad();
  remplirListeStats();
  remplirChoixPaletteCouleur();
  majPaletteCouleur();
  afficherEchelleGraphique();
  afficherMiniMap();
  afficherBoutonsZoomHome();
  afficherCartouche(mapFranceMetropolitaine);
}

/*------------------------Appel aux différentes fonctions---------------------*/

window.onload = onLoad;
choixEchelle.addEventListener('click',onClickChoixEchelle);
mapFranceMetropolitaine.on('zoom',restreindreChoixEchelleSelonZoom);
mapFranceMetropolitaine.on('zoom',afficherMiniMap)
choixMode.addEventListener("change",majGeometrie);
choixPaletteCouleur.addEventListener("change",majGeometrie);
nombreClasses.addEventListener("change",majGeometrie);
choixStat.addEventListener("change",majGeometrie);

/*------------------------------Fonctions extras------------------------------*/

//Fonction permettant d'afficher seulement des communes de la bbox
function placesAvecBasePostGis(){

  //Définition des limites avec un pas pour se donner une marge (en degrés)
  var bounds = mapFranceMetropolitaine.getBounds();
  var pas = 0; //Marge (en degrés) donnée pour la bbox
  var xmin = bounds.getEast() - pas;
  var xmax = bounds.getWest() + pas;
  var ymin = bounds.getSouth() - pas;
  var ymax = bounds.getNorth() + pas;

  //Écriture de la requete à envoyer au fichier php qui renverra un geojson
  var data = "xmin=" + xmin;
  data += "&xmax=" + xmax;
  data += "&ymin=" + ymin;
  data += "&ymax=" + ymax;

  //Initialisation de la variable AJAX
  var ajaxPostGis = new XMLHttpRequest();

  //Destination et type de la requête AJAX (asynchrone)
  ajaxPostGis.open('POST', './fichiers_php/connecter_base_postgis.php', false);

  //Métadonnées de la requête AJAX
  ajaxPostGis.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  //Événement de changement d'état de la requête
  ajaxPostGis.addEventListener('readystatechange',  function(e) {
      //Si l'état est le numéro 4 et que la ressource est trouvée
      if(ajaxPostGis.readyState == 4 && ajaxPostGis.status == 200) {

        //Retour de la requete (soit 'erreur' soit un geojson)
        var resultat = ajaxPostGis.responseText;

        //Cas où il n'y a pas d'erreur
        if (resultat!= "erreur"){
          //Mise à jour de la géométrie
          places = JSON.parse(ajaxPostGis.responseText);
        }

      }})

  //Envoi de la requête à connecter_base_postgis.php
  ajaxPostGis.send(data);

}
