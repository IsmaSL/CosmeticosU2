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
    var divSelectLineas = $('#lineas');
    var divSelecTipos = $('#tipos');
    var inputFiltra = $('#inputFiltra');
    inputFiltra.show();
    if(valueSelect == 1){
        divSelectLineas.show();
        divSelecTipos.hide();
    }else if (valueSelect == 2) {
        divSelecTipos.show();
        divSelectLineas.hide();
    }
}

function filtrado(selectFiltro,linea,tipo){
    if (selectFiltro == 1) {
        var url = "api/productos/linea";
        var queryString = linea;
        console.log(queryString);
        llamadasParciales(url, queryString,1);
    }else if(selectFiltro == 2){
        var url = "api/productos/tipo";
        var queryString = tipo;
        console.log(queryString);
        llamadasParciales(url, queryString,2);
    }
}

function llamaBuscaProductos() {
    var sectionRegistrarse = $('#sectionRegistrarse');
    sectionRegistrarse.hide();
    var divDesliza = $('#divDesliza');
    var divTexto = $('#divTexto');
    divTexto.hide();
    var login = $('#sectionLogin');
    login.hide();
    var divParentAbsoluto = $('#parentAbsoluto');
    divParentAbsoluto.show();
    var welcome = $('#welcome');
    var pro = $('#regProducto');
    pro.hide();
    welcome.hide();
    divDesliza.show();
    var url = "api/productos";
    llamadasParciales(url,"");
}

function llamadasParciales(url,queryString,numero){
    $('#loaderProductos2').css('display','flex');
    if (numero === 1){
        var llamada = $.get(
            url,{
                linea: queryString
            },
            function(oDatos) { //trabajo a realizar en caso de éxito
                $('#loaderProductos2').css('display','none');
                console.log(oDatos);
                pintaProductos(oDatos);
            } //fin function llamada ok
        ); //fin configura llamada
        llamada.fail(function(objRequest, status){
            $('#loaderProductos2').css('display','none');
            alert("Error al invocar al servidor, intente posteriormente");
            console.log(status);
        });
    }else{
        var llamada = $.get(
            url,{
                tipo: queryString
            },
            function(oDatos) { //trabajo a realizar en caso de éxito
                $('#loaderProductos2').css('display','none');
                console.log(oDatos);
                pintaProductos(oDatos);
            } //fin function llamada ok
        ); //fin configura llamada
        llamada.fail(function(objRequest, status){
            $('#loaderProductos2').css('display','none');
            alert("Error al invocar al servidor, intente posteriormente");
            console.log(status);
        });
    }

}

function pintaProductos(datos) {
    var p = $('#parentCajas');
    if(p!=null){
        var parentCajas = $('#parentCajas');
        parentCajas.remove();
    }
    var parentAbsoluto = $('#parentAbsoluto');
    var divParentCajas = $('<div></div>');
    divParentCajas.attr('class', 'parentCajas');
    divParentCajas.attr('id', 'parentCajas');
    parentAbsoluto.append(divParentCajas);
    if(datos.arregloProductos === null){
        var divTextoMensaje = $('<h4>¡Lo sentimos, no tenemos productos para mostrar con estas caracteristicas!</h4>');
        divParentCajas.append(divTextoMensaje);
    }else{
        for (var i=0;i<datos.arregloProductos.length;i++){
            var caja = $('<div></div>').attr('class', 'caja');

            //Elementos de la caja
            var divTexto = $('<div></div>');
            var divTextoTitulo =  $('<h5></h5>');
            var tituloTexto = datos.arregloProductos[i][4];


            var divImagen = $('<div></div>');
            var divImagenImg = $('<img></img>');
            divImagenImg.attr('width','100em');
            divImagenImg.attr('heigth','100em');
            divImagenImg.attr('src', datos.arregloProductos[i][7]);

            var divDescripcion = $('<div></div>');
            var divDescripcionDesc = $('<p></p>');
            var descripcionTexto = datos.arregloProductos[i][5];
            var divDescripcionLinea = $('<p></p>');
            var lineaTexto = datos.arregloProductos[i][1];
            var divDescripcionTipo = $('<p></p>');
            var tipoTexto = datos.arregloProductos[i][2];


            var divDescripcionColor =$('<p></p>');
            var colorTexto = datos.arregloProductos[i][6];
            var divPrecio = $('<div></div>');
            var divPrecioPre = $('<span></span>');
            var precioTexto = "$"+datos.arregloProductos[i][8]+" MXN";

            var divCompra = $('<div></div>');
            var btnCompra = $('<button></button>');
            var btnCompraTexto = "Comprar";


            divParentCajas.append(caja);
            caja.append(divTexto);
            divTexto.append(divTextoTitulo);
            divTextoTitulo.append(tituloTexto);
            caja.append(divImagen);
            divImagen.append(divImagenImg);
            caja.append(divDescripcion);
            divDescripcion.append(divDescripcionDesc);
            divDescripcionDesc.text(descripcionTexto);
            divDescripcion.append(divDescripcionTipo);
            divDescripcionTipo.text(tipoTexto);
            divDescripcion.append(divDescripcionLinea);
            divDescripcionLinea.text(lineaTexto);
            if(datos.arregloProductos[i][6]!=null){
                divDescripcion.append(divDescripcionColor);
                divDescripcionColor.text(colorTexto);
            }
            if(sessionStorage.length>0){
                caja.append(divPrecio);
                divPrecio.append(divPrecioPre);
                divPrecioPre.text(precioTexto);
                caja.append(divCompra);
            }
            if(sessionStorage.length>0&&sessionStorage.getItem('tipoUsuario')=='C'){
                divCompra.append(btnCompra);
                btnCompra.text(btnCompraTexto);
            }
        }
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
