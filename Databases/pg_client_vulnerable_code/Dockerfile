# --- STAGE 1: Build the application ---
FROM node:22-slim as builder

# Set the working directory for the build process
WORKDIR /home/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files and install dependencies
# This is done first to leverage Docker layer caching
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copy source code and build config
COPY . .

# Run the build command (assuming this compiles TypeScript to JavaScript, 
# typically outputting files into a 'dist' directory)
RUN pnpm run build

# --- STAGE 2: Run the final application ---
# Use a smaller base image for the runtime to reduce container size
FROM node:22-alpine3.22

# Set working directory for the runtime
WORKDIR /home/app

# Install pnpm globally in the final stage (needed for the CMD command)
# Note: Using 'slim' or 'alpine' requires 'npm install -g pnpm'
RUN npm install -g pnpm

# Copy only the necessary files from the builder stage:
# 1. node_modules (dependencies)
# 2. The compiled application (e.g., in /dist)
# 3. package.json (needed for 'pnpm start')
COPY --from=builder /home/app/node_modules ./node_modules
COPY --from=builder /home/app/package.json ./package.json

# Copy the built application code (adjust 'dist' if your build output differs)
COPY --from=builder /home/app/dist ./dist 

# CRITICAL: Copy the .env file for database credentials and port 
# (DO NOT commit this file if it contains real secrets)
COPY .env .env 

# Your application should be listening on port 3001 (based on your .env)
EXPOSE 3001

# The command to start the application
# We assume 'pnpm start' runs the compiled code (e.g., node dist/server.js)
CMD ["pnpm" , "start"]
