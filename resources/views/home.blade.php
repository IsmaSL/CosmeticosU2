@extends('layout')

@section('titulo','Inicio')

@section('section')
    <script>
        window.onload = function(){
            if(sessionStorage.getItem('nombre')){
                verificaStorage(sessionStorage.getItem('nombre'),sessionStorage.getItem('tipoUsuario'));
            }
        };
    </script>

    <!-- Contenedor de las imagenes  para la animacion de fondo -->
    <div class="hero-image-contenedor-imagenes">
        <figure></figure>
        <figure></figure>
        <figure></figure>
        <figure></figure>
        <figure></figure>
    </div>

    <!-- Contenedor principal de toda la aplicación -->
    <div class="hero-image-contenedor-contenido">
        <div class="hero-image-contenido">

            <!-- Contenedor del mensaje de bievenida de la aplicación -->
            <div class="hero-text" id="divTexto" style="display: flex">
                <h2>Makeup|<span><span>L</span></span>ara<span>B</span>ella</h2>
                <p>¡Si&eacute;ntete LARABELLA!</p>
            </div>

            <!-- Contenedor del mensaje del despliegue de productos -->
            <div class="hero-text" id="divDesliza" style="display: none;">
                <h2><span>D</span>esliza</h2>
                <p>¡Para ver los productos!</p>
                <div class="contenedorFlecha">
                    <div class="flecha"></div>
                    <div class="flecha"></div>
                    <div class="flecha"></div>
                </div>
            </div>

            <!-- LOGIN -->
            <section id="sectionLogin" style="display: none;">
                <div class="contenedorLogin">
                    <span id="ico" class="span"></span>
                    <h5>Iniciar Sesi&oacute;n</h5>
                    <form id="formLogin" onsubmit="llamaLogin(cuentaUsuario.value, contrasenia.value);return false;">
                        <input type="text" id="cuentaUsuario" placeholder="Usuario" required>
                        <input type="password" id="contrasenia" placeholder="Contrase&ntilde;a" required>
                        <input class="btn" type="submit" value="Entrar">
                    </form>
                    <div class="contenedorEnlaces">
                        <div class="lds-roller" id="loaderLogin" style="display: none;">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <a id="link" href="javascript:cambiaForms();">¡Reg&iacute;strate!</a>
                    </div>
                </div>
            </section>

            <!-- REGISTRO -->
            <section id="sectionRegistrarse" id="divProductos" style="display: none;">
                <div id="mensajeRegistro" class="mensajeRegistro" style="display: none">
                    <h5>Se ha creado tu cuenta con &eacute;xito, ¡Ahora puedes iniciar sesi&oacute;n!</h5>
                </div>

                <div class="contenedorRegistro">
                    <div class="contenedorIcono">
                        <span id="ico" class="span"></span>
                        <h5>Reg&iacute;strate</h5>
                    </div>
                    <form onsubmit="registraUsuario();return false;">
                        <div class="primeraParte">
                            <input type="text" id="txtNombre" placeholder="Nombre(s)" required>
                            <input type="text" id="txtApePa" placeholder="Apellido paterno" required>
                            <input type="text" id="txtApeMa" placeholder="Apellido materno" required>
                            <input type="text" id="txtEst" placeholder="Estado" required>
                            <input type="text" id="txtCiu" placeholder="Ciudad" required>
                            <input type="text" id="txtCol" placeholder="Colonia y n&uacute;mero" required>
                        </div>

                        <div class="segundaParte">
                            <input type="text" id="txtTelCel" placeholder="Tel&eacute;fono de casa" required>
                            <input type="text" id="txtTelCas" placeholder="Celular" required>
                            <input type="email" id="txtCor" placeholder="Correo electr&oacute;nico" required>
                            <input type="password" id="txtCon" placeholder="Contrase&ntilde;a" required>
                            <input  class="btn" type="submit" value="Registrarse">
                            <a id="link" href="javascript:cambiaForms();">Volver</a>
                        </div>
                    </form>
                </div>
            </section>

            <!-- CONTENEDOR DEL FORMULARIO PARA REGISTRAR UN NUEVO PRODUCTO -->
            <section id="regProducto" style="display: none;">
                <div id="mensajeErrores" class="mensajeRegistroP" style="display: none">
                    <h2>¡Vaya hay problemas con el formulario!</h2>
                    <div id="contenedorErrores">
                    </div>
                </div>

                <form id="frmRegistraProducto" enctype="multipart/form-data" onsubmit="registraProducto();">

                    <div class="formPro">
                        <div class="parte1">
                            <div>
                                <h2 id="title-regis" align="center">Registrar nuevo producto</h2>
                            </div>
                            <div class="sectionBox">
                                <label>Nombre:</label>
                                <input id="txtNombreProducto" type="text" class="inputBox" placeholder="Nombre" required>
                            </div>
                            <div class="sectionBox">
                                <label>Descripci&oacute;n:</label>
                                <textarea id="txtDescripcion" class="inputBox" rows="5" cols="25" required>
                                </textarea>
                            </div>
                            <div class="sectionBox">
                                <label>Imagen:</label>
                                <input id="imagen" name="imagen" type="file" accept="image/png, .jpeg, .jpg, image/gif"                                     required>
                                <img id="imagenMuestra" width="235px" height="145px">
                            </div>

                        </div>
                        <div class="parte2">

                            <div class="sectionBox select">
                                <label>Linea:</label>
                                <select id="txtLinea" default="Seleccionar" required>
                                    <option value="1">Maquillaje</option>
                                    <option value="2">Perfumeria</option>
                                    <option value="3">Cuidado personal</option>
                                </select>
                            </div>
                            <div class="sectionBox select">
                                <label>Tipo:</label>
                                <select id="txtTipo" default="Seleccionar" required>
                                    <option value="1">Normal</option>
                                    <option value="2">Hipo-alerg&eacute;rgenico</option>
                                    <option value="3">Piel seca</option>
                                </select>
                            </div>
                            <div id="cajaColor" style="display: flex" class="sectionBox">
                                <label>Color:</label>
                                <input id="txtColor" type="text" class="inputBox" placeholder="Color">
                            </div>
                            <div class="sectionBox">
                                <label>Stock:</label>
                                <input id="numStock" type="number" class="inputBox" placeholder="Stock" min="1" required>
                            </div>
                            <div class="sectionBox">
                                <label>Precio:</label>
                                <input id="numPrecio" type="number" class="inputBox" placeholder="Precio" min="1" required>
                            </div>
                            <div class="botonForm">
                                <input id="btnEnviar" type="submit" value="Registrar" class="regBoton" >
                                <div class="lds-roller" id="loaderProductos" style="display: none;">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>

                <div id="mensajeExito" style="display: none">
                    <h3>¡Se ha agregado con exito el artículo!</h3>
                </div>
            </section>

            <!-- CONTENEDOR DE BIEVENIDA TRAS LOGIN -->
            <div id="welcome" style="display: none;">
                <div class="parpadeo">
                    <img id="image" src="/assets/images/fondos/cosmetic4.jpg" width="1500" height="1000">
                    <div class="display-left padding">
                        <div class="black opacity hover-opacity-off padding-large">
                            <h1 class="title-welcome">Bienvenido</h1>
                            <hr class="opacity">
                            <p>No te pierdas de nuestras nuevas ofertas...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div style="display: none;" class="parentAbsoluto" id="parentAbsoluto">
        <div class="filtrado">
            <form onsubmit="filtrado(selectFiltro.value, selectLinea.value, selectTipo.value); return false;">
                <span>Filtrar productos por: </span>
                <select id="selectFiltro" onChange="muestraSelect(this.value)">
                    <option disabled selected>Seleccione una opci&oacute;n</option>
                    <option value="1">Linea</option>
                    <option value="2">Tipo</option>
                </select>

                <div id="lineas" class="lineas" style="display: none;">
                    <span>Lineas: </span>
                    <select id="selectLinea">
                        <option value="1">Maquillaje</option>
                        <option value="2">Perfumeria</option>
                        <option value="3">Cuidado corporal</option>
                    </select>
                </div>

                <div id="tipos" class="tipos" style="display: none;">
                    <span>Tipos: </span>
                    <select id="selectTipo">
                        <option value="1">Normal</option>
                        <option value="2">Hipo-alerg&eacutergenico</option>
                        <option value="3">Piel seca</option>
                    </select>
                </div>
                <div class="lds-roller" id="loaderProductos" style="display: none;">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <input id="inputFiltra" style="display: none" type="submit" value="buscar">
            </form>
        </div>
    </div>
@endsection

