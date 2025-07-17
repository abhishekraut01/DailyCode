## 🚀 Manual setup

### 1. Install Node.js  
Download and install from [https://nodejs.org](https://nodejs.org)

### 2. Clone the Repository
```bash
git clone <your-repo-url>
cd <project-folder>
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Create `.env` File
```env
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/postgres"
```

### 5. Run PostgreSQL locally or use neon db
`
Go to neon.tech create postgresql and copy db url ans paste in .env file
`

### 6. Prisma Setup
```bash
npx prisma migrate dev
npx prisma generate
```

### 7. Build and Run
```bash
npm run build
npm run dev
```

