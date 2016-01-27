
window.addEventListener('load', function(){
  var counter = Number(localStorage.getItem('counter'));
  var propertyArray = [];
  for (var i = 0; i < counter +1; i++) {
    propertyArray.unshift(JSON.parse(localStorage.getItem('property' + i)));
    //console.log(propertyArray[i]);
  }
  console.log(propertyArray);
  //var firstProperty = JSON.parse(localStorage.getItem('property0'));
  var mainContent = document.getElementById('mainContent');

  for (var i = 0; i < propertyArray.length; i++) {
    var thisHistoryDivEl = document.createElement('div');
    thisHistoryDivEl.className="historyHolderDiv";
    thisHistoryDivEl.innerHTML ='<h5>' + propertyArray[i].street + ' $' + propertyArray[i].rent + '/mo </h5>'
    mainContent.appendChild(thisHistoryDivEl);
  }
  //liEl.innerHTML = firstProperty.street + '     $' + firstProperty.rent + '/mo'

  //console.log("we got an firstProperty: ", firstProperty);
})
