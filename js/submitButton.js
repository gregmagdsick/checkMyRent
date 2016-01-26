// var propety = document.getElementsById('propertyDetails');
// // var checkRent = document.getElementById('checkMyRent');
// propertyDetails.addEventListener('submit', handleFormSubmit);

function handleFormSubmit() {
    console.log('handleFormSubmit');
    var rent = document.getElementById('monthlyRent').value;
    alert(rent);
    var sqFeet = document.getElementById('sq-feet').value;
    var beds = document.getElementById('beds').value;
    var baths = document.getElementById('baths').value;
    var street = document.getElementById('street').value;
    var zip = document.getElementById('zip').value;

    var propertiesArray = [];

    for(var i = 0; i < propertiesArray.length; i++) {
        console.log(propertiesArray[i]);
    }
}


function Property(rent, sqFeet, beds, baths, street, zip) {
    this.rent = rent;
    this.sqFeet = sq-feet;
    this.beds = beds;
    this.baths = baths;
    this.street = street;
    this.zip = zip;
}

var newProperty = newProperty([],[].....);



    // variables for storing the form labels -  they will be used as parameters in the render function
    // var rentMonthly = event.target.rent.value;
    // var sq = parseFloat(event.target.sq-feet.value);
    // var beds = parseFloat(event.target.beds.value);
    // var baths = parseFloat(event.target.baths.value);
    // var address = parseFloat(event.target.street.value);
    //
    // event.target.storeName.value = null;
    // event.target.minCust.value = null;
    // event.target.maxCust.value = null;
    // event.target.avgCups.value = null;
    // event.target.avgPounds.value = null;

//constructor to take the parameters from the form

// function getRequests() {
//     var s1 = location.search.substring(1, location.search.length).split('&'),
//         r = {}, s2, i;
//     for (i = 0; i < s1.length; i++) {
//          s2 = s1[i].split('=');
//
//          r[decodeURIComponent(s2[0]).toLowerCase()] = decodeURIComponent(s2[1]);
//      }
//      return r;
//   };
//
// var QueryString = getRequests();
//
// // s1=["rent=1000", "sq-feet=800", "beds=1", "baths=1", "street=bellevue+way", "zip=98004"]
//
//
// var sqFeet = QueryString["sq-feet"];
// var beds = QueryString["beds"];
// var baths = QueryString["baths"];
// var street = QueryString["street"];
// var zip1 = QueryString["zip"];
//
// console.log(QueryString["rent"]);
// console.log(QueryString["rent"]);
// console.log(QueryString["rent"]);
// console.log(QueryString["rent"]);
// console.log(QueryString["rent"]);
