window.addEventListener('load', function(){
  var currentLat = Number(localStorage.getItem('mostRecentLat'));
  var currentLng = Number(localStorage.getItem('mostRecentLng'));
  var mostRecentCounter = localStorage.getItem('mostRecentCounter');
  var mostRecentRentEstimate = Number(localStorage.getItem('mostRecentRentEstimate'));
  var mostRecentProperty = JSON.parse(localStorage.getItem('property' + mostRecentCounter));
  var mostRecentRent = Number(mostRecentProperty['rent']);
  console.log('property' + mostRecentCounter);
  console.dir(mostRecentProperty)
  console.log(mostRecentRent);
  console.log(mostRecentRentEstimate);
  compareRentAndEstimate(mostRecentRent, mostRecentRentEstimate);
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

function compareRentAndEstimate(rent, rentEstimate){
  var arrowArray = [['up-arrow.png', 'Your rent is too damn high!'], ['up_side_arrow.png', 'You are probably paying too much for rent.'], ['side-arrow.png', 'You are getting an average deal on rent.'], ['down_side_arrow.png', 'You are getting a pretty good deal on rent.'], ['down-arrow.png', 'Your rent is too damn low!']];
  var resultsHolderEl = document.getElementById('resultsHolder');
  var arrowImgEl = document.createElement('img');
  arrowImgEl.className = 'resultsArrow';
  var resultsTextHolderEl = document.createElement('div');
  resultsTextHolderEl.className = 'resultsTextHolderEl'
  var resultsHeaderEl = document.createElement('h1');
  resultsHeaderEl.className = 'resultsHeader';
  var rentComparisonEl = document.createElement('h5');
  rentComparisonEl.className = 'rentComparison';
  rentComparisonEl.textContent = "Your rent: $" + rent + ", Zillow's estimated rent: $" + rentEstimate;
  if (rent > 0.95 * rentEstimate && rent < 1.05 * rentEstimate){
    //they are equal
    arrowImgEl.src = 'img/' + arrowArray[2][0];
    resultsHeaderEl.textContent = arrowArray[2][1];
  } else if ( rent > 1.15 * rentEstimate){
    //you are paying too much
    arrowImgEl.src = 'img/' + arrowArray[0][0];
    resultsHeaderEl.textContent = arrowArray[0][1];
  } else if (rent < 0.85 * rentEstimate){
    //great deal
    arrowImgEl.src = 'img/' + arrowArray[4][0];
    resultsHeaderEl.textContent = arrowArray[4][1];
  } else if (rent > 1.05 * rentEstimate){
    //paying a bit too much
    arrowImgEl.src = 'img/' + arrowArray[1][0];
    resultsHeaderEl.textContent = arrowArray[1][1];
  } else if (rent < 0.95 * rentEstimate) {
    //getting a goodish deal
    arrowImgEl.src = 'img/' + arrowArray[3][0];
    resultsHeaderEl.textContent = arrowArray[3][1];
  } else {
    alert('error!');
  }
  resultsHolderEl.appendChild(arrowImgEl);
  resultsHolderEl.appendChild(resultsTextHolderEl);
  resultsTextHolderEl.appendChild(resultsHeaderEl);
  resultsTextHolderEl.appendChild(rentComparisonEl);
}
