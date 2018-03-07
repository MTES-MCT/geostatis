
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

	  var style_regions = {
      "fill-opacity": 0.9,
      "fill-outline-color": "rgba(0,0,0,0.2)",
      "fill-color": [
        'interpolate',
        ['linear'],
        ['to-number', ['get', 'INSEE_REG']],
        0,  '#fef0d9',
				25, '#fdcc8a',
				50, '#fc8d59',
				75, '#e34a33',
				100,'#b30000'
      ],
    };
    var style_regions_hover = Object.assign({}, style_regions);
    style_regions_hover["fill-opacity"] = 1;
    style_regions_hover["fill-outline-color"] = 'black';

	  map.addLayer({
	    "id": "regions",
	    "type": "fill",
	    "source": "regions",
	    "paint": style_regions
		}, 'place-city-sm');

	  map.addLayer({
	    "id": "regions-hover",
	    "type": "fill",
	    "source": "regions",
	    "paint": style_regions_hover,
      "filter": ["==", "INSEE_REG", ""]
		}, 'place-city-sm');

		var bounds = turf.bbox(data);
		map.fitBounds(bounds, {padding: 20, animate:false});
		map.on('render', setMaxBoundsOnce);
		function setMaxBoundsOnce(e) {
			var nbounds = map.getBounds();
			map.setMaxBounds(nbounds);
			map.off('render', setMaxBoundsOnce);
		};

    map.on("mousemove", "regions", function(e) {
    	map.getCanvas().style.cursor = 'pointer';
      map.setFilter("regions-hover", ["==", "INSEE_REG", e.features[0].properties.INSEE_REG]);
    });
    map.on("mouseleave", "regions", function(e) {
    	map.getCanvas().style.cursor = '';
      map.setFilter("regions-hover", ["==", "INSEE_REG", ""]);
    });

	});

});