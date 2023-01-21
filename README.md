# DiviTrack - Dividend Stock Tracking

This is my capstone project for the Coding Dojo MERN stack. 

After earning a Black Belt on my MERN Stack exam (indicating mastery of both core and advanced concepts, demonstrating the ability to synthesize new concepts under time constraints, as well as deploying the completed exam to an AWS EC2 instance), ninjas are allotted no more than seven days to design, plan, build, publish, and present a full-stack web application to their cohort.

For my third full-stack application, I developed DiviTrack, a dividend stock portfolio tracking application. The application supports multiple users and allows each user to monitor the actual and anticipated dividend payments for the securities in their portfolio.


## 👾 Tech Stack
[![My Skills](https://skillicons.dev/icons?i=mongo,express,react,nodejs,js,html,css,materialui)](https://skillicons.dev)  
The application is built using Node.js, Express.js, and React.js for the front end and middle layers. The backend is a MongoDB document database. The BCrypt library was used to encrypt at rest the passwords for registered users of the application.  

The [finnhub.io](https://finnhub.io/) and [polygon.io](https://polygon.io/) financial APIs have been incorporated into the application to provide stock ticker lookups, organization name, and dividend payment forecasts and history in real-time.

Formatting and styling is accomplished with the [Material UI](https://mui.com/) React UI tools library  

## 🍿 Demo
* The application provides a user registration component, validating an email is not already in use and ensuring password complexity.
* Once signed up or logged in, the users portfolio is displayed.
* Left menu bar navigation is available to switch between the Portfolio view and the Add Symbol workflow.
* During the Add Symbol workflow, the users input is queried against the APIs in real-time to find the closest matching company. Once the correct symbol is identified, the remaining security details can be populated and the symbol added to their portfolio.
* In the portfolio view, the table can be sorted by any column name, navigate forward and back through larger portfolios and the number of rows to display selected.
* There were additional features planned for the MVP that didn't have time to make it in to this iteration.
A demo video of the DiviTrack app is [here.](https://youtu.be/j4fMSsJurRI)  

## 🙏 Gratitude
Tremendous gratitude to [Ruben Ocasio](https://www.linkedin.com/in/rubenocasio/), my instructor for the MERN stack. Our cohort was Ruben's first official cohort at the Dojo and his constant humor and antics, plus his dedication to ensuring that no ninja was left behind, created an amazing learning environment. 

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/brianjlucius)



