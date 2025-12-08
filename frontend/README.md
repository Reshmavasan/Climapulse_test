# Climapulse Frontend Assessment

A React-based web application built as part of the Climapulse assessment.  
The project includes a mock API powered by **json-server** and a frontend built with **Create React App**.

---

## Prerequisites

Make sure the following are installed on your system:

- **Node.js** (recommended: `20.5.1`)
- **npm** (recommended: `9.8.0`)

These are required to run both the React application and the mock API.

---

## GitHub Repository

Clone the project from: https://github.com/Reshmavasan/Climapulse_test.git

# Setup mock API

It is located in the `/api` folder. To start the API, go to api folder and run:

```bash
npm install
npm run dev
```

Once running, the API will be available at http://localhost:3000/users and can test it using

```bash
curl http://localhost:3000/users
```

# Frontend Setup

The react application is located in the `/frontend` folder. To start the the react application, go to frontend folder and run:

```bash
npm install
npm start
```

It runs on http://localhost:5000

# Build Setup

To make production build run:

```bash
npm run build
```

To start production build you need to install *serve* and run it:

```bash
npm install serve
serve -s build
```

# The following features have been included in this React web application

web application implementation task with 2 pages: "List Users Page" and "User Detail Page".

"List Users Page" has following implementation:
- List the users by fetching from db.json as per the design.
- Serach the users based on name.
- Filter the users based on Type, State and Company(on click of corresponding arrow button).
- Create new user with default values which gets appended at the end of the list.
- Pagination to view the users list in different pages.
- On click of any user and also on click of arrow at the end of each user row, navigate to "User Detail Page".

"User Detail Page" has following implementation:
- Display details of particular user based on the design given.
- On click of "Delete user" button, delete the particular user from the list and navigate to "List Users Page".
- On click of "Edit" button, display modal window to edit the details of the user. I have made few design changes from the given design to make it more user friendly.


Also in the Navigation bar on top, I have added Home tab to navigate to "List Users Page". On click of Archive and Messages tab, it displays Page not available pop up and returns to Home tab.
