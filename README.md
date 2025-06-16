# Feed  
Feed is a social media application built with **Next.js**, **TypeScript**, **Tailwind CSS** and **MongoDB**, featuring a robust functionality for posting, liking, and interacting with content.  
It also includes a realtime chat system powered by **Socket.IO** for seamless, interactive messaging between users.

### Live Demo - [Project Live Link](https://feed-social.vercel.app/)


## 📌 Features

### 🌐 Public Access
- **Landing Page** — Welcome page introducing the platform.
- **Home Page** — Browse the latest posts without signing in.
- **Explore Page** — Search and view user profiles.

### 👤 User Features
- Sign In / Sign up / Sign Out securely.
- JWT-based session management.
- Onboarding for new users  
- Profile editing with name, bio  
- Explore other users’ profiles and their posts.

### 📝 Post Features
- Create, Like, Reply, and Delete Posts  
- Infinite scrolling feed  
- Post timestamps and like, reply counts  
- View user-specific posts and replies 

### 💬 Chat Features  
- Realtime 1:1 chat via Socket.IO.
- Message timestamps. 
- Chat list view
- Last message preview
- Unread message count badges
- Online status and typing indicators.
---

### 💻 Tech Stack

#### Frontend:
- [Next.js](https://nextjs.org/) — React framework for fast, scalable web apps.
- [TypeScript](https://www.typescriptlang.org/) — Typed superset of JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework.
- [shadcn/ui](https://ui.shadcn.com/) — Beautiful, accessible UI components.
- [lucide-react](https://lucide.dev/) — Icon library.
- [zustand](https://zustand-demo.pmnd.rs/) — Global state management.

#### Backend:
- [Express](https://expressjs.com/) — Web framework for Node.js.
- [MongoDB](https://www.mongodb.com/) — NoSQL document database.
- [Mongoose](https://mongoosejs.com/) — ODM for MongoDB.
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) — Password hashing.
- [jsonwebtoken (JWT)](https://github.com/auth0/node-jsonwebtoken) — Token-based authentication.
- [Socket.IO](https://socket.io/) — Realtime, bidirectional communication.

---