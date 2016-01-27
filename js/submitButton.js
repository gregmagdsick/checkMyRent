var getRentForm = document.getElementById('propertyDetails');
getRentForm.addEventListener('submit', handleFormSubmit);

var counter = 0;

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
      var street = document.getElementById('street').value;
      var zip = document.getElementById('zip').value;

      var objProperty = new Property(type, rent, sqFeet, beds, baths, street, zip);
      addPropertyToStorage(objProperty,counter);
      counter++;
    }

    //ensures the counter is incremented and added to local storage
    function addPropertyToStorage(objProperty, counter) {

      if(localStorage.getItem(counter)) {
        var storedCounter =JSON.parse(localStorage.getItem('counter'));
        counter++;
        localStorage.setItem('counter', JSON.stringify(counter));
      } else {
        localStorage.setItem('counter', JSON.stringify(counter));
      }
    localStorage.setItem('property'+counter, JSON.stringify(objProperty));
    }

    //experimenting with retrieving data from local storage
    // function getStorage(){
    //
    //  var x = localStorage.getItem('property0');
    //  console.log("we got an x: ", x);
    //  var y = JSON.parse(x);
    //  console.log("we got and y: ", y);
    //  console.log("retn is : ", y["rent"])    ;
    // };
    //
    // var buttonToClick = document.getElementById('retrieveStorage');
    // buttonToClick.addEventListener('click',getStorage);

    //form input validation

    function checkFormInput(getRentForm) {
      var rent = document.getElementById('monthlyRent');
      var sqFeet = document.getElementById('sq-feet');
      var beds = document.getElementById('beds');
      var baths = document.getElementById('baths');

      if(isNaN(rent.value)) {
          alert('Please input a numerical value for the monthly rent');
          rent.focus();
          return false;
      }
      if(isNaN(sqFeet.value)) {
          alert('Please input a numerical value for the Sq feet');
          sqFeet.focus();
          return false;
      }
      if(isNaN(beds.value )) {
          alert('Please input a numerical value for Beds');
          beds.focus();
          return false;
      }
      if(isNaN(baths.value)) {
          alert('Please input a numerical value for Baths');
          baths.focus();
          return false;
      }
          return true;
    }

    //address should contain only alphanumeric characters, used regular expression  http://www.the-art-of-web.com/javascript/validate/
      function checkAddressInput(getRentForm) {
        var address = document.getElementById('street');
        if (address.value == "" || address.value == "Street address") {
            alert('address cannot be empty!');
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

    // zip code validation http://stackoverflow.com/questions/160550/zip-code-us-postal-code-validation
    function checkZipCode(getRentForm) {
     var zipCode = document.getElementById('zip');
      if (zipCode.value == "" || zipCode.value == "ZIP") {
          alert('Zip cannot be empty!');
          zipCode.focus();
          return false;
      }
      var zipValidation = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

      if(!zipValidation.test(zipCode.value)) {
        alert('error: invalid zip code');
        zipCode.focus();
        return false;
      }
        return true;
    }
