# Use an official Node.js runtime as the base image
FROM node:19-alpine

# Set the working directory in the container
WORKDIR /

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install --silent

# Copy the entire project directory to the container
COPY . .

# Build the React app
RUN npm run build

# Set the command to start the React app
CMD ["npm", "start"]