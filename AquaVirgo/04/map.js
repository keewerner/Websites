mapboxgl.accessToken = 'pk.eyJ1Ijoia2V3ZXJuZXIiLCJhIjoiY21hdzdmNjQ0MDlkbDJsc2RpdW1wbXM4ZyJ9.TaOtqpOOoXZI2SYSPJVaOg';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/kewerner/clpv72kf201dq01qtd03ig1ka', //clpv72kf201dq01qtd03ig1ka', //ckz8gxm82000z14p666y9alzh',
    center: [12.6331098, 41.9112259],
    hash: true, // HASH
    zoom: 16.71,
    bearing: 0,
    pitch: 0, // was 45
    antialias: true
});

const bounds = [
    [12.40, 41.81], // [west, south]
    [12.7, 41.95]  // [east, north]
];

map.setMaxBounds(bounds);

// const slider = document.getElementById('slider');

const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');

for (const input of inputs) {
    input.onclick = (layer) => {
        const layerId = layer.target.id;
        map.setStyle('mapbox://styles/kewerner/' + layerId);
    };
}

map.on('style.load', () => {

    map.addSource('Pianta1600', {
        'type': 'raster',
        'url': 'mapbox://kewerner.8s2mayod'
    });
    map.addSource('Pianta1753', {
        'type': 'raster',
        'url': 'mapbox://kewerner.a5544kml'
    });
    map.addSource('Pianta1642', {
        'type': 'raster',
        'url': 'mapbox://kewerner.5yigo799'
    });
    map.addLayer({
        'id': 'Pianta1600',
        'slot': 'top',     //trying to make it on-top of everything
        'source': 'Pianta1600',
        'type': 'raster',
        'paint': {
            'raster-opacity': 0
        }
    });
    map.addLayer({
        'id': 'Pianta1753',
        'source': 'Pianta1753',
        'type': 'raster',
        'paint': {
            'raster-opacity': 0
        }
    });
    map.addLayer({
        'id': 'Pianta1642',
        'source': 'Pianta1642',
        'type': 'raster',
        'paint': {
            'raster-opacity': 0
        }
    });
    map.addSource('places-poly', {
        'type': 'geojson',
        'data': 'places-polygon.geojson'
    });
    map.addSource('places', {
        'type': 'geojson',
        'data': 'places.geojson'
    });
    map.addLayer({
        "id": "places-poly",
        "type": "fill-extrusion",
        "source": "places-poly",
        "layout": {
            'text-z-elevate': true,
        },
        "paint": {
            'fill-extrusion-height': 1,
            'fill-extrusion-base': 10,
            'fill-extrusion-color': 'blue',
            'fill-extrusion-opacity': 0.25
        },
        "interactive": true
    });
    map.addLayer({
        "id": "places-circle",
        "type": "circle",
        "source": "places",
        "slot": "middle",
        'paint': {
            'circle-color': '#4264fb',
            'circle-radius': 8,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
        },
        "layout": {
            'circle-z-elevate': true,
        },
        "interactive": true
    });
    map.addLayer({
        "id": "places-label",
        "type": "symbol",
        "source": "places",
        "slot": "top",
        'layout': {
            'symbol-z-elevate': true,
            'text-field': ['get', 'title'],
            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold']
        },
        'paint': {
            'text-color': 'darkblue',
            'text-halo-color': 'antiquewhite',
            'text-halo-width': 1
        },
        "interactive": true
    });

});
map.on('click', function(e) {
    var features = map.queryRenderedFeatures(e.point, {
        layers: ['places-poly', 'places-label', 'places-circle']
    });
    if (!features.length) {
        return;
    }
    var feature = features[0];
    window.open('#' + feature.properties.name, '_parent');
    document.getElementsByClassName('active')[0].removeAttribute("class");
    document.getElementById(feature.properties.name).setAttribute('class', 'active');
});

var placeNames = Object.keys(places);
for (var i = 0; i < placeNames.length; i++) {
    var placeName = placeNames[i];
};

document.getElementById('list').onclick = function(e) {
    var pos = e.target.getAttribute('data-id');
    if (pos !== null) {
        // document.getElementsByClassName('active')[0].removeAttribute("class");
        // e.target.setAttribute('class', 'active');
        map.flyTo(places[pos]);
//test
        window.open('#' + pos, '_parent');
        document.getElementsByClassName('active')[0].removeAttribute("class");
        document.getElementById(pos).setAttribute('class', 'active');
    }
};

Fancybox.bind("[data-fancybox]", {

});