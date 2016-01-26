function getStorage(){

var x = localStorage.getItem('property0');
console.log("we got an x: ", x);
var y = JSON.parse(x);
console.log("we got and y: ", y);
console.log("retn is : ", y["rent"])    ;
};

var buttonToClick = document.getElementById('retrieveStorage');
buttonToClick.addEventListener('click',getStorage);



render: function() {
    this.generateHistory();

    var ulEl = document.createElement('ul');
    ulEl.appendChild(document.createTextNode(x));
    var sectionEl = document.getElementById('retrieveStorage').appendChild(ulEl);

    // var liEl_two = document.createElement('li');
    // liEl_two.textContent = 'Total: ' + this.dailyCookies;
    // ulEl.appendChild(liEl_two);
  }










var para = document.createElement("p");
var node = document.createTextNode("This is new.");
para.appendChild(node);

var element = document.getElementById("div1");
var child = document.getElementById("p1");
element.insertBefore(para,child);





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
