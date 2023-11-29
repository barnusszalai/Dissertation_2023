Barnabas Szalai 6CCS3PRJ Final Project

Invitely

This folder contains all parts of the software system, except the source code of the cloud software (AWS).

The three sub-folders contain the source code for the three different parts of the application.

1. Deployed-Django

The Django project, which contains the algorithm for the meeting scheduler is hosted on Heroku:
https://prj-backend.herokuapp.com/

As it is only an API, there will be nothing shown on the front-end of the url.

The other parts of the application are connected to it; therefore, it is not required to start this project.

However, the rest of the components are not deployed; therefore, I provided the instructions to use them below:

Web Demo:

- Make sure that you have NPM on your computer
- Install the required dependencies (npm install)
- Start the server (npm start)
- It should automatically create a localhost on localhost:3000

Meeting Scheduler:

- Either download a simulator on your computer, or download the Expo Go application from the App Store or Google Play
- Install the required dependencies (npm install)
- Start the server (npm start)
- Open the app with the simulator, or scan the QR code with the Expo Go App

Amplify:

- Run 'amplify mock function testBackend' to generate the schedules
- Once the app gets deployed, this function will be automatically called every day to generate the schedules
