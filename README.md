# WIRES - JavaScript 2 CA  
A lightweight social app built with vanilla JavaScript and the Noroff Social API v2.

## 🚀 Description
WIRES is a minimal, single-page social platform allowing users to register, log in, and manage their profile using the Noroff API. This project demonstrates understanding of APIs, authentication, form handling, and client-side logic using modern JavaScript.

## 🧩 Features

- ✅ User registration via Noroff API
- ✅ Login with authentication token storage
- ✅ Form validation with Noroff email restriction
- ✅ LocalStorage management (`user`, `accessToken`)
- ✅ Redirects after register and login
- ✅ Profile page with avatar, name, email
- ✅ Navbar with navigation and logout
- ✅ Protected routes and auto-redirects if not logged in

## 💡 Technologies Used

- JavaScript (ES Modules)
- HTML5 / CSS3
- Fetch API
- Noroff Social API v2
- Netlify (deployment)


## 📂 How to Use

1. Register using a valid Noroff email (`@stud.noroff.no`)
2. Log in to access your feed and profile
3. View profile details and navigate via the bottom navbar
4. Logout securely

## 🔗 Links

- 🔴 **Live site**: [https://wiresjs2.netlify.app](https://wiresjs2.netlify.app)
- 🟢 **GitHub repo**: [https://github.com/NoroffFEU/fed2-js2-ca-snezanakg](https://github.com/NoroffFEU/fed2-js2-ca-snezanakg)
   

   ## 🔧 Technologies

- Vite (Fast front-end build tool)
- Tailwind CSS
- JavaScript (ESModules)
- HTML5
- REST API: [https://v2.api.noroff.dev](https://v2.api.noroff.dev)

---

## 📂 Folder Structure

.
├── auth/
│ ├── login/index.html
│ └── register/index.html
├── feed/
│ └── index.html
├── post/
│ ├── create/index.html
│ ├── edit/index.html
│ └── index.html
├── profile/
│ └── index.html
├── src/
│ ├── css/style.css
│ ├── js/
│ │ ├── router/
│ │ │ ├── index.js
│ │ │ └── views/
│ │ │ ├── login.js
│ │ │ ├── register.js
│ │ │ ├── feed.js
│ │ │ ├── postCreate.js
│ │ │ ├── postEdit.js
│ │ │ └── profile.js
│ │ ├── api/
│ │ │ └── post/
│ │ │ ├── create.js
│ │ │ ├── update.js
│ │ │ ├── delete.js
│ │ │ └── read.js
│ │ └── ui/
│ │ └── post/
│ │ └── create.js
├── vite.config.js
└── index.js

## 🚀 Getting Started

### 1. Clone the repo
git clone https://github.com/NoroffFEU/fed2-js2-ca-snezanakg.git
cd fed2-js2-ca-snezanakg
2. Install dependencies
npm install
3. Start development server
npm run dev
Visit: http://localhost:5173

🌐 Available Pages
Route	Description
/auth/login/	User login page
/auth/register/	User registration
/feed/	Public feed of posts
/post/create/	Create a new post
/post/edit/	Edit an existing post
/profile/	User profile page

🧪 Features Implemented
✅ Tailwind setup with Vite

✅ Responsive UI using Tailwind

✅ Dynamic JS module routing

✅ Full CRUD with API: create, read, update, delete posts

✅ LocalStorage token management

✅ File uploads (via URL.createObjectURL)

✅ Client-side form handling

✅ Organized folder structure

📦 Build for Production
npm run build
📄 License
This project is for educational purposes at Noroff Frontend course – not for commercial use.

👤 Author
Snežana KG. – GitHub Repo





