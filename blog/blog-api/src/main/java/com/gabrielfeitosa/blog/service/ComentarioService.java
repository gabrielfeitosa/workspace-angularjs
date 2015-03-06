package com.gabrielfeitosa.blog.service;

import java.net.URI;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import com.gabrielfeitosa.blog.business.ComentarioBusiness;
import com.gabrielfeitosa.blog.entity.Comentario;

@Path("/posts/{idPost}/comentarios")
@Produces(MediaType.APPLICATION_JSON)
public class ComentarioService {

	private ComentarioBusiness comentarioBusiness;
	
	@PostConstruct
	public void init() {
		comentarioBusiness = new ComentarioBusiness();
	}
	
	@GET
	public List<Comentario> listar(@PathParam("idPost") Long idPost){
		return comentarioBusiness.listar(idPost);
	}
	
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response cadastrar(@PathParam("idPost")Long idPost, Comentario comentario) {
		Comentario c = comentarioBusiness.cadastrar(idPost, comentario);
		URI uri = UriBuilder.fromPath("/posts/{idPost}/comentarios").build(idPost);
		return Response.created(uri).entity(c).build();
	}
	
}
