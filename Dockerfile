# Development stage
FROM node:18-alpine AS development

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock first to leverage Docker cache
COPY --chown=node:node package*.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of your application's code
COPY --chown=node:node . .

# Compile TypeScript to JavaScript
RUN yarn build

# Use a non-root user for better security
USER node

EXPOSE 3000

# Start the application
CMD [ "node", "dist/main.js" ]
