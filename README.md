# Post Management Application

A simple Post Management app built with Vue 3 and TypeScript that demonstrates full CRUD functionality for posts.

Users can browse posts, search and filter them, view single posts with comments, and create, edit, or delete posts. The project also includes basic testing and routing with a Not Found page.

---

## 🌐 Live Demo

👉 [post-managment-app](https://juedash.github.io/post-managment-app/)

---

## ✨ Features

- CRUD operations for posts  
- Search posts by title  
- Filter posts by user  
- Single post view with comments  
- Load more pagination  
- Not Found page for invalid routes or missing posts  
- Confirmation modal for destructive actions  

---

## 🛠 Tech Stack

- Vue 3 (Composition API)  
- TypeScript  
- Vite  
- Vue Router  
- Tailwind CSS  
- Cypress (Component + E2E testing)  
- ESLint  

---

## 📦 Project Setup

```sh
npm install
```

---

## 🚀 Development

### Compile and Hot-Reload

```sh
npm run dev
```

---

## 🏗 Production Build

```sh
npm run build
```

---

## ✅ Testing

### Component Tests (Cypress)

```sh
npm run test:unit:dev
# or
npm run test:unit
```

### E2E Tests (Cypress)

```sh
npm run test:e2e:dev
npm run test:e2e:chrome
```

Recommended before deployment:

```sh
npm run build
npm run test:e2e
```

---

## 🧹 Linting

```sh
npm run lint
```

---

## 🔍 Type Checking

```sh
npm run type-check
```
