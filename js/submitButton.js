var getRentForm = document.getElementById('propertyDetails');
getRentForm.addEventListener('submit', handleFormSubmit);

var counter = 0;

function Property(rent, sqFeet, beds, baths, street, zip) {
    this.rent = rent;
    this.sqFeet = sqFeet;
    this.beds = beds;
    this.baths = baths;
    this.street = street;
    this.zip = zip;
}

function handleFormSubmit(e) {
  e.preventDefault();
  var rent = document.getElementById('monthlyRent').value;
  var sqFeet = document.getElementById('sq-feet').value;
  var beds = document.getElementById('beds').value;
  var baths = document.getElementById('baths').value;
  var street = document.getElementById('street').value;
  var zip = document.getElementById('zip').value;

  var objProperty = new Property(rent, sqFeet, beds, baths, street, zip);
  addPropertyToStorage(objProperty,counter);
  counter++;
}

function addPropertyToStorage(objProperty, counter) {
localStorage.setItem('property'+counter, JSON.stringify(objProperty));
localStorage.setItem('counter', JSON.stringify(counter));
}

//form input validation
//address should contain only alphanumeric characters, used regular expression  http://www.the-art-of-web.com/javascript/validate/

function checkFormInput(getRentForm) {
  var address = document.getElementById('street').value;
  if (address == "" || address == "Street address" ) {
      alert('field cannot be empty!');
      address.focus();
      return false;
  }
  //regular expression to match only alphanumeric characters and spaces
  var addressValidation = /^[\w ]+$/;

  if(!addressValidation.test(address)) {
      alert('error: the address includes invalid characters');
      address.focus()
      return false;
  }

  return true;
}
