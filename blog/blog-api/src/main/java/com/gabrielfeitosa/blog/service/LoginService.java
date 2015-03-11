package com.gabrielfeitosa.blog.service;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.gabrielfeitosa.blog.entity.Usuario;

@Path("/auth")
public class LoginService {
	
	@POST
	@Path("/login")
	@Produces(MediaType.APPLICATION_JSON)
	public Usuario login(@FormParam("email")String email, @FormParam("senha")String senha){
		return new Usuario("Gabriel","gabrielfeitosa");
	}
	
	@POST
	@Path("/logout")
	public void logout(@Context HttpServletRequest req){
		req.getSession().invalidate();
	}

}
