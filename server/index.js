const express = require('express');
let app = express();
const router = require('./router.js').router;

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({extended: false}));
app.use(router);

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

