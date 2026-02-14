# Expense Tracker Web App (MERN Stack)

A full-stack expense tracking and budgeting web application built using the MERN stack (MongoDB, Express, React, Node.js). The application enables users to manage personal finances in real time with category-based tracking and interactive data visualization.

---

## Tech Stack

**Frontend**
- React
- Recharts (for data visualization)
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

---

## Features

- Add, update, and delete expense entries (full CRUD functionality)
- Category-based expense tracking
- Real-time updates using RESTful APIs
- Persistent storage with MongoDB Atlas
- Pie chart visualization of category-wise spending
- Responsive React-based UI

---

## Architecture Overview

- The backend exposes REST APIs for managing expense data.
- The frontend communicates with the backend using HTTP requests.
- MongoDB Atlas is used for cloud-based data storage.
- Data visualization is implemented using Recharts.

---

## Project Structure

```
expense-tracker/
├── client/   # React frontend
├── server/   # Express backend
└── .gitignore
```

---

##  Setup Instructions

### 1.Clone the repository

```
git clone <your-repo-link>
cd expense-tracker
```

---

### 2️. Backend Setup

```
cd server
npm install
```

Create a `.env` file inside `server/`:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start backend:

```
node index.js
```

---

### 3️. Frontend Setup

In a new terminal:

```
cd client
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

Backend runs at:

```
http://localhost:5000
```

---

## Visualization

The application includes a dynamic pie chart that visualizes category-wise spending, helping users understand financial patterns at a glance.

---

## Note

MongoDB credentials are managed through environment variables and are not included in this repository.
Developed: June 2025
