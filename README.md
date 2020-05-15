# Twitter Lite 
*Built in collaboration with [Emily Burnham](/#)*

This application is a 'lite' version of [Twitter](https://twitter.com/). 

The app consists of: 
1. Express backend using RESTful APIs 
2. Postgres SQL database
3. Vanilla JS front end rendered with Pug templating engine 

## Backend Summary 
The backend of Twitter Lite was built with the Express framework of NodeJS. 

THe backend of Twitter Lite was built with the following technologies: 
* **Sequelize**: ORM to manipulate Postgres SQL database using the NodeJS server 
* **JSON Web Token**: To permit persistent login, we implemented a JSON web token (JWT), which we put in the browser's localStorage. 
* **Bcrypt**: To handle user identity security, we hashed user passwords with the [blowfish](https://en.wikipedia.org/wiki/Blowfish_(cipher)) hashing cipher via the NodeJS bcrypt library. 
* **CORS**: To handle cross-origin resource sharing (CORS) between the front and backend servers, we implemented the CORS NodeJS package. 

## Frontend Summary 
The front end of Twitter Lite was also built with a separate Express installation on a different server. 

The frontend of Twitter Lite was built using the following technologies: 
* **Pug**: Pug templating engine was used to render all the views on the frontend server. 
* **Bootstrap**: The Bootstrap CSS framework was used to quickly spin up a presentable UI. 
* **Vanilla JS**: Vanilla Javascript was used for all interactivity and server requests. As the app only consists of fairly simple CRUD operations, we decided that Vanilla JS provided enough functionality for our purposes here.  

## Reflections 
The Twitter Lite app is the first full-stack app that I have made with full CRUD capabilities and user-auth. It was certainly a challenging project, with the user-auth functionality presenting itself as the most challenging aspect.

But, after lots of trial and error, console.logs, and Postman pain, we got ourselves a functional CRUD application. All those challenges were equal part learning opportunity, and we came out of the project with a whole lot more knowledge and ability. Until the next README ✌🏾 