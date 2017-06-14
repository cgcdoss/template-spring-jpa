/**
 * 
 */
var urlGeralUF = 'http://localhost:8080/template-spring-jpa/api/uf/';
var urlPorDescricao = urlGeralUF + 'pordescricao/';
var isInsertUf = false;
var isExclusaoUf = false;
var clique = 0;
var rowCount = 0;

var id = null;
var sigla = null;
var descricao = null;
var capital = null;
var regiao = null;
var dataCadastro = null;
var dataUltimaAtualizacao = null;

function limpaCamposUf(){
	var id = null;
	var sigla = null;
	var descricao = null;
	var capital = null;
	var regiao = null;
	var dataCadastro = null;
	var dataUltimaAtualizacao = null;
}

function limpaModalUf(){
	$('#id').val('');
	$('#sigla').val('');
	$('#descricao').val('');
	$('#regiao').val('');
	$('#capital').val('');
}

function getRodapeUf(){
	rowCount = $('.table tr').length - 1;
	var trCount = $('<tr/>');
	$(trCount).append('<td colspan="6"><b>Registros: ' + rowCount + '</b></td>')
	$('tbody').append(trCount);
}

function getUFs(){
	$.get(urlGeralUF, function(data, status, XHR){
		$('tbody').html('');
		$(data).each(function(i, elem){
			var tr = $('<tr/>');
			$(tr).append(`<td><button class="btn btn-warning fa fa-pencil" data-toggle="modal" data-target="#myModalUf" id="modalUf" title="Alterar essa UF"></button></td>`);
			$(tr).append(`<td id="idtable">${elem.id}</td>`);
			$(tr).append(`<td id="tdnome">${elem.sigla}</td>`);
			$(tr).append(`<td id="email">${elem.descricao}</td>`);
			$(tr).append(`<td id="email">${elem.regiao}</td>`);
			$(tr).append(`<td id="email">${elem.capital}</td>`);
			$('tbody').append(tr);
		});
		getRodapeUf();
	});
}

function pesquisarUf(){
	var descricao = $('#descricaopesquisa').val();
	console.log('Descrição: ' + descricao);
	$.get(urlPorDescricao + descricao, function(data, status, XHR){
		$('tbody').html('');
		$(data).each(function(i, elem){
			var tr = $('<tr/>');
			$(tr).append(`<td><button class="btn btn-warning fa fa-pencil" data-toggle="modal" data-target="#myModalUf" id="modalUf" title="Alterar essa UF"></button></td>`);
			$(tr).append(`<td id="idtable">${elem.id}</td>`);
			$(tr).append(`<td id="tdnome">${elem.sigla}</td>`);
			$(tr).append(`<td id="email">${elem.descricao}</td>`);
			$(tr).append(`<td id="email">${elem.regiao}</td>`);
			$(tr).append(`<td id="email">${elem.capital}</td>`);
			$('tbody').append(tr);
		});
		getRodapeUf();
	});
}

$(document).on("click", "#modalUf", function(){
	console.log('Entrou no Alterar');
	isInsertUf = false;
	isExclusaoUf = false;
	id = $(this).parent().parent().find("#idtable").text();
	$.get(urlGeralUF + id, function(data, status, XHR){
		id = `${data.id}`;
		sigla = `${data.sigla}`;
		descricao = `${data.descricao}`;
		regiao = `${data.regiao}`;
		capital = `${data.capital}`;
		$('#id').val(id);
		$('#sigla').val(sigla);
		$('#descricao').val(descricao);
		$('#regiao').val(regiao);
		$('#capital').val(capital);
	});
	$("#infoExclusaoUf").animate({
		height: 'hide'
    });
	$('#excluirUf').show();
	exclusaoOff();
	clique = 0;
 });

$(document).on("click", "#inclusao", function(){
	console.log('Entrou na Inclusão');
	isInsertUf = true;
	isExclusaoUf = false;
	limpaModalUf();
	limpaCamposUf();
	$("#infoExclusaoUf").animate({
		height: 'hide'
    });
	exclusaoOff();
	$('#excluirUf').hide();
	clique = 0;
});

