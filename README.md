# Demo: Event-driven Programming with NodeJS

In this project, we

- set up a TCP Server and a TCP client using NodeJS' [Net Module](https://nodejs.org/api/net.html)
- set up a simple webserver using Express
- achieve communication between a web browser and the TCP client
- communication between the browser and the webserver happens via HTTP
- communication between the webserver and the TCP client happens via NodeJS' event loop
- communication between the TCP client and the TCP server happens via a socket connection.

## To run

- install the relevant packages using `npm install` after cloning the project
- ensure you have ts-node installed globally (you can do without it if you want)
- start the TCP server by running `src/tcp/server.ts` from the root of the project
- start the webserver by running `npm run dev` and it should now be running on `http://localhost:9002`

## To test

- you can test
    - in your terminal via curl (e.g. `curl http://localhost:9002/\?statusCode\=500`). Note that the forward slash ('/') and equals to('=') are escaped. You may not need to do so depending on your machine
    - in your web browser by hitting `http://localhost:9002/?statusCode=200`
- the values of the statusCodes can be any 3-digit value (as all status codes are)

Inspired by [Danstan Onyango's Medium post](https://blog.cloudboost.io/event-driven-programming-with-nodejs-net-and-events-9e4e14f561f3)

Keep learning!
