FROM node:14-alpine as base

WORKDIR /slack

COPY package*.json ./

FROM base as dev
RUN npm ci
COPY . ./
RUN npm run test
EXPOSE 8000
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
# RUN chmod +x /wait
#RUN chmod +x ./wait-for.sh
# CMD /wait && && nodemon -L ./bin/www

FROM base as production
RUN npm install pm2 -g
RUN npm ci --production
COPY . ./
CMD ["web:", "pm2-runtime", "start", "ecosystem.config.js", "--env", "production"]