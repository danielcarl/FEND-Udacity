INSTRUCTIONS
------------

* Open index.html in web browser to view web speed optimizations
* Open /views/pizza.html to view 60 fps optimizations

---------------------------------------------------------------------------
V. 0.5 - Changes recommended by Udacity team reviewer

* Added comments to main.js file (lines 420 - 428; line 461; lines 491 - 493; line 518)

---------------------------------------------------------------------------
V. 0.4 - VERSION SUBMITTED FOR GRADE

* Added instructions to README.md
* Removded the Development and Production folders - original plan was to minify and compress files, but all goals have been met without the need to do so (aside from pizzaria.jpg resize as detailed in the V. 0.1 commit notes)

---------------------------------------------------------------------------
V. 0.3 Optimizing pizza resize function

* Optimized changePizzaSizes function (heavily referenced the Web Optimization lectures for this solution)

---------------------------------------------------------------------------
V. 0.2 Optimizing pizza.html page scrolling

* Fix to updatePositions() method: moved the assignment of (document.body.scrollTop / 1250) outside of the rendering loop, which immediately dropped most fps measurements to within the 60 frame target.
* Added backface-visibility: hidden; to the .mover class eliminated all drops below 60 fps on the pizza.html page
* Reduced the number of moving pizzas from 200 to 50

---------------------------------------------------------------------------
V. 0.1 Optimized index.html

* Added a media query to the print.css link, and made call to analytics.js asyncronous - did not change scores
* Resized pizzeria.jpg to 100px width - major score change (75 mobile, 88 desktop)
* Inlined contents of style.css - minor mobile score change (76 mobile, 88 desktop)
* Replaced Open Sans with Arial - the difference is minor to my non-designer eyes, but the change results in satifactory scores (92 mobile, 93 desktop)

There are still potential improvements here, but the totals already exceed specifications, so time to move on!

* MOBILE SCORE: 92/100
* DESKTOP SCORE: 93/100

---------------------------------------------------------------------------
V. 0.0 INITIAL FORK

* Uploaded files to personal web server instead of using local web server
* Performed initial pagespeed benchmarks (scored without any modifications)

* MOBILE SCORE: 28/100
* DESKTOP: 30/100

---------------------------------------------------------------------------