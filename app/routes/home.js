module.exports = function(app){
	app.get('/',function(req, res){
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.lista(function(err, results){
			res.render('home/index',{livros:results});
		});
		connection.end();
	});
}