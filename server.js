var express  = require('express'),
    app      = express(),
    request  = require("request"),
    Readable = require('stream').Readable,
    uuidV4   = require('uuid/v4'),
    validUrl = require('valid-url'),
    rs       = Readable();

var csv2json = require("./libs/csv2json.js");

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

  // check file input
  if( req.params.q == null || req.params.q   == "" ){

    res.status(500).send("Bad Parameters Supplied");
    return;
  }


  // get csv file and update json
  request.get(req.query.q, function (error, response, body) {

    // check error and responce state
    if (!error && response.statusCode == 200) {

        var convertedJson = csv2json.convert( body );

        var fileUUid = uuidV4();

        res.writeHead(200, {
          'Content-Type': 'text/json',
          "Content-Disposition": "attachment; filename=Josn-" + fileUUid + ".json"
        });
        res.end( convertedJson );
        return;
    }
    else {

      res.status(response.statusCode).send(body)
      next();
      return;
    }
  });
}