let map;
let infowindow;
// funcion de navigator para geolocalizar a una persona
navigator.geolocation.getCurrentPosition(initMap);

function initMap(position) {
    // ubicacion de la persona 
    const lat = position.coords.latitude;
    console.log(lat);
    const lng = position.coords.longitude
    console.log(lng);
    const ubicacionPersona = {lat, lng};
    // funcion de google para mostrar un mapa
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat, lng},
    zoom: 10
  });
  
  infowindow = new google.maps.InfoWindow();
  //Creamos el servicio PlaceService y enviamos la petición
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
    // localización, el radio y el tipo de lugar a obtener 
    location: ubicacionPersona,
    radius: 900,
    // types le pasamos un array con los tipos de búsqueda que queremos hacer
    type: ['restaurant']
  }, callback);


  function callback(results, status) {
    
    if (status === google.maps.places.PlacesServiceStatus.OK) {   
      console.log(status);
      console.log(results);
      // recorremos array entregado por la api
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]); 
        console.log(results);
        // obtenemos valores del objeto
        const name = results[i].name;
        const direccion = results[i].vicinity;
        const foto = results[i].photos[0].getUrl({'maxWidth': 350, 'maxHeight': 350});
        const rating = results[i].rating;        
        const restorant = document.getElementById('restorant');
        restorant.innerHTML += `<h4>${name}</h4><p>${direccion}</p><img src ='${foto}'>`;
        console.log(name);
        console.log(direccion);
        console.log(foto);
        console.log(rating);
      }
    }
  }

  // marcador
  function createMarker(place) {
    const placeLoc = place.geometry.location;
    const marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });
    //el evento click del marcador
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
  }
};