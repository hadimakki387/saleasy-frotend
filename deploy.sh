#!/bin/bash

# Stop the existing PM2 process
pm2 stop saleasy-frontend

# Pull the latest changes from the Git repository
git pull

# Install any new dependencies
yarn install

# Build the Next.js app
yarn build

# Save the current PM2 process list
pm2 save

# Start the Next.js app on port 3003 using PM2
pm2 start yarn --name saleasy-frontend -- start -p 3003
