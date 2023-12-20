# SyndiPay
Simplifying syndicate payment management for housing complexes with a user-friendly web application.

## Project Structure
The project is divided into two main directories:

### client
The `client` directory contains the front-end built with React. The folder structure within the client directory is organized by features, ensuring a clear and scalable architecture.

### server
The `server` directory contains the back-end developed with Express, following Uncle Bob's clean architecture principles. This structure emphasizes separation of concerns, making it easier to maintain and extend the application.

## Getting Started
To run the project locally, follow these steps:

### 1. Clone the repository
Clone the repository to your local machine by running `git clone`.

### 2. Install dependencies
In both the client and server directories, run `npm install` to install dependencies.

### 3. Environment Configuration
In the server directory, make a copy of the `.env.example` file and rename it to `.env`. Fill in the environment variables with the appropriate values.

### 4. Generating Keys
In the server directory, run the following two commands to generate the private and public keys:
```bash
openssl genrsa -out keys/private.pem 2048
```
```bash
openssl rsa -in keys/private.pem -outform PEM -pubout -out keys/public.pem
```


### 5. Running the Application
In the root directory, run `docker-compose up` to start the application. The client will be running on port 3000 and the server will be running on port 5000.

## Functionality

### Syndicate Manager Features
- Apartment Management:
  - Create, modify, and delete apartment details.
- Resident Management:
  - Create, modify, and delete resident details.
  - Assign residents to apartments.
- Monthly Payment Management:
  - Create, modify, and delete monthly payment details.
- Invoice Generation:
  - Generate invoices pdf for each apartment payment.

## Technologies Used
- Front-end:
  - React
  - Redux
  - Material UI
  - ...
- Back-end:
  - Node.js
  - Express.js
  - JWT
  - ...
- Database:
  - MongoDB
  - Mongoose

