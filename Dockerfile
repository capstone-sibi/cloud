# Development stage
FROM node:18-alpine AS development

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock first to leverage Docker cache
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of your application's code
COPY . .

# Compile TypeScript to JavaScript
RUN yarn build

# Start the application
CMD [ "node", "dist/main.js" ]
