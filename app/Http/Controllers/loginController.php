<?php

namespace App\Http\Controllers;
use App\Administrador;
use App\Cliente;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
class loginController extends Controller{
    const TIPO_CLIENTE = "C";
    const TIPO_ADMIN = "A";

    public function login(Request $request){
        $objetoCliente = new cliente();
        if(!empty($request->input('cuentaUsuario')) && !empty($request->input('contrasenia'))){

            $objetoCliente->setCuentaUsuario($request->input('cuentaUsuario'));
            $objetoCliente->setContrasenia($request->input('contrasenia'));

            if($objetoCliente->buscaUsuario()){
                if($objetoCliente->buscaCliente()){
                    return response()->json([
                        "nombre" => $objetoCliente->getNombre(),
                        "primApellido" => $objetoCliente->getPrimApellido(),
                        "seguApellido" => $objetoCliente->getSeguApellido(),
                        "tipoUsuario" => self::TIPO_CLIENTE
                    ],200);
                }else{
                    $objetoAdministrador = new Administrador();
                    $objetoAdministrador->setCuentaUsuario($request->input('cuentaUsuario'));
                    if($objetoAdministrador ->buscaAdministrador()){
                        return response()->json([
                            "nombre" => $objetoAdministrador->getNombre(),
                            "primApellido" => $objetoAdministrador->getPrimApellido(),
                            "seguApellido" => $objetoAdministrador->getSeguApellido(),
                            "cuentaUsuario" => $objetoAdministrador->getCuentaUsuario(),
                            "tipoUsuario" => self::TIPO_ADMIN
                        ],200);
                    }else{
                        return response()->json([
                            "mensaje" => "Ocurrio un error"
                        ],500);
                    }
                }
            }else{
                return response()->json([
                    "mensaje" => "No se encontró al usuario"
                ],404);
            }
        }else{
            return response()->json([
                "mensaje" => "Faltan datos"
            ],400);
        }
    }
}
