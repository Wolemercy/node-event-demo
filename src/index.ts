import * as express from 'express';
import client from './tcp/client';
import * as EventEmitter from 'events';

class OnDataEmitter extends EventEmitter {}
const OnData = new OnDataEmitter();

const app = express();

client.on('data', data => {
  const code = data.toString().slice(5, 8);
  OnData.emit(code, data.toString());
});

app.get('/', async (req, res) => {
  const code = req.query.statusCode as string;

  if (code.length > 3) {
    res.send({error: 'invalid input'});
    return;
  }

  let status = false;

  OnData.on(code, data => {
    status = true;
    res.send({data});
    OnData.removeAllListeners(code);
  });

  setTimeout(() => {
    if (status) return true;
    OnData.removeAllListeners(code);
    res.send({error: 'timedout'});
    return;
  }, 2000);
  client.write(code);
});

app.listen(9002, () =>
  console.log('Server listening on http://localhost:9002')
);
