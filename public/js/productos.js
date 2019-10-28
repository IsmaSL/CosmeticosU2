$(document).ready(function(){
    $( "#mensajeExito" ).dialog({
        autoOpen: false,
        show: {
            effect: "puff",
            duration: 500
        },
        hide: {
            effect: "explode",
            duration: 1000
        }
        , modal: true
    });

    $("#txtLinea").change(function(){
        if($("#txtLinea").val() !== "1"){
            $("#cajaColor").css('display','none');
        }else{
            $("#cajaColor").css('display','flex');
        }
    });

    $("#imagen").change(function() {
        previzualizacionImagen(this);
    });
});

function muestraSelect(valueSelect){
    var divSelectLineas = document.getElementById("lineas");
    var divSelecTipos = document.getElementById("tipos");
    var inputFiltra = document.getElementById("inputFiltra");
    inputFiltra.style.display = "flex";
   if(valueSelect == 1){
        divSelectLineas.style.display = "flex";
        divSelecTipos.style.display = "none";
   }else if (valueSelect == 2) {
        divSelecTipos.style.display = "flex";
        divSelectLineas.style.display = "none";
   }
}

function filtrado(selectFiltro,linea,tipo){
    if (selectFiltro == 1) {
        var url = "/api/productos/linea";
        var queryString = "linea="+linea;
        llamadasParciales(url, queryString,"POST");
    }else if(selectFiltro == 2){
        var url = "/api/productos/tipo";
        var queryString = "tipo="+tipo;
        llamadasParciales(url, queryString,"POST");
    }
}

function llamaBuscaProductos() {
    var sectionRegistrarse= document.getElementById("sectionRegistrarse");
    sectionRegistrarse.style.display = "none";
    var divDesliza = document.getElementById("divDesliza");

    var divTexto = document.getElementById("divTexto");
    divTexto.style.display = "none";
    var login = document.getElementById("sectionLogin");
    login.style.display="none";
    var divParentAbsoluto = document.getElementById('parentAbsoluto');
    divParentAbsoluto.style.display = "flex";
    var welcome = document.getElementById('welcome');
    var pro = document.getElementById('regProducto');
    pro.style.display="none";
    welcome.style.display = "none";
    divDesliza.style.display = "flex";
    var url = "/api/productos";
    llamadasParciales(url,"","GET");
}

function llamadasParciales (url,queryString,metodo){
    var request = new XMLHttpRequest();
    var loaderProductos = document.getElementById("loaderProductos");
    request.onreadystatechange = function () {
        if (request.readyState === 4 && request.status === 200) {
            loaderProductos.style.display = "none";
            pintaProductos(request.responseText);
        } else {
            if (request.status != 200 && request.status != 0)
                alert("Hubo error, status " + request.status);
            loaderProductos.style.display = "none";
        }
    };
    request.open(metodo, url, true);
    //Se avisa que se envían parámetros que se van a entender como un formulario
    request.setRequestHeader("Content-type",
        "application/x-www-form-urlencoded");
    request.send(queryString);
    loaderProductos.style.display = "flex";
}

function pintaProductos(respuesta) {
    var datos = JSON.parse(respuesta);
    var p = document.getElementById("parentCajas");
    if(p!=null){
        var parentCajas=document.getElementById("parentCajas");
        parentCajas.remove();
    }
    var parentAbsoluto = document.getElementById("parentAbsoluto");
    var divParentCajas = document.createElement("div");
    divParentCajas.className="parentCajas";
    divParentCajas.id="parentCajas";
    parentAbsoluto.appendChild(divParentCajas);
    if(datos.arregloProductos === null){
        var divTextoMensaje = document.createElement("h4");
        var textoMensaje = document.createTextNode("¡Lo sentimos, no tenemos productos para mostrar con estas caracteristicas!");
        divParentCajas.appendChild(divTextoMensaje);
        divTextoMensaje.appendChild(textoMensaje);
    }else{
        for (var i=0;i<datos.arregloProductos.length;i++){
            var caja = document.createElement("div");
            caja.className="caja";

            //Elementos de la caja
            var divTexto = document.createElement("div");
            var divTextoTitulo = document.createElement("h5");
            var tituloTexto = document.createTextNode(datos.arregloProductos[i][4]);

            var divImagen = document.createElement("div");
            var divImagenImg = document.createElement("img");
            divImagenImg.setAttribute('width','100em');
            divImagenImg.setAttribute('heigth','100em');
            divImagenImg.src=datos.arregloProductos[i][7];

            var divDescripcion = document.createElement("div");
            var divDescripcionDesc = document.createElement("p");
            var descripcionTexto = document.createTextNode(datos.arregloProductos[i][5]);
            var divDescripcionLinea = document.createElement("p");
            var lineaTexto = document.createTextNode(datos.arregloProductos[i][1]);
            var divDescripcionTipo = document.createElement("p");
            var tipoTexto = document.createTextNode(datos.arregloProductos[i][2]);


            var divDescripcionColor = document.createElement("p");
            var colorTexto = document.createTextNode(datos.arregloProductos[i][6]);
            var divPrecio = document.createElement("div");
            var divPrecioPre = document.createElement("span");
            var precioTexto = document.createTextNode("$"+datos.arregloProductos[i][8]+" MXN");

            var divCompra = document.createElement("div");
            var btnCompra = document.createElement("button");
            var btnCompraTexto = document.createTextNode("Comprar");


            divParentCajas.appendChild(caja);
            caja.appendChild(divTexto);
            divTexto.appendChild(divTextoTitulo);
            divTextoTitulo.appendChild(tituloTexto);
            caja.appendChild(divImagen);
            divImagen.appendChild(divImagenImg);
            caja.appendChild(divDescripcion);
            divDescripcion.appendChild(divDescripcionDesc);
            divDescripcionDesc.appendChild(descripcionTexto);
            divDescripcion.appendChild(divDescripcionTipo);
            divDescripcionTipo.appendChild(tipoTexto);
            divDescripcion.appendChild(divDescripcionLinea);
            divDescripcionLinea.appendChild(lineaTexto);
            if(datos.arregloProductos[i][6]!=null){
                divDescripcion.appendChild(divDescripcionColor);
                divDescripcionColor.appendChild(colorTexto);
            }
            if(sessionStorage.length>0){
                caja.appendChild(divPrecio);
                divPrecio.appendChild(divPrecioPre);
                divPrecioPre.appendChild(precioTexto);
                caja.appendChild(divCompra);
            }
            if(sessionStorage.length>0&&sessionStorage.getItem('tipoUsuario')=='C'){
                divCompra.appendChild(btnCompra);
                btnCompra.appendChild(btnCompraTexto);
            }
        }
    }


}

