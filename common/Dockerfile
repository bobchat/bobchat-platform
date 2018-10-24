FROM znly/protoc:latest

RUN apk add --no-cache --virtual .build-deps \
  bash \
  gcc \
  musl-dev \
  openssl \
  git \
  make \
  g++ \
  python \
  libcap

RUN apk add --no-cache nodejs-npm && \
  npm install protobufjs

# set the code directory
ENV CODE_DIR /opt
WORKDIR $CODE_DIR

# allow node to bind to port 80
RUN setcap 'cap_net_bind_service=+ep' /usr/bin/node

# create unprivileged user
RUN addgroup -g 1000 -S node && \
  adduser -u 1000 -S node -G node
RUN chown -R 1000:1000 $CODE_DIR
USER node

COPY --chown=1000:1000 package.json package-lock.json $CODE_DIR/
RUN npm install

COPY --chown=1000:1000 . $CODE_DIR

CMD npm run build

#CMD npm run start
