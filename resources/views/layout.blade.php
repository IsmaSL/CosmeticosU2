<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link href="https://fonts.googleapis.com/css?family=Dancing+Script&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Kalam&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:600&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
     <!--ENLACES PARA LAS HOJAS DE ESTILO-->
    <link rel="stylesheet" href="{{asset('/css/bootstrap/css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{asset('/css/hamburgers.css')}}">
    <link rel="stylesheet" href="{{asset('/css/login.css')}}">
    <link rel="stylesheet" href="{{asset('/css/welcome.css')}}">
    <link rel="stylesheet" href="{{asset('/css/productos.css')}}">
    <link rel="stylesheet" href="{{asset('/css/webfonts/all.css')}}">
    <link rel="stylesheet" href="{{asset('/css/registroProductos.css')}}">
    <link rel="stylesheet" href="{{asset('/css/app.css')}}">
    <link rel="stylesheet" href="{{asset('/js/jslib/dataTables/DataTables-1.10.20/css/dataTables.bootstrap4.min.css')}}">
    <link rel="stylesheet" href="{{asset('js/jslib/jquery-ui/jquery-ui.css')}}">
    <link rel="stylesheet" href="{{asset('/css/datatable.css')}}">

    <!--<script src="https://kit.fontawesome.com/c2f3d34cf5.js" crossorigin="anonymous"></script>-->
    <title>@yield('titulo')</title>
</head>
<body>
    @include('Parcials.header')

    @yield('section')

    @include('Parcials.footer')
    <script src="{{asset('/js/jslib/jquery-3.4.1_min.js')}}"></script>
    <script src="{{asset('/js/jslib/popper/popper.min.js')}}"></script>
    <script src="{{asset('/css/bootstrap/js/bootstrap.min.js')}}"></script>
    <script src="{{asset('/js/jslib/dataTables2/datatables.min.js')}}"></script>
    <script src="{{asset('/js/animaciones.js')}}"></script>
    <script src="{{asset('/js/login.js')}}"></script>
    <script src="{{asset('/js/productos.js')}}"></script>
    <script src="{{asset('/js/jslib/jquery-ui/jquery-ui.js')}}"></script>
</body>
</html>
