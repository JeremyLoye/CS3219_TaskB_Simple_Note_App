# CS3219_TaskB_Simple_Note_App
#### Task

1. Implement simple JavaScript backend and REST API to GET, POST, PUT, DELETE
2. Write simple test cases for the API and use a Continuous Integration tool to automate testing
3. Use a Continuous Deployment tool for automated deployment to a serverless service
4. Build a frontend SPA using a frontend framework

#### Set-Up Instructions

##### Dependencies:

[nodejs](https://nodejs.org/en/download/)  and npm (installed with NodeJS)

##### Technological Stack:

- **Database**: Mongo DB

- **Backend**: Nodejs and Expressjs; Mochajs for testing
- **Frontend**: Reactjs with Material UI framework
- **Dev Ops**: Travis (CI/CD), Google App Engine (Serverless service)

##### Local Backend set-up

1. Fork and clone this repository onto your local machine.

2. In the root of the cloned repository, run `npm install` to install all required dependencies for the application to run. Since the Application uses an online MongoDb instance, there is no need to run mongo locally.

3. Use the `npm run dev` command to run the backend server with nodemon watching file changes. Your console should display that the server has started on port 3001.

4. Navigate to `localhost:3001` and the text "Backend" should be displayed there. Postman can be used to test the backend API. Below are the list of API endpoints that can be accessed in the backend server:

   - `GET /note/getall` Gets all created notes
   

   - `POST /note/create` Creates a new note


   - `PUT /note/update` Updates the note specified by the note ID with the new data


   - `DELETE /note/delete/:id` Deletes the note corresponding to the ID specified in the request.


##### Testing of Backend Locally

Simple tests have been created for each of the API in the backend service with chai and mocha. The tests run on a mock mongo server through the use of the `mongo-unit` package and will not affect the current data base. The tests can be run by using the command line `npm run test`.

##### Continuous Deployment with Travis

###### Automated Testing

Travis is set up to automatically build and test the application when any commits are pushed onto the repository. To trigger a Travis build, Travis needs to be enabled on the forked Repository on https://travis-ci.org/account/repositories and commits need to be pushed onto the forked repository. 

###### Continuous Deployment on Google App Engine

The current repository has Travis set up to continuously deploy to Google App Engine whenever the Travis build is triggered. 

The endpoints for the backend hosted on Google App Engine can be found on https://cs3219-291409.et.r.appspot.com/ with the same API as in the local backend. To enable continuous deployment to Google App Engine on your own forked Repository, change the project and key file to the name of your own Google Cloud project in the `.travis.yml` file. The key file can be encoded by Travis and the file name in the `before_install` for the encoded file (`.enc`) should be changed to your encoded key file. The targeted branches for Continuous deployment by Travis to Google App Engine can be configured by the `branch` setting.

#####  Local Frontend Set-Up

1. Enter the /web folder from the root project directory by `cd /web` and run `npm install` to install the dependencies required for the frontend. 
2. To run the webapp, run `npm start` and the project will be served on port 3000. Enter the webapp by going to `localhost:3000` on your browser to access the single page note app.
3. The note application allows for the creation of new notes, and the update and delete of current notes. The webapp currently runs using the deployed backend on Google App Engine. To change to your local backend, access the `axiosUrl.js` from `/web/src/utils` and change the `baseURL: serverlessUrl` to `baseURL: localUrl`. 

