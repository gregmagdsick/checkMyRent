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
  makeZillowAjaxCall(street, zip, formatZillowResults);

}

function addPropertyToStorage(objProperty, counter) {
  localStorage.setItem('property'+counter, JSON.stringify(objProperty));
  localStorage.setItem('counter', JSON.stringify(counter));
}



//form input validation
function checkFormInput(getRentForm) {
  var rent = document.getElementById('monthlyRent');
  var sqFeet = document.getElementById('sq-feet');
  var beds = document.getElementById('beds');
  var baths = document.getElementById('baths');

  if(isNaN(rent.value)) {
    rent.value = "Please input a numeric value";
    return false;
  }

  if(sqFeet.value != "Sq Feet" && isNaN(sqFeet.value )) {
    sqFeet.value = "Please input a numeric value";
    return false;
  }

  if(beds.value != "Beds" && isNaN(beds.value )) {
    beds.value = "Please input a numeric value";
    return false;
  }

  if(baths.value != "Baths" && isNaN(baths.value)) {
    baths.value = "Please input a numeric value";
    return false;
  }
  return true;
}

//address should contain only alphanumeric characters, used regular expression  http://www.the-art-of-web.com/javascript/validate/
function checkAddressInput(getRentForm) {
  var address = document.getElementById('street');
  if (address.value == "" || address.value == "Street address") {
    address.value = "address cannot be empty!";
    return false;
  }

  //regular expression to match only alphanumeric characters, commas, dash and space
  var addressValidation = /^[\w,\-\s]+$/;

  if(!addressValidation.test(address.value)) {
    address.value = "error: invalid address";
    return false;
  }
  return true;
}

// zip code validation http://stackoverflow.com/questions/160550/zip-code-us-postal-code-validation
function checkZipCode(getRentForm) {
  var zipCode = document.getElementById('zip');
  if (zipCode.value == "" || zipCode.value == "ZIP") {
    zipCode.value = "Zip cannot be empty!";
    return false;
  }
  var zipValidation = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

  if(!zipValidation.test(zipCode.value)) {
    zipCode.value = 'error: invalid zip code';
    return false;
  }
  return true;
}

function formatZillowResults(returnedJson){
  if (returnedJson['SearchResults:searchresults']['message']['code']['#text'] != 0){
    onZillowServerError(returnedJson['SearchResults:searchresults']['message']['code']['#text']);
    return;
  }
  console.log(returnedJson['SearchResults:searchresults']['response']['results']['result']);
  var result = returnedJson['SearchResults:searchresults']['response']['results']['result'];
  storeZillowInLs(result);
}

function storeZillowInLs(result) {
  localStorage.setItem('mostRecentLat', parseFloat(result['address']['latitude']['#text']));
  localStorage.setItem('mostRecentLng', parseFloat(result['address']['longitude']['#text']));
  localStorage.setItem('mostRecentRentEstimate', parseFloat(result['rentzestimate']['amount']['#text']));
  localStorage.setItem('mostRecentCounter', counter - 1);
  localStorage.setItem('mostRecentPropertyLink', result['links']['homedetails']['#text']);
  window.location.href = 'results.html';
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

function onZillowServerError(code){
  console.log('zillow could not find that address');
  console.log('error code ' + code);
  return;
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
