# Use official pnpm image for build
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm using the official installer
RUN wget -qO- https://get.pnpm.io/install.sh | sh -

# Copy package files
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY . .

# Install dependencies and build
RUN pnpm install --frozen-lockfile
RUN pnpm build

# Use a lightweight web server to serve the built files
FROM node:20-alpine AS runner

WORKDIR /app

# Install pnpm using the official installer
RUN wget -qO- https://get.pnpm.io/install.sh | sh - && \
  pnpm add -g serve

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose the port (default Vite preview port)
EXPOSE 4173

# Start the app
CMD ["serve", "-s", "dist", "-l", "4173"]