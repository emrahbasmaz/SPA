#stage 1
# The builder from node image
FROM node:alpine as build-step

# Move our files into directory name "app"
WORKDIR /app
COPY package.json ./
RUN npm install 
COPY . .
EXPOSE 4200
CMD  npm run start

# #stage 2
# # Build a small nginx image with static website
# FROM nginx:alpine as prod-stage
# From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
#COPY --from=build-step /app/dist/SPA /usr/share/nginx/html
# EXPOSE 8000
# CMD ["nginx", "-g", "daemon off;"]

### STAGE 2: Setup ###

# FROM nginx:alpine

# ## Copy our default nginx config
# COPY nginx/nginx.conf /etc/nginx/conf.d/

# ## Remove default nginx website
# RUN rm -rf /usr/share/nginx/html/*

# ## From ‘builder’ stage copy over the artifacts in dist folder to default nginx public folder
# COPY --from=build-step /app/dist/SPA /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"]
