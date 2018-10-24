FROM node:10.11.0

# make source directory
RUN mkdir /service


# copy source code
COPY . /service

# change working directory
WORKDIR /service

COPY package.json package-lock.json ./

RUN npm install
RUN npm run build
CMD npm run start