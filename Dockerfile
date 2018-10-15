FROM node:alpine

# make source directory
CMD mkdir /app

# copy source code
COPY . /app

# change working directory
WORKDIR /app

# reduce spew
ENV NPM_CONFIG_LOGLEVEL info

# install packages
RUN npm install

# expose the port internally
EXPOSE 3000

# start the service
ENTRYPOINT ["npm", "run", "start"]