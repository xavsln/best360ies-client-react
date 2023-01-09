# Action items

- [ ] - Untrack changes before adding to GitHub
- [ ] - Add a Favicon in index.html
- [ ] - When ready to deploy, use npm run build (check CF course)
- [ ] - Add a footer (maybe not needed)
- [ ] - Implement the caching functionality
- [ ] - In home / profile and pano-view, if the pano is not a fav already, show the Add to Fav button. If it is already a Fav, show the Remove from Fav button (implement a toggle button)
- [ ] - If the list of panos is > 12 in the profile section, put a link to show on another page or possibility to load more
- [ ] - Sort panos by last added
- [ ] - Search in country and/or areaName
- [ ] - Improve the routing part in main-view (the navbar should not be loaded each time, only when the user logs in)
- [ ] - Display the name of the User who added the Pano and make it possible to display all its Panos if we click on the Username. (use same logic as for the Genre and Director on MyFlix Client)
- [ ] - In addition to the rating in number, implement a star system from npm. Ask Zaheer for recommendation. (Check in Blinkist App)

- [x] - Implement add to fav function
- [x] - Make a search for movie / movies / myFlix before upload to GitHub
- [x] - Replace the myFlix in the title tab
- [x] - 20230102 - Create a Home / Main View that will route to other views (it will also include all the 360ies)
- [x] - 20230102 - Rename the current main-view into add-pano-view and make it accessible via the menu-bar and route of the main-view
- [x] - Solve the issue with the static url creation when pano comes from googleuser (need to extract last part of the 360 url)
- [x] - Update the readme file (mainly the Project main dependencies)
- [x] - Remove userData from browser local storage as well as the console.log in the menu-bar
- [x] - 20230109 - Implement add a Pano that actually upload a new Pano into the DB

# How to run the App - LOCALLY

- Launch the best360ies-api
- run "npm start" in the terminal
- Connect to localhost:1234

# Database access - LOCAL (mongoDB shell with local DB)

UserTest1
12345

UserTest2
12345

# Database access - mongoDB

# Various findings

- Install the version "geojson-places": "^1.0.3", not the latest otherwise it was not working
- Install react-router-dom@5.3.0 version otherwise the synthax will not work (updates breaking the code)

## React - How do you call a function from inside another function

- add a constructor to bind the function to this
- cf explanation on stackoverflow (https://stackoverflow.com/questions/49350217/react-how-do-you-call-a-function-from-inside-another-function)

# Access to the App online:

<!-- https://themyflix.netlify.app/ -->

https://best360ies.netlify.app/

# Various from Dev during CF time (myFlix):

- To ask/highlight to Tutor:
  . [DONE] - Validation of password is not working. It would through an error if password is missing but in case it is below the required number of characters, it will write some characters in the password field...
  . [DONE] - Check how I logout from the menu (I shifted the onLoggedOut function there)
  . [DONE] - Ask about the role of useEffect in profile-view => This will trigger the function

- To ask/highlight to Mentor:
  . [DONE] - Some bugs with the app... it may be due to the fact that we are still using a mix of Redux State (in the Redux store) along with some components states... Sometimes there is no id when I try to access the /profile and therefore nothing would render... => See was due to the fact that the data does not have time to update (kind of a race issue)
  . [DONE] - Not so sure about how we extract the data (user / movies)... maybe we should do that using the Redux store. In this case we may need to update the data in the store and store all the user data (id, token etc...)... or maybe not... maybe we just leave it as it is and use the username from the store and fetch the remianing data using axios...
  . [DONE] - Now an issue with CORS that appeared (blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.)
  . [DONE] - When I remove a movie the component does not update => Because it is not associated to a state. This can be solved by reloading the page.

# Issue with Netlfy - 404 page not found:

. [DONE] - Added a netlify.toml file as per the following video: https://www.youtube.com/watch?v=JCM_xoWbF70

# Other issue to be mentioned to Mentor:

. [DONE] - When displaying the App on a small device the rendered page would be too small (page and navbar). I checked the Bootstrap configuration and it seems ok... I am not clear why this is happening especially as it seems to be working well on a laptop (breakpoints / navbar etc...)... Maybe I am not using the right link in the index.html ? (href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css")
=> Solution is to add the viewport attribute in the meta tage (index.html)
