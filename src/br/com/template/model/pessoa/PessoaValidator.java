package br.com.template.model.pessoa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class PessoaValidator implements Validator{

	private PessoaRepository repository;
	
	@Autowired
	public PessoaValidator(PessoaRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public boolean supports(Class<?> clazz) {
		return Pessoa.class.equals(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		
	}

}
