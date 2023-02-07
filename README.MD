# **WIKIRACER**
<br/>

## ABOUT PROJECT
___
In this project the user needs to give 2 wikepedia links i.e. start link and an end link and the user will recieve the complete path that is the pages the user has to traverse to reach the end link. It will also show the response time in minutes.

<br/>

## NODE VERSION
---
v18.13.0

<br/>

## NPM VERSION
---
8.19.3

<br/>

## REQUIREMENTS
---
<br/>
<ul>

<li>"request-promise": "^4.2.6"</li>
<li>"request": "^2.88.2"</li>
<li>"nodemon": "^2.0.20"</li>
<li>"express": "^4.18.2"</li>
<li>"dotenv": "^16.0.3"</li>
<li>"cors": "^2.8.5"</li>
<li>"cheerio": "^1.0.0-rc.12"</li>
</ul>
<br/>
<br/>

## STARTING THE SERVER
---
Open the command promt in the folder and type the command

```
npm start 
```
Then press Enter the server will start
<br/>
<br/>
<br/>

## RUNNING APPLICATION
---
After starting the server , open the browser and enter 
```
http://localhost:2001/api/ladder
```
The HTML page will pop up.

<br/>
<br/>
<br/>

## COMPONENTS
---
The ```Component``` folder has 2 sub-folders:

<br/>
<ul>
<li> Classes </li>
<p> This folder stores all the class components that were created . This project has only one class.</p>
    <ul>
<br/>
        <li> p_queue.js </li>
        <p>This class constains the code of implementation of priority queue data structure</p> 
    </ul> 

<br/>
<br/>

<li> Functions </li>
<p> This folder stores all the functional components that were created . This project has 5 functions.</p>

<ul>
        <br/>
        <li> get_links.js </li>
        <p>This file uses the request-promise module and the cheerio module for getting the html of web page and for scraping links from the wikipedia page . </p>
        <br/> 
        <li> heuristic.js </li>
        <p>This file uses the get_links.js  to get the links on wikipedia page and then counts the number of links which are present on the current wikipedia page and the page having end link and return the value of this heuristic . </p> 
        <br/> 
        <li> a_star.js </li>
        <p>This file contains the implementation of A* algorithm for reaching the end link . It uses get_links.js and heuristic.js and priority queue from p_queue.js file and then uses the heuristic for implementing the A* search algorithm. </p> 
        <br/> 
        <li> get_ladder.js </li>
        <p> This file calls to the a_star.js which returns the list of links and then it calculates the time required for the complete thing and returns both as the response .</p> 
        <br/> 
        <li> serve_page.js </li>
        <p> This file just redirects the response to the HTML page when the GET request is made . </p> 
    </ul>

</ul>
