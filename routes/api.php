<?php

use Illuminate\Support\Facades\Route;


Route::post('/login', 'loginController@login')->name('login');
Route::get('/productos', 'productosController@buscarTodos')->name('productos.buscarTodos');
Route::post('/productos/tipo', 'productosController@buscarPorTipo')->name('productos.buscarPorTipo');
Route::post('/productos/linea', 'productosController@buscarPorLinea')->name('productos.buscarPorLinea');
Route::post('/productos/registrar', 'productosController@registrarProducto')
    ->name('productos.registrarProducto');
