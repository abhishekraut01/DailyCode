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

# 🚀 Docker setup

### 1. Install Docker 
Download and install from [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

### 2. Create network
```bash
docker network create mylocalnetwork
```
### 3. update .env
```bash
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/postgres"
```

### 4. Run the database
```bash
docker run -e POSTGRES_PASSWORD=admin123 --name mypg --network mylocalnetwork -d -p 5432:5432 postgres
```

### 5. docker build image 
```bash
docker build --network=host -t prismaproject .
```

### 6. docker run image 
```bash
docker run -e DATABASE_URL="postgresql://postgres:admin123@mypg:5432/stduentdatabase" --name prismaApp --network mylocalnetwork -p 3000:3000  prismaproject
```
