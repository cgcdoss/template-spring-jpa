package br.com.template.model.endereco;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Email;
import org.hibernate.validator.constraints.Length;

import br.com.template.model.Modelo;
import br.com.template.model.uf.UnidadeFederativa;

@Embeddable
public class Endereco{
	
	@Length(max=4)
	private String numero;
	
	@Length(max=80)
	private String rua;
	
	@Length(max=100)
	private String bairro;
	
	@Length(max=80)
	private String cidade;
	
	@Length(max=8)
	private String cep;
	
	@ManyToOne
	private UnidadeFederativa uf;

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getRua() {
		return rua;
	}

	public void setRua(String rua) {
		this.rua = rua;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public UnidadeFederativa getUf() {
		return uf;
	}

	public void setUf(UnidadeFederativa uf) {
		this.uf = uf;
	}
	
}