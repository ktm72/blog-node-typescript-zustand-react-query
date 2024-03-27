FROM node:20-alpine as build-stage

WORKDIR /react

#  If the package doesn't change, no need to copy it every time we run the build command
COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /react/dist /usr/share/nginx/html

# the container is running at port 3000. It helps DevOps just seeing the docker file
# EXPOSE 3000

#start nginx and serve the application
CMD ["nginx","-g","daemon off;"]