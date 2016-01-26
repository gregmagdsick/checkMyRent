
function initMap() {
  var mapCenterLat = 47.6235481;
  var mapCenterLng = -122.3384007;
  var mapDiv = document.getElementById('map');
  var map = new google.maps.Map(mapDiv, {
    center:{lat: mapCenterLat, lng: mapCenterLng},
    zoom: 15
  });

  var marker = new google.maps.Marker({
    position: {lat: mapCenterLat, lng: mapCenterLng}
  })
  marker.setMap(map);
}
