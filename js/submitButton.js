var checkRentButton = document.getElementById('checkMyRent');
checkRentButton.addEventListener('submit', handleFormSubmit);

function Property(rent, sqFeet, beds, baths, street, zip) {
    this.rent = rent;
    this.sqFeet = sqFeet;
    this.beds = beds;
    this.baths = baths;
    this.street = street;
    this.zip = zip;
}



function handleFormSubmit() {
  var rent = document.getElementById('monthlyRent').value;
  var sqFeet = document.getElementById('sq-feet').value;
  var beds = document.getElementById('beds').value;
  var baths = document.getElementById('baths').value;
  var street = document.getElementById('street').value;
  var zip = document.getElementById('zip').value;

  var objProperty = new Property(rent, sqFeet, beds, baths, street, zip);

}
