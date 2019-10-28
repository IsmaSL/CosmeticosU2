<?php

namespace App\Http\Controllers;

use App\Http\Requests\registrarProducto;
use App\Producto;
use App\Tipo;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Storage;

class productosController extends Controller{

    public function buscarTodos(){
        $objetoProducto = new Producto();
        $arregloEncontrados = $objetoProducto->getProductos();
        return response()->json([
            "arregloProductos" => $arregloEncontrados
        ],200);
    }

    public function buscarPorTipo(Request $request){
        $objetoProducto = new Producto();
        $objetoProducto->setTipo($request->input('tipo'));
        $arregloEncontrados = $objetoProducto->getProductosTipo();
        return response()->json([
            "arregloProductos" => $arregloEncontrados
        ],200);
    }

    public function buscarPorLinea(Request $request){
        $objetoProducto = new Producto();
        $objetoProducto->setLinea($request->input('linea'));
        $arregloEncontrados = $objetoProducto->getProductosLinea();
        return response()->json([
            "arregloProductos" => $arregloEncontrados
        ],200);
    }

    public function registrarProducto(registrarProducto $request){
        $objetoProducto = new Producto();
        $objetoProducto->setNombre($request->txtNombre);
        $objetoProducto->setDescripcion($request->txtDescripcion);
        $objetoProducto->setLinea($request->txtLinea);
        $objetoProducto->setTipo($request->txtTipo);
        $objetoProducto->setStock($request->numStock);
        $objetoProducto->setPrecio($request->numPrecio);
        $objetoProducto->setRegistradoPor($request->usuario);

        if($objetoProducto->getLinea() == 1){
            $imagen = Storage::disk('public')->put(
                'assets/images/productos/maquillaje',
                $request->file('imagen')
            );
            $objetoProducto->setColor($request->txtColor);
        }elseif ($objetoProducto->getLinea() == 2){
            $imagen = Storage::disk('public')->put(
                'assets/images/productos/perfumes',
                $request->file('imagen')
            );
        }else{
            $imagen = Storage::disk('public')->put(
                'assets/images/productos/cuidadopersonal',
                $request->file('imagen')
            );
        }
        $objetoProducto->setImagen($imagen);

        if($objetoProducto->registrarProducto()){
            return response()->json([
                "status" =>  "success",
                "mensaje" => "Se ha almacenado con éxito el artículo: ".$objetoProducto->getNombre()
            ],200);
        }else{
            return response()->json([
                "status" => "fail",
                "mensaje" => "Ocurrió un error en el servidor, por favor intentelo más tarde"
            ],500);
        }
    }
}
