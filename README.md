# Opportune
Opportune is a search engine for finding software engineering careers from nearly 200 top technology companies such as Airbnb, Pinterest, and Coinbase. 

## Motivation
Finding great opportunities is a very time-consuming process for engineers - it namely involves browsing through LinkedIn, Reddit, AngelList, and Google for hours on end. Some people post huge spreadsheets of companies to apply to, but even then you still have to browse through their career pages to find the specific role you're looking for. Opportune's goal is to curate talented technology companies and make all of their job listings easily accessible and searchable from one place. 

## Description
Opportune works by using the API's provided from the two major applicant tracking system, Lever and Greenhouse, to maintain a database of over 2000+ engineering related job listings. We filter the data, clean it, store it in our database which is updated weekly. Every week, we run a cron job which removes old entries, inserts new entries, and updates existing entries. At this same time, we collect all of the newly added jobs for that week and send out an email to our subscribers list using Mailchimp's API.

We make all of this data fully searchable with a search bar and search filters that allows users to narrow their results based off of experience, location, role, and skill. Users can simplify their search as needed with options such as new graduate / intern roles, frontend / backend specializations, knowing JavaScript / Golang, jobs located in San Francisco / New York, or simply looking for a job in the healthcare industry.

## Screenshots
![Home screen](https://i.imgur.com/pgSlCtG.png)
![Active Search](https://i.imgur.com/aSiyVAM.png)

## Coding standard
We made use of ESLint for linting issues with code and Prettier for consistent styling / formatting. No unit tests exist at this time.

## Technology used

Opportune is built with the following technologies:

* JavaScript (ES6)
* Node.js
* Express
* MongoDB
* React
* Webpack
* Sass
* ESLint / Prettier

## Collaborators 
Michael Chapman - chapmanm305@gmail.com

William Robertson - willpr13@vt.edu
