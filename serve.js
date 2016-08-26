var express = require('express');
var serve = express();
serve.use(express.static(__dirname + '/examples'));
serve.use(express.static(__dirname + '/dist'));
serve.set('port', (process.env.PORT || 2342));
serve.listen(serve.get('port'), function () {
  console.log('Node app of tox-bootstrap-electron is running at localhost:' + serve.get('port'));
});
