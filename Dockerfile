# FROM node:19-alpine
# WORKDIR /frontend
# COPY package.json ./
# RUN npm install --force
# COPY ./ ./
# EXPOSE 3000
# CMD npm run start

# Base image
# FROM node:19-alpine

# # Set working directory
# WORKDIR /frontend

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Expose port 3000
# EXPOSE 3000

# # Start the application
# CMD ["npm", "start"]

# Use a lightweight base image
FROM nginx:alpine

# Copy the built frontend files into the image
COPY ./build /usr/share/nginx/html

# Expose the default HTTP port
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]