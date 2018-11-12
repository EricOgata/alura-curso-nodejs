var app = require('./config/express')();
var http = require('http').Server(app);
var porta 	= 3000;
var io = require('socket.io')(http);

app.set('io',io);

io.on('connection',function(socket){
	console.log("um usuário se conectou no sistema");
});

http.listen(porta, function(){
	console.log("Servidor Rodando");
});
