# Use an official Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variable for React app
ENV VITE_API_BASE_URL=https://story-link-server.vercel.app/api/v1
ENV VITE_API_DOMAIN=https://story-link-server.vercel.app

# Build the React app
RUN npm run build

# Expose port (same as in your app's configuration)
EXPOSE 5173

# Set the command to run when the container starts
CMD [ "npm", "run", "dev" ]

