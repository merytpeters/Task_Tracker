# Task Tracker App

This is a basic task tracker application built with Node.js and React. It includes user authentication for signup and login functionality.

## Features

- User authentication (signup/login)
- Create, update, and delete tasks
- View a list of tasks
- Responsive user interface

## Technologies Used

- **Frontend**: React, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT), bcrypt

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/Task_Tracker.git
    cd Task_Tracker
    ```

2. Install dependencies for both the client and server:
    ```bash
    cd client
    npm install
    cd ../server
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the `server` directory.
    - Add the following variables:
      ```
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret
      ```
    - To get your JWT_SECRET run 
      ```bash
      node secretkey.js
      ```

4. Start the development servers:
    ```bash
    # In one terminal, start the backend server
    cd server
    node server.js

    # In another terminal, start the frontend
    cd client
    npm start
    ```

5. Open the app in your browser at `http://localhost:3000`.

## Usage

1. Sign up for a new account or log in with an existing account.
2. Create tasks and manage them through the user-friendly interface.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.