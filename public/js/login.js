function muestraLogin() {
    var divTexto = document.getElementById("divTexto");
    var divDesliza = document.getElementById("divDesliza");
    var sectionLogin = document.getElementById("sectionLogin");
    var sectionRegistrarse = document.getElementById("sectionRegistrarse");
    var regProducto = document.getElementById("regProducto");
    var divParentAbsoluto = document.getElementById('parentAbsoluto');
    var welcome = document.getElementById('welcome');
    //aquí debe poner el login en display:none y el welcome en block
    //ya está el json cargado con la información, por si necesitas sacar algo
    if (divTexto.style.display === "flex" || divParentAbsoluto.style.display === "flex" ||
        regProducto.style.display === "flex" || sectionRegistrarse.style.display === "flex" ||
        welcome.style.display === "flex") {
        welcome.style.display = "none";
        divTexto.style.display = "none";
        sectionLogin.style.display = "flex";
        divParentAbsoluto.style.display = "none";
        sectionRegistrarse.style.display = "none";
        regProducto.style.display = "none";
        divDesliza.style.display = "none";
    }
}

function cambiaForms(){
    var sectionLogin=document.getElementById("sectionLogin");
    var sectionRegistrarse=document.getElementById("sectionRegistrarse");
    var divDesliza = document.getElementById("divDesliza");
    if(sectionLogin.style.display==="flex"){
        sectionLogin.style.display="none";
        divDesliza.style.display = "none";
        sectionRegistrarse.style.display="flex";
        document.getElementById("formLogin").reset();
    }else{
        sectionLogin.style.display="flex";
        sectionRegistrarse.style.display="none";
        divDesliza.style.display = "none";
    }
}

function llamaLogin(cuentaUsuario, contrasenia){
	var request = new XMLHttpRequest();
	var url = "https://cosmeticosu2.dev/api/login";
	var sQueryString="";

	if (cuentaUsuario=="" || contrasenia==""){
		alert("Faltan datos para el ingreso");
	}else{
		sQueryString="cuentaUsuario="+cuentaUsuario+"&contrasenia="+contrasenia;
		request.onreadystatechange=function() {
			if (request.readyState === 4 && request.status === 200) {
			    loaderLogin.style.display = "none";
				procesaLogin(request.responseText);
			}else{
				if (request.status != 200 &&request.status != 0){
					var msj = JSON.parse(request.responseText);
					alert(msj.mensaje);
                    loaderLogin.style.display = "none";
				}
			}
		};
		request.open("POST", url, true);
		request.setRequestHeader("Content-type",
		"application/x-www-form-urlencoded");
		request.send(sQueryString);

		loaderLogin.style.display = "flex";
	}
}

function verificaStorage(nombre, tipoUsuario) {
    var divTexto = document.getElementById("divTexto");
    var divWelcome1=document.getElementById("welcome");
    var navmen = document.getElementById("sp");
    var logout = document.getElementById("logout");
    var sectionLogin = document.getElementById("sectionLogin");
    var sectionRegistrarse = document.getElementById("sectionRegistrarse");
    var ml = document.getElementById("muestraLogin");

    logout.style.display="flex";
    navmen.innerHTML=nombre;
    if(tipoUsuario=='A'){
    	var regProd = document.getElementById('regProd');
    	regProd.style.display = "flex";
    }
    ml.href="#";
    divTexto.style.display="none";
    sectionLogin.style.display="none";
    sectionRegistrarse.style.display="none";
    divWelcome1.style.display="flex";
    sectionLogin.style.display="none";
    sectionRegistrarse.style.display="none"
}

function procesaLogin(textoRespuesta){
    var datos = JSON.parse(textoRespuesta);
	var divWelcome1=document.getElementById("welcome");
	var navmen = document.getElementById("sp");
	var logout = document.getElementById("logout");
    var sectionLogin = document.getElementById("sectionLogin");
	var sectionRegistrarse = document.getElementById("sectionRegistrarse");
	var ml = document.getElementById("muestraLogin");
	if(datos.tipoUsuario=='A'){
    	var regProd = document.getElementById('regProd');
    	regProd.style.display = "flex";
        sessionStorage.setItem("usuario", datos.cuentaUsuario);
    }
	//Guarda en la sessionStorage
	sessionStorage.setItem("nombre", datos.nombre);
    sessionStorage.setItem("primApellido", datos.primApellido);
    sessionStorage.setItem("segApellido", datos.segApellido);
    sessionStorage.setItem("tipoUsuario", datos.tipoUsuario);

	logout.style.display="flex";
	navmen.innerHTML=datos.nombre;
	ml.href="#";
	//aquí debe poner el login en display:none y el welcome en block
	//ya está el json cargado con la información, por si necesitas sacar algo
	if(sectionLogin.style.display==="flex"){
        sectionLogin.style.display="none";
        sectionRegistrarse.style.display="none";
        divWelcome1.style.display="flex";
    }else{
        sectionLogin.style.display="flex";
        sectionRegistrarse.style.display="none"
    }
}

function cerrarSesion(){
	sessionStorage.clear();
	var logout = document.getElementById("logout");
	var navmen = document.getElementById("sp");
	var divTexto = document.getElementById("divTexto");
	var divDesliza = document.getElementById("divDesliza");
    var divParentAbsoluto = document.getElementById('parentAbsoluto');
	var login = document.getElementById("sectionLogin");
	var ml = document.getElementById("muestraLogin");
	var divWelcome1=document.getElementById("welcome");
	var regProd = document.getElementById('regProd');
    var regProducto = document.getElementById("regProducto");
	if(regProd.style.display = "flex"){
    	regProd.style.display = "none";
        regProducto.style.display = "none";
        divDesliza.style.display = "none";
    }
	divWelcome1.style.display="none";
	ml.href="javascript:muestraLogin();";
	logout.style.display="none";
    navmen.innerHTML="Iniciar sesi&oacute;n";
    divParentAbsoluto.style.display="none";
	login.style.display="none";

	divTexto.style.display="flex";
	document.getElementById("formLogin").reset();
}

function registraUsuario(){
    var mensajeRegisttro = document.getElementById("mensajeRegistro");
    mensajeRegisttro.style.display="flex";
}
