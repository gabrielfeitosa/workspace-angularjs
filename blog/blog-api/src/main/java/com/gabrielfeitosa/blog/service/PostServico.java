package com.gabrielfeitosa.blog.service;

import java.net.URI;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;

import com.gabrielfeitosa.blog.business.PostBusiness;
import com.gabrielfeitosa.blog.entity.Comentario;
import com.gabrielfeitosa.blog.entity.Post;

@Path("/posts")
@Produces(MediaType.APPLICATION_JSON)
public class PostServico {

	private PostBusiness postBusiness;
	
	@PostConstruct
	public void init() {
		postBusiness = new PostBusiness();
	}
	
	@GET
	public List<Post> listar(){
		return postBusiness.listar();
	}
	
	@GET
	@Path("{id}")
	public Post recuperar(@PathParam("id") Long id){
		Post post = postBusiness.recuperar(id);
		if(post == null){
			throw new WebApplicationException(Status.NOT_FOUND);
		}
		return post;
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response cadastrar(Post post) {
		Post p = postBusiness.cadastrar(post);
		URI uri = UriBuilder.fromPath("posts/{id}").build(p.getId());
		return Response.created(uri).entity(p).build();
	}
	
	@PUT
	@Path("{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public void atualizar(@PathParam("id") Long id, Post post){
		post.setId(id);
		postBusiness.atualizar(post);
	}
	
	@DELETE
	@Path("{id}")
	public void deletar(@PathParam("id")Long id){
		postBusiness.deletar(id);
	}
	
	@POST
	@Path("{id}/comentario")
	public Response adicionarComentario(@PathParam("id") Long idPost, Comentario comentario){
		Comentario c = postBusiness.adicionarComentario(idPost, comentario);
		URI uri = UriBuilder.fromPath("posts/{id}").build(idPost);
		return Response.created(uri).entity(c).build();
	}
}
