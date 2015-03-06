package com.gabrielfeitosa.blog.entity;


import java.io.Serializable;
import java.util.Date;

public class Post extends EntidadeBase implements Serializable{

	private static final long serialVersionUID = 1L;

	private String usuario;
	private String titulo;
	private String texto;
	private Date dataRegistro;

	public Post(){}
	
	public Post(Long id, String usuario, String titulo, String texto) {
		setId(id);
		this.usuario = usuario;
		this.titulo = titulo;
		this.texto = texto;
	}
	
	public String getTitulo() {
		return titulo;
	}

	public String getTexto() {
		return texto;
	}

	public String getUsuario() {
		return usuario;
	}

	public final Date getDataRegistro() {
		return dataRegistro;
	}
	
	public void setDataRegistro(Date dataRegistro) {
		this.dataRegistro = dataRegistro;
	}
}
