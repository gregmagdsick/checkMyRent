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
