FROM node:16-alpine
WORKDIR /app/src
COPY package.json .
COPY package-lock.json .
COPY .env .
RUN npm install 
COPY ./src .
EXPOSE 1626
CMD npm start