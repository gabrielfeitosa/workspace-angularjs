package com.gabrielfeitosa.blog.entity;

import java.io.Serializable;



public class Usuario implements Serializable{

	private static final long serialVersionUID = 1L;

	private String nome;
	private String login;
	
	public Usuario() {}
	
	public Usuario(String nome,String login) {
		this.nome = nome;
		this.login = login;
	}
	
	public final String getNome() {
		return nome;
	}
	
	public final String getLogin() {
		return login;
	}
}
