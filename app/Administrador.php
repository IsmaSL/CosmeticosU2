<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Administrador extends Usuario{
    private $salario;

    public function buscaAdministrador(){
        $datosAdministrador = Administrador::where('cuentaUsuario', parent::getCuentaUsuario())->first()->usuario;
        if($datosAdministrador){
            parent::setNombre($datosAdministrador['nombre']);
            parent::setPrimApellido($datosAdministrador['primApellido']);
            parent::setSeguApellido($datosAdministrador['seguApellido']);
            parent::setCuentaUsuario($datosAdministrador['cuentaUsuario']);
            return true;
        }else{
            return false;
        }
    }

    //Relación a la tabla Usuario
    public function usuario(){
        return $this->belongsTo('App\Usuario','cuentaUsuario','cuentaUsuario');
    }
    public function producto(){
        return $this->belongsTo('App\Producto','cuentaUsuario','cuentaUsuario');
    }

    public function getSalario(){
        return $this->salario;
    }
    public function setSalario($salario): void{
        $this->salario = $salario;
    }

    /*Configuracion del modelo para Eloquent*/
    protected $table = 'administradores';
}
