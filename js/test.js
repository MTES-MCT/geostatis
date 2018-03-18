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
var color = d3.scaleThreshold()
              .domain(d3.range(10, 70, 10))
              .range(d3.schemeYlOrRd[8]);
/*
Fonction permettant de créer le style des polygones
*/
function style(feature) {
  return {
    fillColor: color(parseInt(feature.properties.id)),
    weight: 1,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7
  };
}
/*
Surbrillance de la carte
*/
function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 2,
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
  maxBounds:MetropolitanFranceMaxBounds,
  renderer: L.canvas()
});
var geojson;

//Zoom sur la France métropolitaine
MetropolitanFranceMap.fitBounds(MetropolitanFranceInitBounds);

//Ajout de la couche sur les cartes
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(MetropolitanFranceMap);


var fonds_json_dir = "./fonds_carte/json/";
d3.text(fonds_json_dir + "communes.json.b64").then(function(data) {

  console.log(JXG.decompress(data));
  var json = JSON.parse(JXG.decompress(data));
  var places = topojson.feature(json, json.objects.communes);

  geojson = L.geoJSON(places,{style: style, onEachFeature: onEachFeature}).addTo(MetropolitanFranceMap);
});