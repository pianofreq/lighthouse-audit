# Start with a Node.js base image
FROM node:14-slim

# Set environment variables for Chrome
ENV CHROME_BIN="/usr/bin/google-chrome" \
    LIGHTHOUSE_CHROMIUM_PATH="/usr/bin/google-chrome"

# Install system dependencies for Chrome and cleanup in one layer to keep image size down
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    ca-certificates \
    --no-install-recommends \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create and define the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose port 8080 for your application
EXPOSE 8080

# Define the command to run your app
CMD [ "node", "app.js" ]
