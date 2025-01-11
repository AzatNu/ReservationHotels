FROM node:18

WORKDIR /usr/src/app

COPY . .

WORKDIR /usr/src/app/Fronted
RUN npm i
RUN npm run build

WORKDIR /usr/src/app/Backend
RUN npm i


EXPOSE 3005

CMD ["node","app.js"]