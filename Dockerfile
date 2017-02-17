FROM node:6.2.0

MAINTAINER raju.ghosh@fieldnation.com

RUN mkdir -p /var/www/node

ADD ./myapp/ /var/www/node

WORKDIR /var/www/node

RUN npm install

CMD npm start

EXPOSE 8082

