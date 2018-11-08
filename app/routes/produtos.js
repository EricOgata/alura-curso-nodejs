
module.exports = function(app){

	app.get("/produtos", function(req, res, next){
		console.log("Acessou /produtos em " + timeNow());

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.lista(function(err, results){
			if(err){
				return next(err);
			}
			res.format({
				html: function(){
					res.render('produtos/lista',{lista:results});
				},
				json: function(){
					res.json(results);
				}
			});			
		});
		connection.end();
	});

	app.get('/produtos/form',function(req, res){
		console.log("Acessou /form em " + timeNow());
		res.render("produtos/form", {errosValidacao: {}, produto:{} } );
	});

	app.post('/produtos',function(req, res){
		console.log("Acessou /salva em " + timeNow());

		var produto = req.body;
		
		req.assert('titulo', 'Título é obrigatório').notEmpty();
		req.assert('preco','Formato Inváildo').isFloat();

		var erros = req.validationErrors();

		if(erros){

			res.format({
				html: function(){
					res.status(400).render('produtos/form',{errosValidacao:erros, produto:produto});
				},
				json: function(){
					res.status(400).json(erros);
				}
			});
			return;
		}

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.salva(produto, function(err, results){
			console.log(err);
			res.redirect("/produtos");
		});

		connection.end();
	});

	app.delete('/produtos/:id',function(req, res){
		console.log("Acessou /deleta em " + timeNow());

		var produto = req.params;
		console.log(produto);

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		produtosDAO.deleta(produto, function(err, results){
			console.log(err);
			res.redirect("/produtos");
		});

		connection.end();

	});
}

function timeNow(){
	var today = new Date();
	var hh = today.getHours();
	var minutes = today.getMinutes();
	if(minutes < 10) minutes = "0"+minutes;
	var seconds = today.getSeconds();
	if(seconds < 10) seconds = "0"+seconds;
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	return dd+'/'+mm+'/'+yyyy+' '+hh+':'+minutes+':'+seconds;
}
