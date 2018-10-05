FROM node:8-alpine

WORKDIR /srv
ADD . /srv
ENV NODE_ENV=development

ADD ./start.sh /start.sh
RUN chmod +x /start.sh

RUN npm i

EXPOSE 3000

CMD ["/start.sh"]
