var express = require('express')
var app = express()

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log(`Ice Candy listening on port ${port}!`);
});
