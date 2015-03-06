package com.gabrielfeitosa.blog.business;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.gabrielfeitosa.blog.entity.Comentario;

public class ComentarioBusiness {

	private static Map<Long, List<Comentario>> comentarios = new HashMap<Long, List<Comentario>>();
	
	public List<Comentario> listar(Long idPost){
		return comentarios.get(idPost);
	}
	
	public Comentario cadastrar(Long idPost, Comentario comentario){
		comentario.setData(new Date());
		List<Comentario> l = comentarios.get(idPost);
		if(l == null){
			l = new ArrayList<Comentario>();
		}
		l.add(comentario);
		comentarios.put(idPost, l);
		return comentario;
	}
	
	public void remover(Long idPost){
		comentarios.remove(idPost);
	}
	
}
