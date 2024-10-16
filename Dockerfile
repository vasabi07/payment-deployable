# Use Node.js 18 as the base image
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Use a lighter image for the production stage
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only the built app and node_modules from the builder stage
COPY --from=builder /app ./

# Start the Next.js app
CMD ["npm", "start"]
