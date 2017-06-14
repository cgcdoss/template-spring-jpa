package br.com.template.model.pessoa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
	
	List<Pessoa> findByNomeContainingIgnoreCase(String nome);
	
}
