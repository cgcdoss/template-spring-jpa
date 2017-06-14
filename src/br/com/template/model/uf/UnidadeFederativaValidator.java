package br.com.template.model.uf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

public class UnidadeFederativaValidator implements Validator{

	private UnidadeFederativaRepository repository;
	
	@Autowired
	public UnidadeFederativaValidator(UnidadeFederativaRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public boolean supports(Class<?> clazz) {
		return UnidadeFederativa.class.equals(clazz);
	}

	@Override
	public void validate(Object target, Errors errors) {
		
	}

}
