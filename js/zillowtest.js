var callZillowButton = document.getElementById('callZillowButton');


callZillowButton.addEventListener('click', function(){
  makeZillowAjaxCall();
});

function makeZillowAjaxCall(){
  var url = 'http://cors.io/?u=http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz19vtt4r677v_3v2ae&address=1551-NW-195th-St&citystatezip=shoreline-washington-98177&rentzestimate=true';
  var encodedurl = encodeURIComponent(url);

  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'xml',
    success: function (xml){
      console.log(xml);
    },
    error: function(){
      console.log('error');
    }
});
}

// function makeZillowAjaxCall(){
//   console.log('button linked to makeZillowAjaxCall');
//   $.ajax({
//     url: 'http://www.zillow.com/webservice/GetSearchResults.htm',
//     xhrfields: {
//       'withCredentials': true,
//
//     },
//     method: 'GET',
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Credentials': true,
//       'zws-id': 'X1-ZWz19vtt4r677v_3v2ae',
//       'address': '1551-NW-195th-St',
//       'citystatezip': 'shoreline-washington-98177',
//       'rentzestimate': true
//     },
//     success: function(){
//       console.log('success');
//     },
//     error: function(){
//       console.log('error');
//     }
//   })
//   console.log('ajax call finished');
// }

// example zillow url call that works in postman:
// http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz19vtt4r677v_3v2ae&address=1551-NW-195th-St&citystatezip=shoreline-washington-98177&rentzestimate=true


// Sam's example code

// var pics = [];
//
// $.ajax({
//   url: 'https://api.imgur.com/3/album/BeiVs.json',
//   method: 'GET',
//   headers: {
//     'Authorization': 'Client-ID 9a3c388c7b28313'
//   }
// })
// .done(function(res) {
//   pics = res.data.images;
//   console.log(pics);
//
//   for (var i = 0; i < pics.length; i++) {
//     photoArray[i].path = pics[i].link;
//   }
//
//   showFromImgur();
// })
// .fail(function(err) {
//   console.log(err);
// });
//
// function showFromImgur() {
//   var rand = Math.floor(Math.random() * pics.length + 1);
//   var displayPic = '<img src="' + pics[rand].link + '">';
//   $('#picContainer').html(displayPic);
// }
//
// $('#another').click(function() {
//   showFromImgur();
//   console.log('I am sorry for being mean to Benton');
// });
