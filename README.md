## Url Shortner (TypeScript)

This project was for learning and exploring **HTTP redirections**, **ORMs (Prisma)**, and **PostgreSQL integration** in **TypeScript** using **NestJS**.

---

### 🧠 Key Learnings

- Gained a deeper understanding of how **decorators** work in TypeScript.  
- Developed a solid grasp of how **NestJS** differs from traditional **Node.js**, particularly its **layered architecture** and **built-in security abstractions**.  
- Learned how to **integrate and format responses** from third-party APIs.  
- Understood how **Prisma ORM** simplifies database interaction while ensuring type safety.  
- Implemented **redirect handling** using NestJS decorators (`@Get`, `@Res`, `@Redirect`).  
- Explored how **PostgreSQL** handles relational data with Prisma-generated schemas.  

---

### 🧩 Stack

- **NestJS** – Backend framework  
- **TypeScript** – Strongly typed language  
- **Prisma ORM** – Database management layer  
- **PostgreSQL** – Relational database  
- **CryptoJS (MD5)** – URL hashing  

---

### ⚙️ Core Features

- Shorten long URLs into unique hashes.  
- Redirect automatically when accessing the shortened URL.  
- Store and retrieve data using **Prisma ORM** and **PostgreSQL**.  
- Include a minimal **frontend (`index.html`)** to test all routes.  
- Optional **Redis caching** for faster redirects.  
- RESTful endpoints for CRUD operations.

---

### 🚀 Commands

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Start development server
npm run start:dev
```