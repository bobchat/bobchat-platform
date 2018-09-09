const server = require('./src/server');
const websocket = require('./src/websockets')(server);
const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server live on port ${PORT}`);
});