function registraProductos(){
    var divDesliza = document.getElementById("divDesliza");
    var divMensaje = document.getElementById("mensajeErrores");
    var divTexto = document.getElementById("divTexto");
    var sectionLogin=document.getElementById("sectionLogin");
    var sectionRegistrarse=document.getElementById("sectionRegistrarse");
    var regProducto = document.getElementById("regProducto");
    var divParentAbsoluto = document.getElementById('parentAbsoluto');
    var welcome = document.getElementById('welcome');
    divMensaje.style.display = "none";
    //aquí debe poner el login en display:none y el welcome en block
    //ya está el json cargado con la información, por si necesitas sacar algo
    if(divTexto.style.display==="flex"|| divParentAbsoluto.style.display==="flex" ||
        sectionLogin.style.display==="flex" || sectionRegistrarse.style.display==="flex" ||
        welcome.style.display==="flex"){
        welcome.style.display="none";
        divTexto.style.display="none";
        sectionLogin.style.display="none";
        divParentAbsoluto.style.display="none";
        sectionRegistrarse.style.display="none";
        divDesliza.style.display = "none";
        regProducto.style.display="flex";
    }
}

function registraProducto(){
    var sURL = "/api/productos/registrar";

    var formData = new FormData($("#frmRegistraProducto")[0]);
    formData.append('txtNombre', $("#txtNombreProducto").val());
    formData.append('txtDescripcion', $("#txtDescripcion").val());
    formData.append('txtColor', $("#txtColor").val());
    formData.append('txtLinea', $("#txtLinea").val());
    formData.append('txtTipo', $("#txtTipo").val());
    formData.append('numStock', $("#numStock").val());
    formData.append('numPrecio', $("#numPrecio").val());
    formData.append('usuario', sessionStorage.getItem('usuario'));
    event.preventDefault();
    $('#loaderProductos').css('display','flex');

    $.ajax({
        url: sURL,
        type: "POST",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (oDatos) {
            var divMensajeError = $('#mensajeErrores');
            divMensajeError.css('display', 'none');
            $('#imagenMuestra').css('display','none');
            $('#loaderProductos').css('display','none');
            $("#frmRegistraProducto")[0].reset();
            $("#mensajeExito").dialog("option", "width", 300);
            $("#mensajeExito").dialog( "open" );
        },
        error : function (xhr){
            if(xhr.status === 422){
                creaMensajeError(xhr.responseJSON.errors);
                $('#loaderProductos').css('display','none');
            }else{
                alert("Error al invocar al servidor, intente posteriormente");
                $('#loaderProductos').css('display','none');
            }

        }
    });
}

function previzualizacionImagen(input){
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            // Asignamos el atributo src a la tag de imagen
            $('#imagenMuestra').attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
        $('#imagenMuestra').css('display','flex');
    }
}

function creaMensajeError(errores){
    var divMensajeError = $('#mensajeErrores');
    var contenedorErrores = $('#contenedorErrores');
    if(contenedorErrores.children().length){
        contenedorErrores.empty();
    }
    var ul = $('<ul/>');
    $.each(errores, function(llave, valor){
        ul.append($('<li/>',{
            'text' : valor[0]
        }));
    });
    divMensajeError.children('div').append(ul);
    divMensajeError.css('display','flex');
}
