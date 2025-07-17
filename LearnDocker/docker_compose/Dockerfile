# Use lightweight Node.js base image
FROM node:22-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Run Prisma migrations and generate client
RUN npx prisma generate
RUN npx prisma migrate dev --name init

# Start the development server
CMD ["npm", "run", "dev"]
