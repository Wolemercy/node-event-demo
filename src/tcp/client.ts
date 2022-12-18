import * as net from 'net';
import {ListenOptions} from 'net';

const client = new net.Socket();
const config = {
  host: '0.0.0.0',
  port: 9001,
  exclusive: true,
};

const timeout = 3000;
let retrying = false;

const makeConnection = () => client.connect(config.port, config.host);

const connectEventHandler = () => {
  console.log('***** connected *****');
  console.log(
    {
      port: client.remotePort,
      host: client.remoteAddress,
    },
    'connected to server'
  );
  retrying = false;
};

const errorEventHandler = (err: Error) => {
  console.log(`Connection error ${err.message}`);
  if (!retrying) {
    retrying = true;
  }
  setTimeout(makeConnection, timeout);
};

const closeEventHandler = () => {
  if (retrying) return false;
  console.log('Server closed');
  console.log(`Reconnecting in ${timeout / 1000} seconds`);
  if (!retrying) {
    retrying = true;
  }
  return setTimeout(makeConnection, timeout);
};

client.on('connect', connectEventHandler);
client.on('error', errorEventHandler);
client.on('close', closeEventHandler);

console.log('***** connecting *****');
makeConnection();

export default client;
