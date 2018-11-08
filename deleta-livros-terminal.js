var http = require('http');


var idProduto = 11;

var configuracoes = {
	hostname:'localhost',
	port:3000,
	path:'/produtos/'+idProduto,
	method: 'DELETE',
	headers:{
		'Accept':'application/json',
		'Content-type':'application/json'
	}
};

var client = http.request(configuracoes, function(res){
	console.log(res.statusCode);
	res.on('data', function(body){
		console.log('Corpo:' + body);
	});
});

// var produto = {
// 	id: 11,
// 	titulo: 'Introdução e boas práticas em UX Design',
// 	descricao: 'Neste livro, Fabricio Teixeira mostra com exemplos práticos e reais de sucesso e insucesso de diferentes sites quais são as boas práticas e os pilares para conseguir construir um de uso agradável.',
// 	preco: 29.90
// };

client.end();