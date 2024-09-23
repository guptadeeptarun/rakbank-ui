## Build the project

The first step is to build the application. Run the below command. Please make sure node is installed on your machine.

- npm install

## Run Tests

Test cases can be executed by running the below command.

- npm test

## Start the project

You can bring up the project by running the command

- npm start

The application will start on port 3003 as defined in package.json start script. You can change the port in case you wish to run the application on some other port.

## Connection with Backend API

By default the backend base URL is set to http://localhost:8080

It's defined in the .env file
REACT_APP_API_BASE_URL=http://localhost:8080

In case your backend is running on a different server or port it can be updated over here.

## Live Demo

For a live demo, you can access it on the below url. Please note in case you are behind a firewall, it may not render. The application is connected to a backend API hosted on the same server.

http://193.123.75.224/

## Notes:

- The centralized store is currenly managing only notifications. The store can be updated to include more actions/reducers as the application grows.
- The notification store actions are defined for Error (plain text), success (plain text), httpError (http error response).
- Application uses react-toastify library to display the notifications.
- Only SIGN UP button is integrated with backend. Rest other buttons like Signup with google etc are only for display purpose.




