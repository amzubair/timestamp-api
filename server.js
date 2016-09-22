var express = require('express');
var app = express();
var moment = require('moment');

// get date or unix timestamp from user
// parse the user data into date
// return unix date and natural date to user in json format

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

app.get('/timestamp/:datestring', function(req, res) {
      var myDate;
  if(/^\d{8,}$/.test(req.params.datestring)) {
    myDate = moment(req.params.datestring, "X");
  } else {
    myDate = moment(req.params.datestring, "MMMM D, YYYY");
  }

  if(myDate.isValid()) {
    res.json({
      unix: myDate.format("X"),
      natural: myDate.format("MMMM D, YYYY")
    });
  } else {
    res.json({
      unix: null,
      natural: null
    });
  }
})

app.get('/', function (req, res) {
  res.sendFile('Hello World!');
});



app.listen(port, function () {
  console.log('Example app listening on port:' + port);
});