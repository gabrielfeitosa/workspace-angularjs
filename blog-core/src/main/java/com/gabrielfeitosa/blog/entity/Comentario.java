package com.gabrielfeitosa.blog.entity;

import java.io.Serializable;
import java.util.Date;



public class Comentario implements Serializable{

	private static final long serialVersionUID = 1L;

	private String usuario;
	private String texto;
	private Date data;
	
	public Comentario() {}
	
	public Comentario(String usuario, String texto,Date data) {
		super();
		this.usuario = usuario;
		this.texto = texto;
		this.data = data;
	}

	public String getUsuario() {
		return usuario;
	}
	public String getTexto() {
		return texto;
	}

	public final Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}
	
	
}
