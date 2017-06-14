/**
 * 
 */

var urlGeral = 'http://localhost:8080/template-spring-jpa/api/pessoa/';
var urlPorNome = urlGeral + 'pornome/';
var isInsert = false;
var isExclusao = false;
var clique = 0;
var rowCount = 0;

var id = null;
var nome = null;
var email = null;
var dataCadastro = null;
var dataUltimaAtualizacao = null;

var cep = null;
var cidade = null;
var bairro = null;
var rua = null;
var numero = null;

function getData(){
	var now = new Date;
	return  now.getDate() + '/' + (now.getMonth() + 1) + '/' +  + now.getFullYear();
}

function limpaCampos(){
	pessoa = null;
	nome = null;
	id = null;
	email = null;
	dataCadastro = null;
	dataUltimaAtualizacao = null;
	cep = null;
	cidade = null;
	bairro = null;
	rua = null;
	numero = null;
	uf = null;
}

function limpaModal(){
	$('#id').val('');
	$('#nomemodal').val('');
	$('#emailmodal').val('');
	$('#cep').val('');
	$('#cidade').val('');
	$('#bairro').val('');
	$('#rua').val('');
	$('#numero').val('');
	$('#uf').val(1);
}

function getRodape(){
	rowCount = $('.table tr').length - 1;
	var trCount = $('<tr/>');
	$(trCount).append('<td colspan="5"><b>Registros: ' + rowCount + '</b></td>')
	$('tbody').append(trCount);
}

function get(){
	$.get(urlGeral, function(data, status, XHR){
		$('tbody').html('');
		$(data).each(function(i, elem){
			var tr = $('<tr/>');
			$(tr).append(`<td><button class="btn btn-warning fa fa-pencil" data-toggle="modal" data-target="#myModal" id="modal" title="Alterar essa pessoa"></button></td>`);
			$(tr).append(`<td id="idtable">${elem.id}</td>`);
			$(tr).append(`<td id="tdnome">${elem.nome}</td>`);
			$(tr).append(`<td id="email">${elem.email}</td>`);
			$(tr).append(`<td id="cidade">${elem.endereco.cidade}</td>`);
			$('tbody').append(tr);
//			$('[title]').tooltip();
		});
		getRodape();
	});
	
	$.get('http://localhost:8080/template-spring-jpa/api/uf', function(data, status, XHR){
		$(data).each(function(i, elem){
			$('#uf').append(`<option value="${elem.id}">${elem.sigla}</option>`);
		});
	});
}

function pesquisar(){
	var nome = $("#nomepesquisa").val();
	console.log('Nome: ' + nome);
	if(!nome == ''){
		$.get(urlPorNome + nome, function(data, status, XHR){
			$('tbody').html('');
			$(data).each(function(i, elem){
				var tr = $('<tr/>');
				$(tr).append(`<td><button class="btn btn-warning fa fa-pencil" data-toggle="modal" data-target="#myModal" id="modal" title="Alterar essa pessoa"></button></td>`);
				$(tr).append(`<td id="idtable">${elem.id}</td>`);
				$(tr).append(`<td id="tdnome">${elem.nome}</td>`);
				$(tr).append(`<td id="email">${elem.email}</td>`);
				$(tr).append(`<td id="email">${elem.endereco.cidade}</td>`);
				$('tbody').append(tr);
				rowCount = $('.table tr').length;
			});
			getRodape();
		});	
	} else {
		$('#modalinfo').modal('toggle');
		$('#label').html('Nome em branco');
	}
}

function exclusaoOff(){
	$('#salvar').text('Salvar ');
	$('#excluir').text('Excluir');
}

function exclusaoOn(){
	$('#salvar').text('Sim');
	$('#excluir').text('Não');
}

