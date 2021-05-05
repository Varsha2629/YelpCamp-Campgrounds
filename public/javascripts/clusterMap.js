	mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
      container: 'cluster-map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-103.59179687498357, 40.66995747013945],
      zoom: 3
    });
       
    
 
       //Add zoom and rotation controls to the map.
       map.addControl(new mapboxgl.NavigationControl());


  
    map.on('load', function () {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      map.addSource('campgrounds', {
      type: 'geojson',
      // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
      // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
      data: campgrounds,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });
     
      // map.addLayer({
      // id: 'clusters',
      // type: 'circle',
      // source: 'campgrounds',
      // filter: ['has', 'point_count'],
      // paint: {
      // // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
      // // with three steps to implement three types of circles:
      // //   * Blue, 20px circles when point count is less than 100
      // //   * Yellow, 30px circles when point count is between 100 and 750
      // //   * Pink, 40px circles when point count is greater than or equal to 750
      // 'circle-color': [
      // 'step',
      // ['get', 'point_count'],
      // '#51bbd6',
      // 10,
      // '#2286c3',
      // 30,
      // '#005ecb'
      // ],
      // 'circle-radius': [
      //         'step',
      //         ['get', 'point_count'],
      //         15,
      //         10,
      //         20,
      //         30,
      //         25
      //     ]
      // }
      // });
     
      // map.addLayer({
      // id: 'cluster-count',
      // type: 'symbol',
      // source: 'campgrounds',
      // filter: ['has', 'point_count'],
      // layout: {
      //         'text-field': '{point_count_abbreviated}',
      //         'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      //         'text-size': 12
      // }
      // });
     
      // map.addLayer({
      // id: 'unclustered-point',
      // type: 'circle',
      // source: 'campgrounds',
      // filter: ['!', ['has', 'point_count']],
      // paint: {
      // 'circle-color': '#11b4da',
      // 'circle-radius': 4,
      // 'circle-stroke-width': 1,
      // 'circle-stroke-color': '#fff'
      // }
      // });



     
      map.addControl(new mapboxgl.GeolocateControl({
        positionOption:{
                enablehighAccuracy:true
        },
        trackUserLocation:true          // My current Location
        }))

    // inspect a cluster on click
    map.on('mouseenter', 'clusters', function (e) {
      console.log('mouseenter')
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('campgrounds').getClusterExpansionZoom(
            clusterId,
            function (err, zoom) {
                if (err) return;

          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
          });
      });
    });
     
    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    // map.on('mouseenter', 'unclustered-point', function (e) {
     
    //   const {popUpMarkup} = e.features[0].properties;
    
    //   const coordinates = e.features[0].geometry.coordinates.slice();
      
    //   while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    // }
     
    // new mapboxgl.Popup()
    //   .setLngLat(coordinates)
    //   .setHTML(    
    //     popUpMarkup
    //   )
    //   .addTo(map);
    // });

        // add markers to map
        campgrounds.features.forEach(function (marker) {
          // create a HTML element for each feature
          var el = document.createElement('div');
          
          el.className = 'marker';
      
          // make a marker for each feature and add it to the map
          new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(
                 `<a href="/campgrounds/${marker.id}">${marker.title}</a>`
                    //popUpMarkup
                )
            )
            .addTo(map);
        });
    
  
    // map.on('mouseenter', 'clusters', function () {
    //   map.getCanvas().style.cursor = 'pointer';
    // });
    // map.on('mouseleave', 'clusters', function () {
    //   map.getCanvas().style.cursor = '';
    // });

    });