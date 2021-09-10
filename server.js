/**
 * server.js
 * 
 * (c) 2017-2021 Wany
 * 
 * @summary Wanyne Server
 * @author Wany <sung@wany.io>
*/

const app = require('./app');
const http = require('http');
const {exec} = require('child_process');
const port = { http: 80 };

/* HTTP */
//const httpServer = http.createServer(app);
/* WebSocket upgrade */
/*httpServer.on('upgrade', (request, socket, head) => {
  try {

    var dest = request.headers.host;

    switch (dest) {

      default: {
        socket.destroy();
      }

    }

  }
  catch (error) {
    console.error(error);
  }
});*/

/* add listener */
exec('kill -9 $(lsof -t -i:' + port.https + ')', (error, stdout, stderr) => {

  setTimeout(() => {
    console.log('server start');
    try {
      app.app.listen(port.http, () => { });
    } catch (error) {
      console.log(error);
    }
  }, 500);

});