function validarEmail(){
	var email = $('#emailmodal').val();
	var emailFilter=/^.+@.+\..{2,}$/;
	var illegalChars= /[\(\)\<\>\,\;\:\\\/\"\[\]]/ 
	if(!(emailFilter.test(email))||email.match(illegalChars)){
//		alert('Informe um email valido!');
		return false;
	} else {
		return true;
	}
}

function popupInfo(texto){
	$('#modalinfo').modal('toggle');
	$('#label').html(texto);
}

$(document).on("click", "#modal", function(){
	console.log('Entrou no Alterar');
	isInsert = false;
	isExclusao = false;
	id = $(this).parent().parent().find("#idtable").text();
	$.get(urlGeral + id, function(data, status, XHR){
		id = `${data.id}`;
		nome = `${data.nome}`;
		email = `${data.email}`;
		cep = `${data.endereco.cep}`;
		cidade = `${data.endereco.cidade}`;
		bairro = `${data.endereco.bairro}`;
		rua = `${data.endereco.rua}`;
		numero = `${data.endereco.numero}`;
		dataCadastro = `${data.dataCadastro}`;
		uf = `${data.endereco.uf.id}`;
		$('#id').val(id);
		$('#nomemodal').val(nome);
		$('#emailmodal').val(email);
		$('#cep').val(cep);
		$('#cidade').val(cidade);
		$('#bairro').val(bairro);
		$('#rua').val(rua);
		$('#numero').val(numero);
		$('#uf').val(uf);
	});
	$("#infoexclusao").animate({
		height: 'hide'
    });
	$('#excluir').show();
	exclusaoOff();
	clique = 0;
 });
		 
$(document).on("click", "#inclusao", function(){
	console.log('Entrou na Inclusão');
	isInsert = true;
	isExclusao = false;
	limpaModal();
	$("#infoexclusao").animate({
		height: 'hide'
    });
	exclusaoOff();
	$('#excluir').hide();
	clique = 0;
});

$(document).on('click', '#cancelar', function(){
	console.log('Entrou no Cancelar');
	limpaModal();
	limpaCampos();
	clique = 0;
	isExclusao = false;
	isInsert = false;
});

$(document).on('click', '#excluir', function(){
	isExclusao = true;
	$("#infoexclusao").animate({
		height: 'toggle'
	});
	if(clique % 2 == 0){
		exclusaoOn();
		clique = clique + 1;
		isExclusao = true;
		console.log('Exclusão ativa');
	} else {
		exclusaoOff();
		clique = clique + 1;
		isExclusao = false;
		console.log('Exclusão desativada');
	}
});

$(document).on('click','#salvar', function(){
	if(isExclusao == false){
		if(isInsert == true){
			//SALVAR
			nome = $("#nomemodal").val();
			email = $("#emailmodal").val();
			cep = $('#cep').val();
			cidade = $('#cidade').val();
			bairro = $('#bairro').val();
			rua = $('#rua').val();
			numero = $('#numero').val();
			uf = $('#uf').val()
			var pessoa = {
				nome:nome,
				email:email,
				endereco:{
					cep:cep,
					cidade:cidade,
					bairro:bairro,
					rua:rua,
					numero:numero,
					uf:{
						id:uf
					}
				},
				dataCadastro:getData()
			}
			if(nome == "" || email == "" || cep == ""){
				$('#modalinfo').modal('toggle');
				$('#label').html('Preencha todos os campos obrigatórios!');
				return false;
			}
			console.log('Salvando... ' +  JSON.stringify(pessoa));
			var settings = {
			  "crossDomain": true,
			  "url": urlGeral,
			  "method": "POST",
			  "error": function(data){
				  	if(!validarEmail()){
						popupInfo('Falha ao salvar. Email inválido.');
				  	} else {
				  		popupInfo('Falha ao salvar.');
				  	}
				},
				"success": function(data){
					popupInfo('Salvo com sucesso.');
					$('#myModal').modal('hide');
					get();
					limpaCampos();
					limpaModal();
				},
			  "headers": {
			    "Content-type": "application/json",
			  },
			  "data":  JSON.stringify(pessoa)
			}
			$.ajax(settings).done(function (response) {
//			  console.log('Servidor diz: ' + response);
			});
		} else {
			//ALTERAR
			var id = $('#id').val();
			var novoNome = $('#nomemodal').val();
			var novoEmail = $('#emailmodal').val();
			var novoCep = $('#cep').val();
			var novoCidade = $('#cidade').val();
			var novoBairro = $('#bairro').val();
			var novaRua = $('#rua').val();
			var novoNumero = $('#numero').val();
			var novaUf = $('#uf').val();
			var pessoa;
				pessoa = {
						id:id,
						nome:novoNome,
						email:novoEmail,
						endereco:{
							cep:novoCep,
							cidade:novoCidade,
							bairro:novoBairro,
							rua:novaRua,
							numero:novoNumero,
							uf:{
								id:novaUf
							}
						},
						dataCadastro:dataCadastro,
						dataUltimaAtualizacao:getData()
				}
			console.log('Alterando... ' + JSON.stringify(pessoa));
			var settings = {
			  "async": true,
			  "crossDomain": true,
			  "url": urlGeral + id,
			  "method": "PUT",
			  "error": function(data){
				  	if(!validarEmail()){
						popupInfo('Falha ao salvar. Email inválido.');
				  	} else {
				  		popupInfo('Falha ao salvar.');
				  	}
				},
				"success": function(data){
					popupInfo('Salvo com sucesso.');
					$('#myModal').modal('hide');
					get();
					limpaCampos();
					limpaModal();
				},
			  "headers": {
			    "content-type": "application/json",
			    "cache-control": "no-cache",
			  },
			  "processData": false,
			  "data": JSON.stringify(pessoa)
			}
			$.ajax(settings).done(function (response) {
//				console.log('Servidor diz: ' + response);
//				$('.dadosbasicos').attr('class', 'active');
//				$('.endereco').attr('class', this);
			});
		}
	} else {
		//EXCLUIR
		id = $('#id').val();
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": urlGeral + id,
			"method": "DELETE",
			"error": function(data){
		  		popupInfo('Falha ao excluir.');
			},
			"success": function(data){
				popupInfo('Exccluído com sucesso.');
				$('#myModal').modal('hide');
				get();
				limpaCampos();
				limpaModal();
			},
			"headers": {
			  "content-type": "application/json",
			  "cache-control": "no-cache",
			}
		}
		$.ajax(settings).done(function (response) {
			console.log(response);
		});
		$("#infoexclusao").animate({
			height: 'hide'
	    });
		exclusaoOff();
		isExclusao = false;
	}
	clique = 0;
});
