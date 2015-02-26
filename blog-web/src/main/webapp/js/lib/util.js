function cortarTexto(txt){
	if(txt.length > 500){
		return txt.substring(0,500)+' ...';
	}
	return txt;
}