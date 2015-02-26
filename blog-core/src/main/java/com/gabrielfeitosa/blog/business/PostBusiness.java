package com.gabrielfeitosa.blog.business;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import com.gabrielfeitosa.blog.entity.Comentario;
import com.gabrielfeitosa.blog.entity.Post;

public class PostBusiness {

	private static Map<Long, Post> posts = new HashMap<Long, Post>();
	private static Long idContador = 1l;
	{
		for (;idContador < 5; ++idContador) {
			Post p = new Post(idContador,"usuario"+idContador,"Post "+idContador, "Texto Post "+idContador);
			p.setDataRegistro(new Date());
			for(long i =0; i < random(); i++){
				p.addComentario(new Comentario("userComent"+i, "comentario "+i));
			}
			posts.put(idContador,p);
		}
	}
	
	private static int random(){
		return new Random().nextInt(10);
	}
	
	private Long novoId(){
		return ++idContador;
	}
	
	public List<Post> listar(){
		return new ArrayList<Post>(posts.values());
	}
	
	public Post recuperar(Long id){
		return posts.get(id);
	}
	
	public Post cadastrar(Post post){
		Long id = novoId();
		post.setId(id);
		post.setDataRegistro(new Date());
		posts.put(id, post);
		return posts.get(id);
	}
	
	public Post atualizar(Post post){
		if(post.getId() == null){
			return cadastrar(post);
		}
		posts.put(post.getId(), post);
		return post;
	}
	
	public Post deletar(Long id){
		return posts.remove(id);
	}
	
	public Comentario adicionarComentario(Long idPost, Comentario comentario){
		posts.get(idPost).addComentario(comentario);
		return comentario;
	}
}
