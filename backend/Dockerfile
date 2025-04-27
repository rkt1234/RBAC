# Use Node LTS version as base
FROM node:20-slim

# Set working directory inside container
WORKDIR /app

# Copy only package files first (for better cache)
COPY package*.json ./
# ALSO copy prisma folder BEFORE npm install
COPY prisma ./prisma

# Install dependencies
RUN npm install

# Copy rest of the application code
COPY . .

# Generate Prisma Client (IMPORTANT)
RUN npx prisma generate

# Expose backend port
EXPOSE 5000

# Command to start the server
CMD ["npm", "run", "start"]
