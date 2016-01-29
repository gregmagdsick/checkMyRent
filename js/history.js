'use strict';
window.addEventListener('load', function(){
  var counter = Number(localStorage.getItem('counter'));
  var propertyArray = [];
  for (var i = 0; i < counter; i++) {
    propertyArray.unshift(['property' + i, JSON.parse(localStorage.getItem('property' + i))]);
    //console.log(propertyArray[i]);
  }
  console.log(propertyArray);
  //var firstProperty = JSON.parse(localStorage.getItem('property0'));
  var mainContent = document.getElementById('mainContent');

  for (var i = 0; i < propertyArray.length; i++) {
    var thisHistoryDivEl = document.createElement('div');
    thisHistoryDivEl.className='historyHolderDiv';
    thisHistoryDivEl.id= propertyArray[i][0];
    thisHistoryDivEl.innerHTML ='<h5>' + propertyArray[i][1].street + ' $' + propertyArray[i][1].rent + '/mo </h5>';
    mainContent.appendChild(thisHistoryDivEl);
    thisHistoryDivEl.addEventListener('click', onHistoryItemClick);
  }
});

function onHistoryItemClick(event) {
  console.log(event);
  console.log(this);
  console.log(this.id);
  var thisLsPropertyKey = this.id;
  console.log(thisLsPropertyKey);
  console.log(thisLsPropertyKey.slice(8, thisLsPropertyKey.length));
  var thisProperty = JSON.parse(localStorage.getItem(this.id));
  console.log(JSON.parse(localStorage.getItem(this.id)));
  var mostRecentCounter = thisLsPropertyKey.slice(8, thisLsPropertyKey.length);
  makeZillowAjaxCall(thisProperty['street'], thisProperty['zip'], formatZillowResults, mostRecentCounter);
}

function formatZillowResults(returnedJson, mostRecentCounter){
  console.log(returnedJson['SearchResults:searchresults']['response']['results']['result']);
  var result = returnedJson['SearchResults:searchresults']['response']['results']['result'];
  storeZillowInLs(result, mostRecentCounter);
}

function storeZillowInLs(result, mostRecentCounter) {
  localStorage.setItem('mostRecentLat', parseFloat(result['address']['latitude']['#text']));
  localStorage.setItem('mostRecentLng', parseFloat(result['address']['longitude']['#text']));
  localStorage.setItem('mostRecentRentEstimate', parseFloat(result['rentzestimate']['amount']['#text']));
  localStorage.setItem('mostRecentPropertyLink', result['links']['homedetails']['#text']);
  localStorage.setItem('mostRecentCounter', mostRecentCounter);
  window.location.href = 'results.html';
}

function makeZillowAjaxCall(address, zip, callbackFunction, mostRecentCounter){
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
      callbackFunction(returnedJson, mostRecentCounter);
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
      obj['@attributes'] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
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
      if (typeof(obj[nodeName]) == 'undefined') {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof(obj[nodeName].push) == 'undefined') {
          var old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}
