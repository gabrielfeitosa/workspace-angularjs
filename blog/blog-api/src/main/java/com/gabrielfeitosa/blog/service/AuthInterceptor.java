package com.gabrielfeitosa.blog.service;

import java.io.IOException;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
 
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Context;
import javax.ws.rs.ext.Provider;
 
@Named
@Provider
public class AuthInterceptor implements ContainerRequestFilter {
    
	@Context
    private HttpServletRequest servletRequest;
 
    public void filter(ContainerRequestContext requestContext) throws IOException {
         
        HttpSession session = servletRequest.getSession(false);
        if (session == null) {
        	session = servletRequest.getSession(true);
        }
    }
}