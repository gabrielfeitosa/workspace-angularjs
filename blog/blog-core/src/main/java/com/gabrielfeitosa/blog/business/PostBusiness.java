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
	private ComentarioBusiness comentarioBusiness = new ComentarioBusiness();
	private static Long idContadorPost = 1l;

	{
		for (;idContadorPost < 5; ++idContadorPost) {
			Post p = new Post(idContadorPost,"usuario"+idContadorPost,"Post "+idContadorPost, "Texto Post "+idContadorPost);
			p.setDataRegistro(new Date());
			posts.put(idContadorPost,p);
			for(long i =0; i < random(); i++){
				comentarioBusiness.cadastrar(idContadorPost, new Comentario("userComent"+i, "comentario "+i,new Date()));
			}
		}
	}
	
	private static int random(){
		return new Random().nextInt(10);
	}
	
	private Long novoId(){
		return ++idContadorPost;
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
		comentarioBusiness.remover(id);
		return posts.remove(id);
	}
	
	public Comentario adicionarComentario(Long idPost, Comentario comentario){
		return comentarioBusiness.cadastrar(idPost, comentario);
	}
}
