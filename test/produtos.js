var express = require('../config/express')();
var request = require('supertest')(express);

describe('#ProdutosController',function(){

	beforeEach(function(done){
		var conn = express.infra.connectionFactory();
		conn.query("delete from livros",function(ex, result){
			if(!ex) 
				done();
		});
	});

	// listagem JSON
	it('#listagem JSON',function(done){
		request.get('/produtos')
		.set('Accept','application/json')
		.expect('Content-Type',/json/)
		.expect(200, done);
	});

	it('#Cadastro de novo produto com dados inválidos.', function(done){
		request.post('/produtos')
		.send({
			titulo: '',
			descricao: ''
		})
		.expect(400,done);
	});

	it('#Cadastro de novo produto com dados válidos.', function(done){
		request.post('/produtos')
		.send({
			titulo: 'Conhecendo o Adobe Photoshop CS6',
			descricao: 'O autor Tárcio Zemel explica, passo a passo, para quem não possui nenhuma experiência com Photoshop, os segredos de edição de imagens, aplicação de filtros, organização de trabalho com camadas, aplicação de máscaras, ajustes de tons de cores, seleções avançadas e muito mais.',
			preco: 29.90
		})
		.expect(302,done);
	})
});