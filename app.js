var configura = require('./config/express');
var app = configura();
var porta 	= 3000;

app.listen(porta, function(){
	console.log("Servidor Rodando");
});
