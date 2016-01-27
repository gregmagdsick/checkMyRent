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

      if(localStorage.getItem('counter')) {
        var storedCounter =JSON.parse(localStorage.getItem('counter'));
        counter++;
        localStorage.setItem('counter', JSON.stringify(counter));
      } else {
        localStorage.setItem('counter', JSON.stringify(counter));
      }
    localStorage.setItem('property'+counter, JSON.stringify(objProperty));
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
