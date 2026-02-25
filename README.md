# 🏠 ApnaStay – Property Listing Web Application

ApnaStay is a full-stack web application where users can list,edit, explore, review, direct whatsapp chat with owner and manage rental properties.  
It provides secure authentication (including Google OAuth), session management, and CRUD functionality.

---

## 🚀 Live Demo
https://apnastay-ffb3.onrender.com

---

## 📌 Features

- 🔐 User Authentication (Signup/Login/Logout)
- 🔑 Google OAuth 2.0 Login
- 🏠 Create, Edit, Delete Property Listings
- ❤️ Wishlist Feature
- ⭐ Review & Rating System
- 📷 Image Upload using Cloudinary
- 🧾 Flash Messages for User Feedback
- 🔒 Authorization (Only owner can edit/delete)
- 📱 Responsive UI
- 🗄️ Session Store using MongoDB

---

## 🛠️ Tech Stack

### 🌐 Frontend
- HTML
- CSS
- Bootstrap
- EJS (Embedded JavaScript Templates)

### ⚙️ Backend
- Node.js
- Express.js

### 🗄️ Database
- MongoDB
- Mongoose

### 🔐 Authentication & Security
- Passport.js
- Passport Local Strategy
- Passport Google OAuth 2.0
- express-session
- connect-mongo
- dotenv

### ☁️ Cloud Services
- Cloudinary (Image Storage)

---

## 📦 NPM Packages Used

| Package | Purpose |
|----------|---------|
| express | Backend framework |
| mongoose | MongoDB ODM |
| ejs | Templating engine |
| ejs-mate | Layout support for EJS |
| passport | Authentication middleware |
| passport-local | Username/password strategy |
| passport-google-oauth20 | Google login |
| express-session | Session management |
| connect-mongo | Store session in MongoDB |
| connect-flash | Flash messages |
| method-override | PUT & DELETE requests |
| multer | File upload handling |
| cloudinary | Cloud image storage |
| dotenv | Environment variables |

---

## 🔑 Authentication Flow

1. User signs up or logs in.
2. Passport verifies credentials.
3. Session is created using `express-session`.
4. Session is stored in MongoDB using `connect-mongo`.
5. Protected routes check `req.isAuthenticated()`.

For Google login:
- User redirected to Google
- Google verifies user
- Returns profile
- Passport creates/finds user
- Session created

---

## 🔒 Authorization Logic

- Only listing owner can edit/delete.
- Only review author can delete review.
- Middleware checks:
```js
