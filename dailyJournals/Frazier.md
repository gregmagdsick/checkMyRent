Zillow api summary:

Zillow's api is fairly simple in concept--you ping a url with information encoded in it to describe the information you want from Zillow, and it sends back a response that has the data in it. The base url that you might by pinging looks something like this:

http://www.zillow.com/webservice/GetSearchResults.htm

Which is just the front door for Zillow's service 'GetSearchResults.' This basically just lets you search Zillow for a home. Next, also included in the url is something called a zws-id, which is just a long string that Zillow uses to identify individual users--it's like your login information. After that, you encode the address of the property you want to search for and it's city, state, and zipcode, and like that, if you go to that address, you'll receive the data that Zillow has on that address.

A finished url looks like:

http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=<my-id>&address=309-NW-Richmond-Beach-Rd&citystatezip=shoreline-washington-98177&rentzestimate=true

If you were to open up that url, and put your zws-id in, you would get information back about that house from Zillow's database.

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















I found a chrome tool called postman to handle api queries for me
https://www.getpostman.com/

If I type in a url to ping zillow with the address of an apartment that shows up as being for rent on zillow:
http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz19vtt4r677v_3v2ae&address=309-NW-Richmond-Beach-Rd&citystatezip=shoreline-washington-98177&rentzestimate=true
I get back XML-getSearchResults and getZestimate do not support JSON as a return type.



<?xml version="1.0" encoding="utf-8"?>
<SearchResults:searchresults xsi:schemaLocation="http://www.zillow.com/static/xsd/SearchResults.xsd http://www.zillowstatic.com/vstatic/272e7d3/static/xsd/SearchResults.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:SearchResults="http://www.zillow.com/static/xsd/SearchResults.xsd">
    <request>
        <address>309-NW-Richmond-Beach-Rd</address>
        <citystatezip>shoreline-washington-98177</citystatezip>
    </request>
    <message>
        <text>Request successfully processed</text>
        <code>0</code>
    </message>
    <response>
        <results>
            <result>
                <zpid>2103306910</zpid>
                <links>
                    <homedetails>http://www.zillow.com/homedetails/309-NW-Richmond-Beach-Rd-Shoreline-WA-98177/2103306910_zpid/</homedetails>
                    <mapthishome>http://www.zillow.com/homes/2103306910_zpid/</mapthishome>
                    <comparables>http://www.zillow.com/homes/comps/2103306910_zpid/</comparables>
                </links>
                <address>
                    <street>309 NW Richmond Beach Rd</street>
                    <zipcode>98177</zipcode>
                    <city>Shoreline</city>
                    <state>WA</state>
                    <latitude>47.765</latitude>
                    <longitude>-122.361</longitude>
                </address>
                <zestimate>
                    <amount currency="USD"></amount>
                    <last-updated>12/31/1969</last-updated>
                    <oneWeekChange deprecated="true"></oneWeekChange>
                    <valueChange></valueChange>
                    <valuationRange>
                        <low currency="USD"></low>
                        <high currency="USD"></high>
                    </valuationRange>
                    <percentile>0</percentile>
                </zestimate>
                <rentzestimate>
                    <amount currency="USD">1237</amount>
                    <last-updated>01/23/2016</last-updated>
                    <oneWeekChange deprecated="true"></oneWeekChange>
                    <valueChange></valueChange>
                    <valuationRange>
                        <low currency="USD">1027</low>
                        <high currency="USD">1583</high>
                    </valuationRange>
                </rentzestimate>
                <localRealEstate>
                    <region name="Shoreline" id="54409" type="city">
                        <zindexValue>327,000</zindexValue>
                        <links>
                            <overview>http://www.zillow.com/local-info/WA-Shoreline/r_54409/</overview>
                            <forSaleByOwner>http://www.zillow.com/shoreline-wa/fsbo/</forSaleByOwner>
                            <forSale>http://www.zillow.com/shoreline-wa/</forSale>
                        </links>
                    </region>
                </localRealEstate>
            </result>
        </results>
    </response>
</SearchResults:searchresults>
<!-- H:001  T:32ms  S:1120  R:Sun Jan 24 11:01:03 PST 2016  B:4.0.24011-master.3899d78~hotfix_pre.939be9d -->



This seems to have the full results set of getZestimate contained in it, which is confirmed if we look at the documentation:  http://www.zillow.com/howto/api/GetSearchResults.htm , http://www.zillow.com/howto/api/GetZestimate.htm



The only way to return comparable properties is with getComps or getDeepComps, which contains more data. I will use getDeepComps to show the full results set.
 http://www.zillow.com/webservice/GetDeepComps.htm?zws-id=X1-ZWz19vtt4r677v_3v2ae&zpid=2103306910&count=3&rentzestimate=true


<?xml version="1.0" encoding="utf-8"?>
<Comps:comps xsi:schemaLocation="http://www.zillow.com/static/xsd/Comps.xsd http://www.zillowstatic.com/vstatic/272e7d3/static/xsd/Comps.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:Comps="http://www.zillow.com/static/xsd/Comps.xsd">
    <request>
        <zpid>2103306910</zpid>
        <count>3</count>
    </request>
    <message>
        <text>Error: comps not available for the specified property identifier</text>
        <code>503</code>
    </message>
</Comps:comps>
<!-- H:002  T:5ms  S:130  R:Sun Jan 24 11:06:19 PST 2016  B:4.0.24011-master.3899d78~hotfix_pre.939be9d -->

That was for an apartment for rent.


If I instead use the results for a condo near me that is for sale, everything works just fine.
http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz19vtt4r677v_3v2ae&address=1551-NW-195th-St&citystatezip=shoreline-washington-98177&rentzestimate=true

http://www.zillow.com/webservice/GetDeepComps.htm?zws-id=X1-ZWz19vtt4r677v_3v2ae&zpid=63338170&count=3&rentzestimate=true
