package br.com.template.model.uf;

import javax.persistence.Entity;
import javax.validation.constraints.NotNull;

import br.com.template.model.Modelo;

@Entity
public class UnidadeFederativa extends Modelo {

	@NotNull
	private String sigla;
	private String descricao;
	private String capital;
	private String regiao;

	public String getSigla() {
		return sigla;
	}

	public void setSigla(String sigla) {
		this.sigla = sigla;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getCapital() {
		return capital;
	}

	public void setCapital(String capital) {
		this.capital = capital;
	}

	public String getRegiao() {
		return regiao;
	}

	public void setRegiao(String regiao) {
		this.regiao = regiao;
	}
	
}
