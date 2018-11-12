var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(){
	console.log("Importou módulo express.js");	
	var app = express();

	// Middle-ware para recursos estáticos;
	app.use(express.static('./app/public'));

	app.set('view engine', 'ejs');
	app.set('views','./app/views');

	// Middle-ware da aplicação
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(expressValidator());

	load('routes',{cwd: 'app'})
		.then('infra')
		.into(app);

	return app;
}