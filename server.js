/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');
const compiler = webpack(config);

new WebpackDevServer(compiler, config.devServer)
  .listen(config.port, '192.168.1.104', (err) => {
    if (err) {
      console.log(err);
    }
    console.log('Listening at localhost:' + config.port);
  });




  open('http://localhost:' + config.port + '/');

