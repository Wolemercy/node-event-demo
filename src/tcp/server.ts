import * as net from 'net';
import {ListenOptions} from 'net';

const server = net.createServer();

const config: ListenOptions = {
  host: '0.0.0.0',
  port: 9001,
  exclusive: true,
};

server.on('connection', socket => {
  console.log('New client connected');
  socket.on('data', data => {
    const code = data.toString().slice(0, 3);
    switch (code) {
      case '404':
        return socket.write(
          `Code ${code}: Not found, used when user request for a resource or page that does not exist.\n`
        );
      case '500':
        return socket.write(
          `Code ${code}: Internal Server, used when web server has an unxpected error.\n`
        );
      case '200':
        return socket.write(`Code ${code}: Good, very good.\n`);
      default:
        return socket.write(
          `I dont know about code "${code}" mate, or I am yet to learn about it \n`
        );
    }
  });

  socket.on('error', error => {
    console.log({error: 'error in connection ${error}'});
    socket.destroy(
      new Error(
        JSON.stringify({
          error: 'connection error',
          code: 500,
        })
      )
    );
    socket.end();
  });
});

// Start server
server.listen(config);

//server running
server.on('listening', () => {
  console.log('server is listening on %j', config.port);
});

// Restart server if port or address is in use
server.on('error', err => {
  if (err.name === 'EADDRINUSE') {
    console.log('Address or port in use. Retrying...');
    setTimeout(() => {
      server.close();
      server.listen(config);
    }, 5000);
  } else {
    console.log({err: `Server error ${err}`});
  }
});

export default server;
