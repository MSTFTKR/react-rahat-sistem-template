# React Template For Rahat Apps

By running a single command, you will get a production-ready React app installed and fully configured on your machine.
Acting in accordance with the templates is important for code understandability, cleanliness and integrity.
Please do not go beyond these structures except in extreme cases.

## Quick Start

To create a project, simply run:

```bash
npx create-rahat-sistem-react-template <project-name>
```

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone --depth 1 https://github.com/MSTFTKR/react-rahat-sistem-template.git
```

Install the dependencies:

```bash
npm install
```

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm run start
```

## Project Structure

```
src\
 |--api\            # Folder containing the necessary requests for the backend
 |--components\     # Directory containing application parts that need to be used more than once
 |--pages\          # Page Configuration
 |--utils\          # Function parts
 |--app.js          # Express app
```

## Documentation

Redirects for the admin page must start with the /admin extension.

The token field in /api/auth/login is set to user by default. If the role is changed to a token with admin ("role":"admin"), it will redirect to the admin page when pressing login.

Do not forget to convert the .env.example file to .env.
