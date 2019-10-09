'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
app.use(require('helmet')());

module.exports = app; // for testing

var config = {
	appRoot: __dirname // required config
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
	if (err) { throw err; }

	// Database connection
	const db = require('./middlewares/dbconnect');

	db.authenticate()
		.then(() => console.log('database connected'))
		.catch(err => console.log('error---', err));

	// install middleware
	swaggerExpress.register(app);


	var port = process.env.PORT || 10010;
	app.listen(port, () => {
		console.log('server started on http://127.0.0.1:' + port);
	});
});
