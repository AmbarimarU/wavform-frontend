# React Skeleton

This is a skeleton for a frontend web application using React. It is intended to be used as a starting point for new projects. It is not intended to be a production-ready application.

## Using the Skeleton

1. Fork the repository on GitHub.

1. Clone the repository to your local machine.
    ```bash
    git clone <repository-url> <directory-name>
    # Example: git clone https://github.com/9-5-pursuit/react-skeleton my-app-frontend
    ```

1. Change into the directory.

    ```bash
    cd <directory-name>
    # Example: cd my-app-frontend
    ```

1. Setup a new remote repository on Github so that you don't overwrite the skeleton repository.

1. Link your local repository to your new remote repository.

    ```bash
    git remote set-url origin <new-repository-url>
    ```

1. Make a small change, then create a new commit to test the remote repository.

    ```bash
    git add .
    git commit -m "Update remote repository"
    git push
    ```

## React Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/) - JavaScript runtime
- [npm](https://www.npmjs.com/) - Package manager

### Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

> Note: You should have the backend development server running before starting the frontend development server. Each server should be running simultaneously in separate terminal windows. This can be a lot to keep track of at first, so take your time when making changes to the repository.

### Built With

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [react-router-dom](https://reactrouter.com/web/guides/quick-start) - Routing
- [axios](https://www.npmjs.com/package/axios) - HTTP client
- [sass](https://www.npmjs.com/package/sass) - CSS extension language
- [tone.js](https://www.npmjs.com/package/tone) - Web Audio framework for creating interactive music in the browser
- [react-icons](https://www.npmjs.com/package/react-icons) - A comprehensive library of popluar icons
- [react-burger-menu](https://www.npmjs.com/package/react-burger-menu) - A flexible and customizible component that can create various sidebar menu.
- [react-avatar](https://www.npmjs.com/package/react-avatar) - Display a user profile in square or circular picture
- [styled-components](https://www.npmjs.com/package/styled-components) - 
A library that allows to write CSS in JavaScript 
- [validator](https://www.npmjs.com/package/validator) - 
A library makes data validation authenticate the user.
- [jwt-decode](https://www.npmjs.com/package/jwt-decode) - A JavaScript library that is used to decode JSON Web Tokens.


### Additional Notes

Since this is a skeleton, the `.env` file is included in the repository. This is not recommended for production applications. The `.env` file should be added to the `.gitignore` file and the environment variables should be set in the production environment.


### Frontend Page

https://wavform.netlify.app/
