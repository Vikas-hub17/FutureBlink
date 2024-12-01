# Email Scheduler with Agenda and Nodemailer

This project implements an email scheduling system using **Node.js**, **Express**, **Agenda**, and **Nodemailer**. It allows users to schedule emails to be sent after 1 hour from the requested time. The system also supports interactive frontend functionalities like flowchart creation and workflow simulation.

![Screenshot 2024-12-01 214728](https://github.com/user-attachments/assets/78069c5a-fb20-44d5-b129-03641df7129e)

---

## **Features**

### Backend:
- [x] **[POST] Schedule Email API**
  - Schedules an email to be sent after 1 hour of the provided time.
  - Uses **Agenda** for job scheduling.
  - Sends emails via **Nodemailer**.
- [x] **Agenda Integration**
  - Job scheduler for managing email delivery.
- [x] **Nodemailer Integration**
  - Email delivery service using Gmail SMTP or other providers.

### Frontend:
- [x] **Flowchart Interface**
  - Drag-and-drop interface for designing email workflows.
- [x] **Dark/Light Mode**
  - Switch between dark and light themes dynamically.
- [x] **Export and Import Flowchart**
  - Save and reload flowcharts as JSON files.
- [x] **Simulation**
  - Simulate the execution of workflows step-by-step.

---

## **Tech Stack**

### Backend:
- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for building APIs.
- **MongoDB**: Database for storing jobs and workflow data.
- **Agenda**: Job scheduler for email delivery.
- **Nodemailer**: SMTP service for sending emails.

### Frontend:
- **React**: Frontend library for building the UI.
- **React Flow**: Interactive flowchart library.
- **Styled-components**: Dynamic styling for components.
- **Socket.IO**: Real-time communication.

---

## **Installation**

### Prerequisites
- [Node.js](https://nodejs.org/) installed (v14+ recommended).
- [MongoDB](https://www.mongodb.com/) installed and running.
- Email credentials (e.g., Gmail or any SMTP-compatible service).

### Clone the Repository
```bash
$ git clone https://github.com/Vikas-hub17/FutureBlink.git
$ cd FutureBlink
```

### Environment Variables
Create a `.env` file in the root directory with the following content:
```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/emailScheduler

# SMTP Email Configuration
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-email-password

# Server Port
PORT=5000
```

---

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   $ cd backend
   ```
2. Install dependencies:
   ```bash
   $ npm install
   ```
3. Start the server:
   ```bash
   $ npm start
   ```
   The backend will start on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   $ cd frontend
   ```
2. Install dependencies:
   ```bash
   $ npm install
   ```
3. Start the development server:
   ```bash
   $ npm start
   ```
   The frontend will start on `http://localhost:3000`.

---

## **Usage**

### **Schedule Email API**
Send a POST request to `http://localhost:5000/api/schedule-email` with the following JSON payload:
```json
{
  "time": "2024-11-28T10:00:00Z",
  "email": "recipient@example.com",
  "subject": "Test Email",
  "body": "This is a scheduled email."
}
```

### **Frontend**
- Design workflows using the interactive flowchart interface.
- Simulate workflows to visualize execution.
- Save and import flowcharts for reuse.
- Toggle between dark and light themes.

---

## **Folder Structure**
```
email-scheduler/
├── backend/
│   ├── config/
│   │   └── database.js  # MongoDB connection setup
│   ├── routes/
│   │   ├── authRoutes.js  # Authentication routes
│   │   ├── emailRoutes.js  # Email-related routes
│   ├── server.js  # Main server file
│   ├── .env  # Environment variables
│   └── package.json  # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Flowchart.js  # Flowchart component
│   │   ├── App.js  # Main React app file
│   │   ├── index.js  # React entry point
│   │   ├── styles/  # Styled-components and themes
│   ├── public/
│   └── package.json  # Frontend dependencies
└── README.md  # Project documentation
```




