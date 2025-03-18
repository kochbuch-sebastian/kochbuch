FROM node AS vue-build
WORKDIR /frontend-src
COPY client/ .
RUN npm install
RUN npm run build

FROM node AS kochbuch-server
# RUN apt -y update && apt -y upgrade

ARG NODE_ENV=production

ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
WORKDIR /app

COPY server ./server
COPY --from=vue-build /frontend-src/dist/ ./server/public
COPY ["package.json", "package-lock.json*", "./server/"]
# Final setup and installation of node
RUN npm install
EXPOSE $PORT
# Copy files to container

USER node
CMD ["npm", "start"]