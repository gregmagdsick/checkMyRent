var callZillowButton = document.getElementById('callZillowButton');

callZillowButton.addEventListener('click', function(){
  getZillowResults('1551 NW 195th St', 'shoreline', 'washington', 98177);
});

function getZillowResults(address, city, state, zip){
  var returnedJson = makeZillowAjaxCall(address, city, state, zip, formatZillowResults);
  console.log('inside getZillowResults');
  console.log(returnedJson);
  // var latLng = returnedJson;

}

function formatZillowResults(returnedJson){
  console.log(returnedJson['SearchResults:searchresults']['response']['results']['result']);
  var result = returnedJson['SearchResults:searchresults']['response']['results']['result'];
  initMap(result);
}


function initMap(result) {
  // console.log(result['address']['latitude']['#text']);
  var mapCenterLat = parseFloat(result['address']['latitude']['#text']);
  var mapCenterLng = parseFloat(result['address']['longitude']['#text']);
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


//using a CORS proxy at https://crossorigin.me/
function makeZillowAjaxCall(address, city, state, zip, callbackFunction){
  var inputAddress = address;
  var formattedAddress = inputAddress.replace(/ /g, '-');
  var zipCode = zip.toString();
  var cityStateZip = city.toLowerCase() + '-' + state.toLowerCase() + '-' + zip;
  var url = 'http://crossorigin.me/' + 'http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz19vtt4r677v_3v2ae&address=' + formattedAddress + '&citystatezip=' + cityStateZip + '&rentzestimate=true';
  console.log(url);


  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'xml',
    success: function (xml){
      console.log(xml);
      var returnedJson = xmlToJson(xml);
      console.log(returnedJson);
      callbackFunction(returnedJson);
    },
    error: function(){
      console.log('error');
    }
  });

}

//code taken from https://davidwalsh.name/convert-xml-json
function xmlToJson(xml) {
	// Create the return object
	var obj = {};
	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}
  // do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};
