# ---- Builder Stage ----
FROM node:22.13.1-alpine AS builder

# Set environment variables

ARG ENVIRONMENT
ENV ENVIRONMENT=${ENVIRONMENT}
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}
ENV PORT=3000
ARG CMS_BASE_URL
ENV CMS_BASE_URL=${CMS_BASE_URL}
ARG CMS_READ_API_KEY
ENV CMS_READ_API_KEY=${CMS_READ_API_KEY}

# Set working directory
WORKDIR /app

# Install pnpm manually instead of using corepack
RUN npm install -g pnpm@latest

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN pnpm run build

# Remove unnecessary dependencies (optional)
RUN pnpm prune --prod

# ---- Production Stage ----
FROM node:22.13.1-alpine AS runner

WORKDIR /app

# Install pnpm in the final image
RUN npm install -g pnpm@latest

# Copy necessary files from the builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json package.json

# Expose the required port
EXPOSE 3000

# Run Next.js properly with Node
CMD ["node", "./node_modules/next/dist/bin/next", "start"]

