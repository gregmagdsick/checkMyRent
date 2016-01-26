window.addEventListener('load', function(){
  var currentLat = Number(localStorage.getItem('mostRecentLat'));
  var currentLng = Number(localStorage.getItem('mostRecentLng'));
  console.log(currentLat);
  console.log(currentLng);
  initMap(currentLat, currentLng);
})

function initMap(currentLat, currentLng) {
  // console.log(result['address']['latitude']['#text']);
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center:{lat: currentLat, lng: currentLng},
    zoom: 15
  });

  var marker = new google.maps.Marker({
    position: {lat: currentLat, lng: currentLng}
  })
  marker.setMap(map);
}
