var getRentForm = document.getElementById('propertyDetails');
getRentForm.addEventListener('submit', handleFormSubmit);
var counter = 0;
window.addEventListener('load', initializeIndex)

function initializeIndex(){
  if (localStorage.getItem('counter')){
    counter = Number(localStorage.getItem('counter'));
  }
}

function Property(type, rent, sqFeet, beds, baths, street, zip) {
    this.type = type;
    this.rent = rent;
    this.sqFeet = sqFeet;
    this.beds = beds;
    this.baths = baths;
    this.street = street;
    this.zip = zip;
}

function handleFormSubmit(e) {
  e.preventDefault();

  if(document.getElementById('apartment').checked) {
     var type = 'apartment';
   } else { var type = 'house';
   }

  var rent = document.getElementById('monthlyRent').value;
  var sqFeet = document.getElementById('sq-feet').value;
  var beds = document.getElementById('beds').value;
  var baths = document.getElementById('baths').value;
  var street = document.getElementById('street').value.toString();
  var zip = document.getElementById('zip').value;
  console.log('street =' + street);
  console.log(street);
  console.log(typeof(street));
  console.dir(street);
  localStorage.setItem('mostRecentStreet', street);
  localStorage.setItem('mostRecentZip', zip);

  var objProperty = new Property(type, rent, sqFeet, beds, baths, street, zip);
  addPropertyToStorage(objProperty,counter);
  counter++;
  getZillowResults(street, zip);
  // window.location.href = 'results.html';
}

function addPropertyToStorage(objProperty, counter) {
localStorage.setItem('property'+counter, JSON.stringify(objProperty));
localStorage.setItem('counter', JSON.stringify(counter));
}

//form input validation
//address should contain only alphanumeric characters, used regular expression  http://www.the-art-of-web.com/javascript/validate/

function checkFormInput(getRentForm) {
  var address = document.getElementById('street');
  if (address.value == "" || address.value == "Street address" ) {
      alert('field cannot be empty!');
      address.focus();
      return false;
  }
  //regular expression to match only alphanumeric characters and spaces
  var addressValidation = /^[\w ]+$/;

  if(!addressValidation.test(address.value)) {
      alert('error: the address includes invalid characters');
      address.focus();
      return false;
  }

  return true;
}

  function getZillowResults(address, zip){
    var returnedJson = makeZillowAjaxCall(address, zip, formatZillowResults);
  }

  function formatZillowResults(returnedJson){
    console.log(returnedJson['SearchResults:searchresults']['response']['results']['result']);
    var result = returnedJson['SearchResults:searchresults']['response']['results']['result'];
    storeZillowInLs(result);
  }

  function storeZillowInLs(result) {
    console.log(result);
    localStorage.setItem('mostRecentLat', parseFloat(result['address']['latitude']['#text']));
    console.log(parseFloat(result['address']['latitude']['#text']));
    localStorage.setItem('mostRecentLng', parseFloat(result['address']['longitude']['#text']));
    localStorage.setItem('mostRecentRentEstimate', parseFloat(result['rentzestimate']['amount']['#text']));
    localStorage.setItem('mostRecentCounter', counter - 1);
  }
  //using a CORS proxy at https://crossorigin.me/
  function makeZillowAjaxCall(address, zip, callbackFunction){
    var inputAddress = address;
    var formattedAddress = inputAddress.replace(/ /g, '-');
    // var zipCode = zip.toString();
    var cityStateZip = zip.toString();
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
