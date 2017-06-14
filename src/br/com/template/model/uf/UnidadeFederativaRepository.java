package br.com.template.model.uf;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UnidadeFederativaRepository extends JpaRepository<UnidadeFederativa, Long>{

	List<UnidadeFederativa> findByDescricaoContainingIgnoreCase(String descricao);
	
}
