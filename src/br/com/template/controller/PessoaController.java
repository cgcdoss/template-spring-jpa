package br.com.template.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.bind.annotation.CrossOrigin;

import br.com.template.model.pessoa.Pessoa;
import br.com.template.model.pessoa.PessoaRepository;
import br.com.template.model.pessoa.PessoaValidator;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/pessoa")
public class PessoaController {
	
	private PessoaRepository pessoas;
	
	@Autowired
	public PessoaController(PessoaRepository pessoas) {
		this.pessoas = pessoas;
	}
	
	@InitBinder("pessoa")
	protected void initBinder(WebDataBinder binder) {
	    binder.addValidators(new PessoaValidator(pessoas));
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public void post(@Valid @RequestBody Pessoa pessoa){
		pessoas.save(pessoa);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void put(@Valid @RequestBody Pessoa pessoa, @PathVariable Long id){
		pessoas.save(pessoa);
	}
	
	@RequestMapping( method = RequestMethod.GET)
	public List<Pessoa> get(){
		return pessoas.findAll();
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Pessoa get(@PathVariable Long id){
		return pessoas.findOne(id);
	}
	
	@RequestMapping(value = "/pornome/{nome}", method = RequestMethod.GET)
	public List<Pessoa> getPorNome(@PathVariable String nome){
		return pessoas.findByNomeContainingIgnoreCase(nome);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable Long id){
		pessoas.delete(id);
	}
	
}