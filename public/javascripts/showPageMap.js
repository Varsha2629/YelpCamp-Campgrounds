mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL / location
        center: campground.geometry.coordinates, // starting position [lng, lat]
        zoom: 15 // starting zoom
});

map.addControl(new mapboxgl.GeolocateControl({
        positionOption:{
                enablehighAccuracy:true
        },
        trackUserLocation:true          // My current Location
        }))

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()                               
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
            new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                    `<h3>${campground.title}</h3><p>${campground.location}</p>`
            )
    )
    .addTo(map)

    var marker = new mapboxgl.Marker() // Initialize a new marker
.setLngLat([-122.25948, 37.87221]) // Marker [lng, lat] coordinates
.addTo(map); // Add the marker to the map
 
var geocoder = new MapboxGeocoder({
// Initialize the geocoder
accessToken: mapboxgl.accessToken, // Set the access token
mapboxgl: mapboxgl, // Set the mapbox-gl instance
marker: false, // Do not use the default marker style
placeholder: 'Search for places in Berkeley', // Placeholder text for the search bar
bbox: [-122.30937, 37.84214, -122.23715, 37.89838], // Boundary for Berkeley
proximity: {
longitude: -122.25948,
latitude: 37.87221
} // Coordinates of UC Berkeley
});
 
// Add the geocoder to the map
map.addControl(geocoder);
 
// After the map style has loaded on the page,
// add a source layer and default styling for a single point
map.on('load', function () {
map.addSource('single-point', {
'type': 'geojson',
'data': {
'type': 'FeatureCollection',
'features': []
}
});
 
map.addLayer({
'id': 'point',
'source': 'single-point',
'type': 'circle',
'paint': {
'circle-radius': 10,
'circle-color': '#448ee4'
}
});
 
// Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
//  Add a marker at the result's coordinates
geocoder.on('result', function (e) {
map.getSource('single-point').setData(e.result.geometry);
});
});