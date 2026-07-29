# 🩺 Medicos

A full-stack healthcare platform built using the **MERN Stack** that connects patients and doctors. Users can book appointments, manage profiles, and securely access healthcare services through a modern and responsive web application.

## 🚀 Live Demo

- **Frontend:** https://medicos-19.onrender.com
- **Backend API:** https://medicos-4-gxgi.onrender.com

> Replace the above URLs with your deployed links.

---

## ✨ Features

### 👨‍⚕️ Patient
- User Registration & Login
- Secure Authentication
- Browse Doctors
- Search & Filter Doctors
- Book Appointments
- View Appointment History
- Update Profile

### 🩺 Doctor
- Doctor Dashboard
- Manage Availability
- View Appointments
- Accept/Reject Bookings
- Update Profile

### 👨‍💼 Admin
- Admin Dashboard
- Manage Doctors
- Manage Users
- Manage Appointments
- Monitor Platform Activity

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js

### Tools
- Git & GitHub
- Postman
- Render / Vercel

---

## 📂 Project Structure

```
Medicos/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/MridulSingh3/Medicos.git
cd Medicos
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run Backend

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📸 Screenshots

Add screenshots of your application here.

Example:

```
Home Page
Doctor Dashboard
Appointment Booking
Admin Dashboard
```

---

## 🔒 Environment Variables

Backend `.env`

```env
PORT=
MONGO_URI=
JWT_SECRET=
```

Frontend `.env`

```env
VITE_API_URL=http://localhost:5000
```

---

## 📌 Future Enhancements

- Online Payment Integration
- Video Consultation
- Email Notifications
- Prescription Management
- Medical Reports Upload
- Chat Between Doctor & Patient
- Appointment Reminder
- Dark Mode

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 👨‍💻 Author

**Mridul Singh**

- GitHub: https://github.com/MridulSingh3
- LinkedIn: www.linkedin.com/in/mridulsingh3

---

## ⭐ Support

If you like this project, don't forget to ⭐ the repository.
