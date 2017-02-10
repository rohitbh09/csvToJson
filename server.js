var express = require('express'),
    app     = express(),
    request = require("request");

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
});

// get request start here
app.get('/convert/csv/to/json', csv2Json);

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
});


// api function defination start here
function csv2Json(req, res, next) {

  // get csv file and update json
  request.get(req.query.q, function (error, response, body) {

    if (!error && response.statusCode == 200) {

        var csv = body;
        res.send(200,csv);
        next();
        return;
    }
    else {

      res.status(response.statusCode).send(body)
      next();
      return;
    }

  });
}