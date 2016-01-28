Saturday, 01/23/16
* Took an online CSS flexbox layout crash-course with TeamTreehouse<br>
* Page one - form input - first draft with html and responsive css<br>
* Included a normalize.css file from Skeleton (see below diff between normalize.css and reset.css<br>  *http://stackoverflow.com/questions/6887336/what-is-the-difference-between-normalize-css-and-reset-css)<br>
* Discuss the favicon icon with the team<br>

01/25/16
* index.html - page 1 radio buttons - add js functions to uncheck one button when the other is checked<br>
* integrated form https://w3layouts.com/elegant-login-register-forms-template/<br>
* form is responsive. Logo is centered for screens smaller than 1024px and aligned to left for bigger screens<br>
* form icon house from https://www.iconfinder.com/icons/36507/green_home_house_icon#size=128<br>
* get variables from the input form and store them in variables. Used source code from<br> * *http://stackoverflow.com/questions/831030/how-to-get-get-request-parameters-in-javascript<br>
*found an interesting tutorial on making HTTP requests with js http://www.kirupa.com/html5/making_http_requests_js.htm<br>



* Notes regarding css and structure for page1 and the input form:<br>
* flexbox used throughout the page<br>
* Included a normalize.css file from Skeleton<br>
* The submit button wires up to results.html<br>
* fav-icon placeholder included - to decide on the icon<br>
* section "header-container" is a placeholder for the logo<br>
* empty h1 tag inside the "login-head" if we want to add some text, otherwise will take it out<br>
* same as above for terms and conditions checkbox before submit button<br>
* nav bar at the bottom of the page only for the layout purposes - Greg is working on this issue<br>

01/26/16
* input validation for address implemented<br>
* property type adds to local storage<br>

01/28/16
* on my own today<br>
* added the style for index.html, deleted the css for the older template form<br>
* moved history.js and history.css to their respective folders<br>
* added fav icon to all html pages<br>
* it looks like there are a couple of bugs in the submitButton.js file on the data retrieved from local storage and used by the google maps.<br>
* I will make a list of address which check out with both zillow and google maps and we'll roll with those for the presentation<br>
* I have commented out line 133 in submitButton.js it was returning error 'cannot read property of undefined'<br>
* property addresses to use for the presentation (I have checked for which which ones zillow has a zestimate - as zestimate is not available for some, it will appear that the zestimate is 0!!!)<br>
  * - 1437 Bellevue Way NE WA 98004<br>
  * - 3419 W Ames Lake Dr NE, Redmond, WA 98053 3 beds 2 baths 1,620 sqft Rent Zestimate 2,495<br>
  * - 3604 SW Graham St. Seattle, WA 98126 gets a zestimate of $2495 - WORKING!!!<br>
