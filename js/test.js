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
var grades = [10, 20, 30, 40, 50, 60, 70];
var colors = ['#800026','#BD0026','#E31A1C','#FC4E2A','#FD8D3C','#FEB24C','#FED976','#FFEDA0'];
/*
Fonction permettant de créer le style des polygones
*/
function style(feature) {
    return {
        fillColor: getColor(parseInt(feature.properties.id)),
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

    // info.update(layer.feature.properties);
}
/*
Fonction permettant de remettre l'objet à l'état initial lorsqu'on ne le survole plus
*/
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    // info.update();
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


//mapboxgl.accessToken = 'pk.eyJ1IjoibWF0bWFyZ28iLCJhIjoiY2piMjM3OWdtMjdtMzJxcGl1cGJnNXg3ZSJ9.aOYDLg13TkgDAe6yeNQAoQ';
var MetropolitanFranceMap = L.map('MetropolitanFranceMap', {
  center: [46.6033540, 1.8883335],
  zoom: 5,
  zoomSnap: 0.25,
  minZoom:5,
  attributionControl: false,
  maxBounds:MetropolitanFranceMaxBounds
});
var geojson;

//Zoom sur la France métropolitaine
MetropolitanFranceMap.fitBounds(MetropolitanFranceInitBounds);

//Ajout de la couche sur les cartes
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(MetropolitanFranceMap);

d3.text("./fonds_carte/json/testjsx.txt").then(function(data) {

  var json = JSON.parse(JXG.decompress(data));
  var places = topojson.feature(json, json.objects.communes);

  geojson = L.geoJSON(places,{style: style, onEachFeature: onEachFeature}).addTo(MetropolitanFranceMap);
});