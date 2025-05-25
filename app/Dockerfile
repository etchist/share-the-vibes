# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json, pnpm-lock.yaml, and workspace configuration
COPY package.json pnpm-lock.yaml ./
COPY nx.json workspace.json tsconfig.base.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Run the Nx build command (adjust the target as needed)
RUN pnpm nx build

# Stage 2: Serve the application
FROM nginx:alpine

# Copy the built application from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the default nginx port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
