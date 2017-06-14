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

import br.com.template.model.pessoa.Pessoa;
import br.com.template.model.uf.UnidadeFederativa;
import br.com.template.model.uf.UnidadeFederativaRepository;
import br.com.template.model.uf.UnidadeFederativaValidator;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(value = "/uf")
public class UnidadeFederativaController {
	
	private UnidadeFederativaRepository UnidadesFederativas;
	
	@Autowired
	public UnidadeFederativaController(UnidadeFederativaRepository UnidadeFederativas) {
		this.UnidadesFederativas = UnidadeFederativas;
	}
	
	@InitBinder("UnidadeFederativa")
	protected void initBinder(WebDataBinder binder) {
	    binder.addValidators(new UnidadeFederativaValidator(UnidadesFederativas));
	}
	
	@RequestMapping(method=RequestMethod.POST)
	public void post(@Valid @RequestBody UnidadeFederativa UnidadeFederativa){
		UnidadesFederativas.save(UnidadeFederativa);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public void put(@Valid @RequestBody UnidadeFederativa UnidadeFederativa, @PathVariable Long id){
		UnidadesFederativas.save(UnidadeFederativa);
	}
	
	@RequestMapping( method = RequestMethod.GET)
	public List<UnidadeFederativa> get(){
		return UnidadesFederativas.findAll();
	}
	
	@RequestMapping(value = "/pordescricao/{descricao}", method = RequestMethod.GET)
	public List<UnidadeFederativa> getPorDescricao(@PathVariable String descricao){
		return UnidadesFederativas.findByDescricaoContainingIgnoreCase(descricao);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public UnidadeFederativa get(@PathVariable Long id){
		return UnidadesFederativas.findOne(id);
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable Long id){
		UnidadesFederativas.delete(id);
	}
	
}