$(document).on('click', '#cancelar', function(){
	console.log('Entrou no Cancelar');
	limpaModalUf();
	limpaCamposUf();
	clique = 0;
	isExclusaoUf = false;
	isInsertUf = false;
});

$(document).on('click', '#excluirUf', function(){
	isExclusaoUf = true;
	$("#infoExclusaoUf").animate({
		height: 'toggle'
	});
	if(clique % 2 == 0){
		exclusaoUfOn();
		clique = clique + 1;
		isExclusaoUf = true;
		console.log('Exclusão ativa');
	} else {
		exclusaoUfOff();
		clique = clique + 1;
		isExclusaoUf = false;
		console.log('Exclusão desativada');
	}
});

function exclusaoUfOff(){
	$('#salvarUf').text('Salvar ');
	$('#excluirUf').text('Excluir');
}

function exclusaoUfOn(){
	$('#salvarUf').text('Sim');
	$('#excluirUf').text('Não');
}

$(document).on('click','#salvarUf', function(){
	if(isExclusaoUf == false){
		if(isInsertUf == true){
			//SALVAR
			sigla = $("#sigla").val();
			descricao = $("#descricao").val();
			regiao = $('#regiao').val();
			capital = $('#capital').val();
			var uf = {
				sigla:sigla,
				descricao:descricao,
				regiao:regiao,
				capital:capital,
				dataCadastro:getData()
			}
			if(sigla == "" || descricao == ""){
				$('#modalinfo').modal('toggle');
				$('#label').html('Preencha todos os campos obrigatórios!');
				return false;
			}
			console.log('Salvando... ' +  JSON.stringify(uf));
			var settings = {
			  "crossDomain": true,
			  "url": urlGeralUF,
			  "method": "POST",
			  "error": function(data){
				  		popupInfo('Falha ao salvar.');
				},
				"success": function(data){
					popupInfo('Salvo com sucesso.');
					$('#myModalUf').modal('hide');
					getUFs();
					limpaCamposUf();
					limpaModalUf();
				},
			  "headers": {
			    "Content-type": "application/json",
			  },
			  "data":  JSON.stringify(uf)
			}
			$.ajax(settings).done(function (response) {
//			  console.log('Servidor diz: ' + response);
			});
		} else {
			//ALTERAR
			var id = $('#id').val();
			var novaSigla = $('#sigla').val();
			var novaDescricao = $('#descricao').val();
			var novaRegiao = $('#regiao').val();
			var novaCapital = $('#capital').val();
			var uf;
				uf = {
						id:id,
						sigla:novaSigla,
						descricao:novaDescricao,
						regiao:novaRegiao,
						capital:novaCapital,
						dataCadastro:dataCadastro,
						dataUltimaAtualizacao:getData()
				}
			console.log('Alterando... ' + JSON.stringify(uf));
			var settings = {
			  "async": true,
			  "crossDomain": true,
			  "url": urlGeralUF + id,
			  "method": "PUT",
			  "error": function(data){
				  		popupInfo('Falha ao salvar.');
				},
				"success": function(data){
					popupInfo('Salvo com sucesso.');
					$('#myModalUf').modal('hide');
					getUFs();
					limpaCamposUf();
					limpaModalUf();
				},
			  "headers": {
			    "content-type": "application/json",
			    "cache-control": "no-cache",
			  },
			  "processData": false,
			  "data": JSON.stringify(uf)
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
			"url": urlGeralUF + id,
			"method": "DELETE",
			"error": function(data){
		  		popupInfo('Falha ao excluir.');
			},
			"success": function(data){
				popupInfo('Exccluído com sucesso.');
				$('#myModalUf').modal('hide');
				getUFs();
				limpaCamposUf();
				limpaModalUf();
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
		isExclusaoUf = false;
	}
	clique = 0;
});
