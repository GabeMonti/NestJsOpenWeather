#
# 🧑‍💻 Development
#
FROM node:18-alpine as dev
# add the missing shared libraries from alpine base image
RUN apk add --no-cache libc6-compat
# Create app folder
WORKDIR /app

# Set to dev environment
ENV NODE_ENV dev

# Copy source code into app folder
COPY --chown=node1:node1 . .

# Install dependencies
RUN yarn --frozen-lockfile
RUN npm i --save @nestjs/cli

#
# 🏡 Production Build
#
FROM node:18-alpine as build

WORKDIR /app
RUN apk add --no-cache libc6-compat

# Set to production environment
ENV NODE_ENV production

# Generate the production build. The build script runs "nest build" to compile the application.
RUN yarn build

# Install only the production dependencies and clean cache to optimize image size.
RUN yarn --frozen-lockfile --production && yarn cache clean

#
# 🚀 Production Server
#
FROM node:18-alpine as prod

WORKDIR /app
RUN apk add --no-cache libc6-compat

# Set to production environment
ENV NODE_ENV production


CMD ["node", "dist/main.js"]