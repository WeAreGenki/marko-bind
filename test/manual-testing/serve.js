/**
 * Minimal server for test page preview or manual testing.
 */
/* eslint-env node *//* eslint-disable no-console */

'use strict';

const http = require('http');
const nodeStatic = require('node-static');

const webroot = __dirname;
const port = process.env.PORT || 8008;

const fileServer = new nodeStatic.Server(webroot, {
  cache: false,
});

const server = http.createServer((req, res) => {
  req.on('end', () => {
    fileServer.serve(req, res, (err) => {
      if (err) {
        console.error(`Error serving ${req.url} - ${err.message}`);
        res.writeHead(err.status, err.headers);
        res.end();
      }
    });
  }).resume();
});

server.listen(port, () => {
  console.log(`\nTest page server running on http://localhost:${port}`);
});

process.on('SIGINT', () => {
  console.log('\nServer terminated');
  try {
    server.close(() => {
      process.exit(0);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
