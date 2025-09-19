# Gym Finder App

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

### 🚧 In Progress
- **Gym Discovery**
  - Researching integration with **Places API**

### 🔮 Planned
- **Nearby Gym Finder** with filtering & sorting
- **Detailed Gym Info** (opening hours, membership tiers, facilities, trainers)
- **AI-Powered Workouts** based on user goals & fitness levels

---

## 🛠️ Tech Stack

- **Frontend:** React + Tailwind CSS (with animations)
- **Backend:** FastAPI (Python)
- **Database:** MySQL
- **Auth:** JWT (stored securely in cookies)
- **APIs:** Google Places API (planned)

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
