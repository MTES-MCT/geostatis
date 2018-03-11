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

//mapboxgl.accessToken = 'pk.eyJ1IjoibWF0bWFyZ28iLCJhIjoiY2piMjM3OWdtMjdtMzJxcGl1cGJnNXg3ZSJ9.aOYDLg13TkgDAe6yeNQAoQ';
var MetropolitanFranceMap = L.map('MetropolitanFranceMap', {
  center: [46.6033540, 1.8883335],
  zoom: 5,
  zoomSnap: 0.25,
  minZoom:5,
  attributionControl: false,
  maxBounds:MetropolitanFranceMaxBounds
});

//Zoom sur la France métropolitaine
MetropolitanFranceMap.fitBounds(MetropolitanFranceInitBounds);

//Ajout de la couche sur les cartes
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(MetropolitanFranceMap);

d3.json("./fonds_carte/json/com-dep-reg_tout_topo_v2.json").then(function(data) {

  // var geojson = topojson.feature(data, data.objects.regions);
  var test = JSON.stringify(data);
  console.log(test.length);
  // var compressed = LZString.compress(test);
  // console.log(compressed.length);
  var compressed2 = pako.deflate(test, { to: 'string' });
  console.log(compressed2.length);
  var blob = new Blob([compressed2], {type: "application/octet-stream"});
  var fileName = "testpako.bin";
  saveAs(blob, fileName);

});