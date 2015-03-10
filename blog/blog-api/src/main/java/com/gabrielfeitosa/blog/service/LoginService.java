package com.gabrielfeitosa.blog.service;

import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.gabrielfeitosa.blog.entity.Usuario;

@Path("/login")
@Produces(MediaType.APPLICATION_JSON)
public class LoginService {
	
	@POST
	public Usuario login(@FormParam("email")String email, @FormParam("senha")String senha){
		return new Usuario("Gabriel","gabrielfeitosa");
	}

}
