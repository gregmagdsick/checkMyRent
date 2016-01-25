function getInputForm() {
 var s1 = location.search.substring(1, location.search.length).split('&'),
     r = {}, s2, i;
 for (var i = 0; i < s1.length; i++) {
     s2 = s1[i].split('=');
     r[decodeURIComponent(s2[0]).toLowerCase()] = decodeURIComponent(s2[1]);
 }
 return r;
}

var QueryString = getInputForm();

var typeResidence = QueryString['residenceType'];
var monthlyRent = QueryString['rent'];
console.log(rent);
