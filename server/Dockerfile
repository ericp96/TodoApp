FROM node:8-alpine

WORKDIR /srv
ADD . /srv
ENV NODE_ENV=production

RUN npm install

EXPOSE 3001

CMD ["node", "--harmony", "./index.js"]
