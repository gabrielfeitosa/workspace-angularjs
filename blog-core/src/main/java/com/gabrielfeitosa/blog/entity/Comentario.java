package com.gabrielfeitosa.blog.entity;

import java.io.Serializable;



public class Comentario implements Serializable{

	private static final long serialVersionUID = 1L;

	private String usuario;
	private String texto;

	public Comentario() {}
	
	public Comentario(String usuario, String texto) {
		super();
		this.usuario = usuario;
		this.texto = texto;
	}

	public String getUsuario() {
		return usuario;
	}
	public String getTexto() {
		return texto;
	}
	
}
