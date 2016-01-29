# checkMyRent
Final Project for CodeFellows 201d5

* Zillow api summary:<br>

* Zillow's api is fairly simple in concept--you ping a url with information encoded in it to describe the information you want from Zillow, and it sends back a response that has the data in it. The base url that you might by pinging looks something like this:<br>

* http://www.zillow.com/webservice/GetSearchResults.htm<br>

Which is just the front door for Zillow's service 'GetSearchResults.' This basically just lets you search Zillow for a home. Next, also included in the url is something called a zws-id, which is just a long string that Zillow uses to identify individual users--it's like your login information. After that, you encode
the address of the property you want to search for and it's city, state, and zipcode, and like that, if you go to that address, you'll receive the data that Zillow has on that address.

* A finished url looks like:<br>

* http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=<my-id>&address=309-NW-Richmond-Beach-Rd&citystatezip=shoreline-washington-98177&rentzestimate=true<br>

* If you were to open up that url, and put your zws-id in, you would get information back about that house from Zillow's database.

In application, this concept become more complicated. For one thing, zillow's API only supports xml as a data format, so all server responses we get back from zillow will be in xml. I found code online to translate xml into JSON, which we are familiar with.

The largest technical obstacle related to using the Zillow api though forces us into a discussion of CORS--cross origin resource sharing. The cross origin part means that we're talking about websites at different domain names, and the resource sharing means that they are exchanging information. So, when I ping Zillow from my website to get the search results back on some address, I am making a CORS request.
However, CORS raises important security concerns. Imagine I went to nastywebsite.com while I was logged into my facebook. If there were no security protocols in place, nastywebsite might be able to ask facebook for my login information or post things under my name. As a result, all CORS requests must be given explicit permission to proceed, using something called an ACCESS-CONTROL-ALLOW-ORIGIN header. When I ping a website, it has to have this header on the information it returns, otherwise I'm not allowed to use the information. In our example, because facebook doesn't have this header allowing nastywebsite, nastywebsite can't use the data it requests.

Zillow's api is made complicated by this because it doesn't support a javascript interface--that is, you can't tell zillow to put this header on it's information. That means we can't see what zillow sends us! We tried a number of different workarounds for this, but ended up just using another api to ping zillow for us and then return the data with the appropriate header. All we have to do is prepend 'http://crossorigin.me/' to our url and everything works just fine.

Finally, we need to talk about AJAX calls, which are how we are actually pinging the url in the first place. AJAX stands for Asynchronous Javascript and XML. The complication with pinging one of these websites it that it takes time for them to process your search and return the data to you. That's where the whole 'Asynchronous' part comes from. The ajax call we are using to talk with zillow looks like this:

$.ajax({
  type: 'GET',
  url: url,
  dataType: 'xml',
  success: function (xml){
    console.log(xml);
    var returnedJson = xmlToJson(xml);
    console.log(returnedJson);
    callbackFunction(returnedJson);
  },
  error: function(){
    console.log('error');
  }
});

Basically, you tell it what type of request you are making, the url, what kind of data you are expecting back, and then a function to execute on success and one to execute on failure. The request we are making here is 'GET', which means we just want information back from the database, not anything more complicated like changing entries in the database, deleting entries, etc. In the above code, I am logging the xml I get back to the console as well as the JSON I get back from the server as a sanity check.

Lastly, there's something called 'callbackFunction' in the code above, which is just some function I want to run on the JSON object I got. In our case, this function pulls the latitude, longitude and Zillow's rent Zestimate for that property.
