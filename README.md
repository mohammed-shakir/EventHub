# EventHub

EventHub is a full-stack web application for creating, managing, and participating in community events

## Prerequisites

- Node.js: Version 16.14.2
- npm: Version 8.5.0
- PostgreSQL: 16.0

## Installation

Install Dependencies:

Navigate to each of the project's directories (backend, frontend, and the root directory) and run the following command to install the necessary dependencies:

```
npm install
```

This command should be executed in each of these directories:

- /EventHub/backend
- /EventHub/frontend
- /EventHub

## Database Setup and Configuration

EventHub uses PostgreSQL as its database. To get the database up and running on your local machine, follow these steps:

- Install PostgreSQL: Follow the installation instructions on the PostgreSQL website for your operating system.
- Open pgAdmin: Launch pgAdmin from your applications.
- Create a New Server:
  - Right-click on 'Servers' in the left pane and select 'Create' -> 'Server'.
  - In the 'Create Server' dialog, enter the name 'EventHubDB' for the server.
  - Switch to the 'Connection' tab and enter localhost in the 'Hostname/address' field.
  - Enter the default PostgreSQL port 5432.
  - Enter your PostgreSQL 'username' and 'password' and save.
- Create a New Database:
  - Right-click on 'Databases' under your new server, then choose 'Create' -> 'Database'.
  - Name your database 'EventHubDB' and save.
- Create the Tables for the Database:
  - Right-click on your newly created database and press on 'Query Tool'.
  - In the query tool, create the necessary tables.

## Running the Application

After installing the dependencies, you can start the application with the following command executed in the root directory:

```
npm start
```

This command starts both the backend and frontend servers concurrently. By default, the frontend is accessible at http://localhost:3000, and the backend runs on http://localhost:5000.

## Additional Information

Ensure any necessary environment variables are set as required by the application.

## Members

- **André Roaas**
  - Email: `androa-0@student.ltu.se`
- **Mohammed Shakir**
  - Email: `mohammedshakir010528@gmail.com`
