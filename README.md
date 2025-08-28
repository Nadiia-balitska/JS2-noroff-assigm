# Social Media Client-Side App (FED2-CA)

## 📌 Overview

This is my client-side social media application built as a coursework assignment. The app allows users to register, log in, and perform essential CRUD operations on posts (Create, Read, Update, Delete). 

It also supports commenting, reacting to posts, and viewing single post details.

## 🔧 Tech Stack

- Vanilla JavaScript (ES Modules)
- HTML & CSS
- Vite (Multi-Page Application setup)
- Noroff Social API

---

## 🚀 Features Implemented

### ✅ User Features (Core Requirements)

- **Register new user**
- **Login and logout**
- **Create a new post**
- **Edit an existing post**
- **Delete a post**
- **View all posts**
- **View single post by ID**
- **Comment on a post**

### 🔐 Auth & Security

- JWT token is saved in `localStorage`
- Used in all authorized API requests

---

## 📁 Project Structure

src/
├── js/
│ ├── api/ # API interactions (CRUD)
│ ├── ui/ # DOM manipulation & event handling
│ ├── router/ # MPA router (dynamic JS loader)
│ └── views/ # View-specific scripts (e.g., login, register, post)
├── css/ # Stylesheets
└── index.html # Entry point

---

## 📄 HTML Pages

- `index.html` – Home / Feed (latest posts)
- `auth/login.html` – Login page
- `auth/register.html` – Register page
- `post/create.html` – Create post form
- `post/edit.html` – Edit post form
- `post/index.html` – Single post view
- `profile.html` – User profile page

---

## ✅ Setup & Run Locally

1. Clone the repository  
2. Run `npm install`  
3. Start the dev server:  
npm run dev
4. Open your browser at `http://localhost:5173`

---

## 📌 API Reference

- [Noroff API Docs](https://docs.noroff.dev/docs/v2/social/posts)
- All requests use a valid `accessToken` and `X-Noroff-API-Key` header

---

## 💡 Development Notes

- Priority is on logic and meeting core user stories
- Styling is minimal (wireframe-level) for now
- Modular structure used for maintainability
- Imports are relative to `/src`

---


## ✍️ Author

Built with 💻 by Synthia Bassolé as part of the FED2 JavaScript CA at Noroff.

