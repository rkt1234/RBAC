# Use Node LTS version as base
FROM node:20-slim

# Set working directory inside container
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Copy prisma folder from backend
COPY backend/prisma ./prisma

# Install backend dependencies
RUN npm install

# Copy rest of the backend application code
COPY backend/ .

# Generate Prisma Client (IMPORTANT)
RUN npx prisma generate

# Expose backend port
EXPOSE 5000

# Start backend server
CMD ["npm", "run", "start"]
