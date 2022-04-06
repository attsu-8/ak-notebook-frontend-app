########################################################
### base stage             
########################################################
FROM node:16.13.1-alpine as base

WORKDIR /root/src/base

COPY ./app ./

RUN npm install


########################################################
### builder stage             
########################################################
FROM node:16.13.1-alpine as builder

ENV NODE_ENV=production

WORKDIR /root/src/builder

COPY --from=base /root/src/base /root/src/builder

RUN ["npm", "run", "build"]


########################################################
### production stage             
########################################################
FROM node:16.13.1-alpine as production

ENV NODE_ENV=production

WORKDIR /root/src/app

RUN apk add bash

COPY --from=builder /root/src/builder ./

EXPOSE 443

CMD ["npm", "run", "start"]