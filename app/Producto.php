<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model{
    private $idProducto;
    private $linea;
    private $tipo;
    private $registradoPor;
    private $nombre;
    private $descripcion;
    private $color;
    private $imagen;
    private $precio;
    private $stock;

    protected $guarded = ["idProducto"];
    protected $primaryKey = 'idProducto';

    public function getProductos(){
        $j = 0;
        $i = 0;
        $arregloProductos = null;
        $productos = Producto::all();
        if($productos){
            foreach ($productos as $producto){
                $arregloProductos[$j][$i++] = ($producto['idProducto']);
                $arregloProductos[$j][$i++] = $producto->linea()->value('descripcion');
                $arregloProductos[$j][$i++] = $producto->tipo()->value('descripcion');
                $arregloProductos[$j][$i++] = $producto->administrador()->value('cuentaUsuario');
                $arregloProductos[$j][$i++] = $producto['nombre'];
                $arregloProductos[$j][$i++] = $producto['descripcion'];
                $arregloProductos[$j][$i++] = $producto['color'];
                $arregloProductos[$j][$i++] = $producto['imagen'];
                $arregloProductos[$j][$i++] = $producto['precio'];
                $arregloProductos[$j][$i] = $producto['stock'];
                $j++;
                $i=0;
            }
        }
        return $arregloProductos;
    }

    public function getProductosTipo(){
        $j=0;
        $i=0;
        $arregloProductos = null;
        $productos = Producto::where('idTipo',$this->tipo)->get();

        if($productos){
            foreach ($productos as $producto){
                $arregloProductos[$j][$i++] = ($producto['idProducto']);
                $arregloProductos[$j][$i++] = $producto->linea()->value('descripcion');
                $arregloProductos[$j][$i++] = $producto->tipo()->value('descripcion');
                $arregloProductos[$j][$i++] = $producto->administrador()->value('cuentaUsuario');
                $arregloProductos[$j][$i++] = $producto['nombre'];
                $arregloProductos[$j][$i++] = $producto['descripcion'];
                $arregloProductos[$j][$i++] = $producto['color'];
                $arregloProductos[$j][$i++] = $producto['imagen'];
                $arregloProductos[$j][$i++] = $producto['precio'];
                $arregloProductos[$j][$i] = $producto['stock'];
                $j++;
                $i=0;
            }
        }
        return $arregloProductos;
    }

    public function getProductosLinea(){
        $j=0;
        $i=0;
        $arregloProductos = null;
        $productos = Producto::where('idLinea',$this->linea)->get();
        if($productos){
            foreach ($productos as $producto){
                $arregloProductos[$j][$i++] = ($producto['idProducto']);
                $arregloProductos[$j][$i++] = $producto->linea()->value('descripcion');
                $arregloProductos[$j][$i++] = $producto->tipo()->value('descripcion');
                $arregloProductos[$j][$i++] = $producto->administrador()->value('cuentaUsuario');
                $arregloProductos[$j][$i++] = $producto['nombre'];
                $arregloProductos[$j][$i++] = $producto['descripcion'];
                $arregloProductos[$j][$i++] = $producto['color'];
                $arregloProductos[$j][$i++] = $producto['imagen'];
                $arregloProductos[$j][$i++] = $producto['precio'];
                $arregloProductos[$j][$i] = $producto['stock'];
                $j++;
                $i=0;
            }
        }
        return $arregloProductos;
    }

    public function registrarProducto(){
        $producto = Producto::create([
            "idLinea" => $this->getLinea(),
            "idTipo" => $this->getTipo(),
            "registradoPor" => $this->getRegistradoPor(),
            "nombre" => $this->getNombre(),
            "descripcion" => $this->getDescripcion(),
            "color" => $this->getColor(),
            "imagen" => $this->getImagen(),
            "precio" => $this->getPrecio(),
            "stock" => $this->getStock(),
        ]);
        if($producto){
            return true;
        }else{
            return false;
        }
    }

    public function linea(){
        return $this->hasOne('App\Linea','idLinea','idLinea');
    }
    public function tipo(){
        return $this->hasOne('App\Tipo','idTipo','idTipo');
    }
    public function administrador(){
        return $this->hasOne('App\Administrador','cuentaUsuario','registradoPor');
    }

    /**
     * @return mixed
     */
    public function getIdProducto()
    {
        return $this->idProducto;
    }

    /**
     * @param mixed $idProducto
     */
    public function setIdProducto($idProducto): void
    {
        $this->idProducto = $idProducto;
    }

    /**
     * @return mixed
     */
    public function getLinea()
    {
        return $this->linea;
    }

    /**
     * @param mixed $linea
     */
    public function setLinea($linea): void
    {
        $this->linea = $linea;
    }

    /**
     * @return mixed
     */
    public function getTipo()
    {
        return $this->tipo;
    }

    /**
     * @param mixed $tipo
     */
    public function setTipo($tipo): void
    {
        $this->tipo = $tipo;
    }

    /**
     * @return mixed
     */
    public function getRegistradoPor()
    {
        return $this->registradoPor;
    }

    /**
     * @param mixed $registradoPor
     */
    public function setRegistradoPor($registradoPor): void
    {
        $this->registradoPor = $registradoPor;
    }

    /**
     * @return mixed
     */
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * @param mixed $nombre
     */
    public function setNombre($nombre): void
    {
        $this->nombre = $nombre;
    }

    /**
     * @return mixed
     */
    public function getDescripcion()
    {
        return $this->descripcion;
    }

    /**
     * @param mixed $descripcion
     */
    public function setDescripcion($descripcion): void
    {
        $this->descripcion = $descripcion;
    }

    /**
     * @return mixed
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * @param mixed $color
     */
    public function setColor($color): void
    {
        $this->color = $color;
    }

    /**
     * @return mixed
     */
    public function getImagen()
    {
        return $this->imagen;
    }

    /**
     * @param mixed $imagen
     */
    public function setImagen($imagen): void
    {
        $this->imagen = $imagen;
    }

    /**
     * @return mixed
     */
    public function getPrecio()
    {
        return $this->precio;
    }

    /**
     * @param mixed $precio
     */
    public function setPrecio($precio): void
    {
        $this->precio = $precio;
    }

    /**
     * @return mixed
     */
    public function getStock()
    {
        return $this->stock;
    }

    /**
     * @param mixed $stock
     */
    public function setStock($stock): void
    {
        $this->stock = $stock;
    }

}
