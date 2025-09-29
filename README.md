# 💬 Real-Time Chatting App

Une application de messagerie en temps réel construite avec **React + TypeScript** (frontend) et **Node.js + Express + MongoDB** (backend).
Elle permet aux utilisateurs de s’inscrire, de se connecter, d’envoyer des messages texte ou image en temps réel grâce à **Socket.IO**.

---

## 🚀 Fonctionnalités

* 🔐 Authentification (JWT + bcrypt)
* 👤 Gestion des utilisateurs (profil avec photo)
* 💬 Chat en temps réel (Socket.IO)
* 🖼️ Upload d’images (Cloudinary + Multer)
* 📡 API REST (Express + MongoDB via Mongoose)
* 🎨 Interface moderne avec React, TailwindCSS et DaisyUI
* ⚡ State management avec Zustand
* 🔔 Notifications (react-hot-toast)

---

## 🛠️ Technologies utilisées

### Frontend

* ⚛️ React 19 (TypeScript, Vite)
* 🎨 TailwindCSS + DaisyUI
* 🔥 Zustand (state management)
* 🔔 React Hot Toast
* 🌐 Socket.IO Client

### Backend

* 🟢 Node.js + Express
* 🍃 MongoDB + Mongoose
* 🔐 JWT (authentification)
* 🔑 BcryptJS (hashage des mots de passe)
* 🖼️ Cloudinary (gestion des images)
* 📂 Multer + Streamifier
* 📡 Socket.IO (communication en temps réel)

---

## 📂 Structure simplifie du projet

```
chat-app/
│── backend/        # API Node.js + Express
│   ├── src/        
│   │   ├── models/ 
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.js
│   ├── package.json
│
│── frontend/       # Application React + TS
│   ├── src/
│   │   ├── components/
│   │   ├── store/
│   │   ├── pages/
│   │   └── main.tsx
│   ├── package.json
│
├── package.json    # scripts globaux (build/start)
├── .env            # variables d’environnement (non versionné)
├── .env.example    # exemple d’environnement
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/ton-username/chat-app.git
cd chat-app
```

### 2️⃣ Installer les dépendances

```bash
# Installer les dépendances backend
cd backend
npm install

# Installer les dépendances frontend
cd ../frontend
npm install
```

### 3️⃣ Créer un fichier `.env` dans `backend/`

Copie le fichier `.env.example` et complète avec tes vraies valeurs :

```ini
MONGO_URI=your_mongo_uri

PORT=5001

JWT_SECRET=your_jwt_secret

NODE_ENV=development

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

---

## ▶️ Lancer l’application

### Backend (API + Socket.IO)

```bash
cd backend
npm run dev
```

👉 Le backend tourne sur **[http://localhost:5001](http://localhost:5001)**

### Frontend (React + Vite)

```bash
cd frontend
npm run dev
```

👉 Le frontend tourne sur **[http://localhost:5173](http://localhost:5173)**

---

## 📦 Build & Production

Tu peux utiliser les scripts globaux définis dans `package.json` (à la racine) :

```bash
# Installer et builder le frontend
npm run build

# Lancer le backend en production
npm start
```

---

## 🔑 Exemple `.env.example`

```ini
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/chatting_app?retryWrites=true&w=majority

PORT=5001

JWT_SECRET=mysecret

NODE_ENV=development

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 📝 TODO / Améliorations possibles

* ✅ Ajouter les conversations de groupe
* ✅ Mettre en place un système de notifications push

---

## 👨‍💻 Auteur

Développé avec ❤️ par **Niedjo Kuitche**

---

