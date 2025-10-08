# Gym Finder App

**link - fitfinder-frontend.onrender.com**
note that first load will be slow due to backend server shutting down after inactivity (may take up to few minutes)

A modern web application that helps users **discover gyms nearby** with all the important details in one place — such as **walk-in availability, fees, and personal training options**.  

Instead of searching multiple websites or Instagram pages for information, this app centralizes everything in one clean platform.  

Future versions will include an **AI-powered custom workout generator** for personalized fitness plans.  

---

## ✨ Features

### ✅ Completed
- **Authentication**
  - Signup & Login pages with proper validation
  - Secure password hashing
  - JWT authentication (stored in cookies)
- **Frontend**
  - Animated login & signup with spring effects
  - Snowflake background animation
  - Custom input fields with styled placeholder effects
  - Private and Public routing
  - UI for the mainpage with fake data
  - Navbar on the mainpage
  - Background animations plasma effect
  - Gym cards with search section
  - about section

### 🔮 Planned
- **AI-Powered Workouts** based on user goals & fitness levels

---

## 🛠️ Tech Stack

- **Frontend:** React + Tailwind CSS (with animations)
- **Backend:** FastAPI (Python)
- **Database:** MySQL
- **Auth:** JWT (stored securely in cookies)
- **APIs:** Google Places API, Geocode API

---

### Frontend
cd frontend
npm install
npm run dev

### Backend
cd backend
pip install -r requirements.txt
fastapi dev ./src/main.py

### Images of login and signup page
<img width="1599" height="919" alt="image" src="https://github.com/user-attachments/assets/e63a381a-505a-46ba-a6ce-3762a099ba2e" />
<img width="1176" height="900" alt="image" src="https://github.com/user-attachments/assets/67b4bc5f-25c9-495b-8d2d-2ec574a481db" />
<img width="1419" height="931" alt="image" src="https://github.com/user-attachments/assets/1a830491-fb65-4295-9c5f-1d6265dea2f8" />
<img width="1446" height="970" alt="image" src="https://github.com/user-attachments/assets/344e73f2-a1a8-4f1a-857d-75123b517813" />
<img width="1392" height="970" alt="image" src="https://github.com/user-attachments/assets/295d2611-340c-4a04-8e61-f3aa66869ed3" />




