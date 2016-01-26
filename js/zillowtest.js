var callZillowButton = document.getElementById('callZillowButton');

callZillowButton.addEventListener('click', function(){
  makeZillowAjaxCall('1551 NW 195th St', 'shoreline', 'washington', 98177);
});

//using a CORS proxy at https://crossorigin.me/
function makeZillowAjaxCall(address, city, state, zip){
  var inputAddress = address;
  var formattedAddress = inputAddress.replace(/ /g, '-');
  var zipCode = zip.toString();
  var cityStateZip = city.toLowerCase() + '-' + state.toLowerCase() + '-' + zip;
  var url = 'http://crossorigin.me/' + 'http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz19vtt4r677v_3v2ae&address=' + formattedAddress + '&citystatezip=' + cityStateZip + '&rentzestimate=true';
  console.log(url);
  // var url = 'http://crossorigin.me/' + 'http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz19vtt4r677v_3v2ae&address=1551-NW-195th-St&citystatezip=shoreline-washington-98177&rentzestimate=true';

  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'xml',
    success: function (xml){
      console.log(xml);
      var returnedJson = xmlToJson(xml);
      console.log(returnedJson);
      return returnedJson;
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
