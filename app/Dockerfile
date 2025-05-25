# Use official pnpm image for build
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml to the container
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Expose the application port (adjust as needed)
EXPOSE 3000

# Define the command to run the application
CMD ["pnpm", "start"]
