const server = require('./src/server');
const websocket = require('./src/websockets')(server);
const {
  HTTP_PORT
} = require('./env');

server.listen(HTTP_PORT, () => {
  console.log(`Server live on port ${HTTP_PORT}`);
});
