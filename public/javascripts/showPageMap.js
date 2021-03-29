mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL / location
        center: geometry.coordinates, // starting position [lng, lat]
        zoom: 12 // starting zoom
});

new mapboxgl.Marker()                               
    .setLngLat(geometry.coordinates)
    .addTo(map)
