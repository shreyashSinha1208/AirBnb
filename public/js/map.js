         mapboxgl.accessToken = mapToken;
          const map = new mapboxgl.Map({
                    style: 'mapbox://styles/mapbox/satellite-streets-v12',
                    container: 'map', // container ID
                    center: listing.geometry.coordinates, // starting position [lng, lat]
                    zoom: 10 ,// starting zoom
          });
                
          const marker = new mapboxgl.Marker({color: "red"})
              .setLngLat(listing.geometry.coordinates)
              .setPopup(new mapboxgl.Popup({ offset: 25 })
              .setHTML(`<h5>${listing.title}</h5><p>Exact location will be provided after booking</p>`))
        .addTo(map);