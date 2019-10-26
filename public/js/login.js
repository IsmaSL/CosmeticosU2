
    function muestraLogin() {
        var divTexto = $('#divTexto');
        var divDesliza = $("#divDesliza");
        var sectionLogin = $("#sectionLogin");
        var sectionRegistrarse = $("#sectionRegistrarse");
        var regProducto = $("#regProducto");
        var divParentAbsoluto = $('#parentAbsoluto');
        var welcome = $('#welcome');
        //aquí debe poner el login en display:none y el welcome en block
        //ya está el json cargado con la información, por si necesitas sacar algo
        if (divTexto.css("display") === "flex" || divParentAbsoluto.css("display") === "flex" ||
            regProducto.css("display") === "flex" || sectionRegistrarse.css("display") === "flex" ||
            welcome.css("display") === "flex") {
            welcome.hide();
            divTexto.hide();
            sectionLogin.css("display","flex");
            divParentAbsoluto.hide();
            sectionRegistrarse.hide();
            regProducto.hide();
            divDesliza.hide();
        }
    }

    function cambiaForms(){
        var sectionLogin=$("#sectionLogin");
        var sectionRegistrarse=$("#sectionRegistrarse");
        var divDesliza = $("#divDesliza");
        if(sectionLogin.css("display")==="flex"){
            sectionLogin.hide();
            divDesliza.hide();
            sectionRegistrarse.css("display","flex");
            $("#formLogin").trigger("reset");
        }else{
            sectionLogin.css("display","flex");
            sectionRegistrarse.hide();
            divDesliza.hide();
        }
    }

    function llamaLogin(cuentaUsuario, contrasenia){
        var request = new XMLHttpRequest();
        var url = "/api/login";
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
        var divTexto = $("#divTexto");
        var divWelcome1=$("#welcome");
        var navmen = $("#sp");
        var logout = $("#logout");
        var sectionLogin = $("#sectionLogin");
        var sectionRegistrarse = $("#sectionRegistrarse");
        var ml = $("#muestraLogin");

        logout.css("display","flex");
        navmen.html(nombre);
        if(tipoUsuario=='A'){
            var regProd = $('#regProd');
            regProd.css("display","flex");
        }
        ml.attr("href","#");
        divTexto.hide();
        sectionLogin.hide();
        sectionRegistrarse.hide()
        divWelcome1.css("display","flex");
        sectionLogin.hide();
        sectionRegistrarse.hide();
    }

    function procesaLogin(textoRespuesta){
        var datos = JSON.parse(textoRespuesta);
        var divWelcome1=$("#welcome");
        var navmen = $("#sp");
        var logout = $("#logout");
        var sectionLogin = $("#sectionLogin");
        var sectionRegistrarse = $("#sectionRegistrarse");
        var ml = $("#muestraLogin");
        if(datos.tipoUsuario=='A'){
            var regProd = $('#regProd');
            regProd.css("display","flex");
        }
        //Guarda en la sessionStorage
        sessionStorage.setItem("nombre", datos.nombre);
        sessionStorage.setItem("primApellido", datos.primApellido);
        sessionStorage.setItem("segApellido", datos.segApellido);
        sessionStorage.setItem("tipoUsuario", datos.tipoUsuario);

        logout.css("display","flex");
        navmen.html(datos.nombre);
        ml.attr("href","#");
        //aquí debe poner el login en display:none y el welcome en block
        //ya está el json cargado con la información, por si necesitas sacar algo
        if(sectionLogin.css("display")==="flex"){
            sectionLogin.hide();
            sectionRegistrarse.hide();
            divWelcome1.css("display","flex");
        }else{
            sectionLogin.css("display","flex");
            sectionRegistrarse.hide();
        }
    }

    function cerrarSesion(){
        sessionStorage.clear();
        var logout = $("#logout");
        var navmen = $("#sp");
        var divTexto = $("#divTexto");
        var divDesliza = $("#divDesliza");
        var divParentAbsoluto = $('#parentAbsoluto');
        var login = $("#sectionLogin");
        var ml = $("#muestraLogin");
        var divWelcome1=$("#welcome");
        var regProd = $('#regProd');
        var regProducto = $("#regProducto");
        if(regProd.css("display") === "flex"){
            regProd.hide();
            regProducto.hide();
            divDesliza.hide();
        }
        divWelcome1.hide();
        ml.attr("href","javascript:muestraLogin();");
        logout.hide();
        navmen.html("Iniciar sesi&oacute;n");
        divParentAbsoluto.hide();
        login.hide();

        divTexto.css("display","flex");
        $("#formLogin").trigger("reset");
    }

    function registraUsuario(){
        var mensajeRegisttro = $("#mensajeRegistro");
        mensajeRegisttro.css("display","flex");
    }



