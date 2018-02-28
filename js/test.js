
mapboxgl.accessToken = 'pk.eyJ1IjoibWF0bWFyZ28iLCJhIjoiY2piMjM3OWdtMjdtMzJxcGl1cGJnNXg3ZSJ9.aOYDLg13TkgDAe6yeNQAoQ';
var map = new mapboxgl.Map({
  container: 'mapid',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [2.6302, 46.4905],
  zoom: 5,
  attributionControl: false,
});
map.addControl(new mapboxgl.NavigationControl({
  showCompass: false,
}), 'top-right');
map.addControl(new mapboxgl.ScaleControl({
  maxWidth: 100,
  unit: 'metric'
}));
map.addControl(new MapboxLanguage());
map.addControl(new mapboxgl.AttributionControl({
  compact: true,
}));

map.on('load', function () {

	d3.json("./fonds_carte/json_com_dep_reg_mathieu/region_carto_wgs84.json")
		.then(function(data) {

	  map.addSource('regions', {
	      "type": "geojson",
	      "data": data
	  });

	  map.addLayer({
	    "id": "regions",
	    "type": "fill",
	    "source": "regions",
	    "paint": {
	        "fill-outline-color": "rgba(0,0,0,1)",
	        "fill-color": "rgba(255,0,0,0.5)"
	    }
		}, 'place-city-sm');

		var bounds = turf.bbox(data);
		map.fitBounds(bounds, {padding: 20, animate:false});

		map.on('render', toto);
		function toto(e) {
			var nbounds = map.getBounds();
			map.setMaxBounds(nbounds);
			map.off('render', toto);
		};

	});

});