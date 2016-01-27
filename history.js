
window.addEventListener('load', function(){
  var counter = Number(localStorage.getItem('counter'));
  var propertyArray = [];
  for (var i = 0; i < counter + 1; i++) {
    propertyArray[i] = JSON.parse(localStorage.getItem('property' + i));
    console.log(propertyArray[i]);
  }
  //var firstProperty = JSON.parse(localStorage.getItem('property0'));
  var storage = document.getElementById('propertiesList');

  var ulEl = document.createElement('ul');

for (var i = counter; i > -1; i--) {
  var liEl = document.createElement('li');
  console.log(propertyArray[i])
  liEl.innerHTML = propertyArray[i].street + ' $' + propertyArray[i].rent + '/mo'
  ulEl.appendChild(liEl);
}
  //liEl.innerHTML = firstProperty.street + '     $' + firstProperty.rent + '/mo'
  storage.appendChild(ulEl);

  //console.log("we got an firstProperty: ", firstProperty);
})





// function getStored(){
//     address = localStorage.getItem("propertyDetails");
//     if (address == null || usersMonthlyRent == "null"){
//       localStorage.setItem("propertyDetails", address);
//     } else {
//       var getHistory= JSON.parse(address)}
//   }
//
//
//   var stored = document.getElementById("propertyDetails");

  //  addEventListener("submit", displaypropertyDetails);

// var history = document.getElementById('submit');
//
// history.addEventListiner('click'), function(history){
//   getElementById('userAddress')
//   getElementById('userZip')
//   getElementById('userbeds')
//   getElementById('usersqFeet')
//   getElementById('userbaths')
//   getElementById('usersMonthlyRent')
// };
//
//
//
//
// var address =[];
// var zip = [];
// var sqFeet = [];
// var beds = [];
// var baths = [];
// var monthlyRent = [];
//
//
//
// var addressInput  = document.getElementById("address");
// var zipInput   = document.getElementById("zip");
// var sqFeettInput = document.getElementById("sqFeet");
// var bedsInput  = document.getElementById("beds");
// var bathInput   = document.getElementById("bath");
// var monthlyRentInput = document.getElementById("monthlyRent");
//
//
// var messageBox  = document.getElementById("display");
//
// function insert ( ) {
//  address.push( addressInput.value );
//  zip.push( zipInput.value );
//  sqFeet.push( sqFeet.value );
//  beds.push( bedsInput.value );
//  bath.push( bathInput.value );
//  monthlyRent.push( monthlyRent.value );
//
//  clearAndShow();
// }

// function clearAndShow () {
//   // Clear our fields
//   addressInput.value = "";
//   zipInput.value = "";
//   sqFeetInput.value = "";
//   bedsInput.value = "";
//   bathInput.value = "";
//   monthlyRentInput.value = "";

  // Shows output
//   messageBox.innerHTML = "";
//
//   messageBox.innerHTML += "address: " + address.join(", ") + "<br/>";
//   messageBox.innerHTML += "zip: " + zip.join(", ") + "<br/>";
//   messageBox.innerHTML += "sqFeet: " + sqFeet.join(", ");
//   messageBox.innerHTML += "beds: " + beds.join(", ") + "<br/>";
//   messageBox.innerHTML += "bath: " + bath.join(", ") + "<br/>";
//   messageBox.innerHTML += "monthlyRent: " + monthlyRent.join(", ");
// }
