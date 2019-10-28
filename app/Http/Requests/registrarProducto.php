<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class registrarProducto extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(){
        return [
            'txtNombre' => 'required|max:30',
            'txtDescripcion' => 'required|max:255|min:5',
            'imagen' => 'required|filled',
            'txtColor' => 'max:25',
            'txtLinea' => 'required|numeric|digits_between:1,3',
            'txtTipo' => 'required|numeric|digits_between:1,3',
            'numStock' => 'required|integer',
            'numPrecio' => 'required|numeric'
        ];
    }

    public function messages(){
        return [
            'txtNombre.required' => 'El nombre del producto es requerido.',
            'txtNombre.max' => 'Solo se pueden ingresar un máximo de 30 caracteres para el campo nombre.',

            'txtDescripcion.required' => 'La descripción del producto es requerida.',
            'txtDescripcion.min' => 'El texto de la descripción es demaciado corto.',
            'txtDescripcion.max' => 'Solo se pueden ingresar un máximo de 255 caracteres para el campo Descripción.',

            'imagen.required' => 'La imagen del producto es requerida.',
            'imagen.mimes' => 'La imagen no posee un formato válido.',
            'imagen.filled' => 'La imagen no pudo cargarse correctamente.',

            'txtColor.required' => 'El color del maquillaje es requerido.',
            'txtColor.max' => 'Solo se pueden ingresar un máximo de 25 caracteres para el campo Color.',

            'txtLinea.required' => 'La linea del producto es requerida.',
            'txtLinea.numeric' => 'La linea del producto no es válida.',
            'txtLinea.digits_between' => 'La linea del producto no es válida.',

            'txtTipo.required' => 'El tipo del producto es requerido.',
            'txtTipo.numeric' => 'El tipo de producto no es válido.',
            'txtTipo.digits_between' => 'El tipo de producto no es válido.',

            'numStock.required' => 'La cantidad de productos en stock es requerida.',
            'numStock.integer' => 'La cantidad de productos debe ser un número entero',

            'numPrecio.required' => 'El precio del producto es requerido.',
            'numPrecio.numeric' => 'El precio del producto debe ser un número'
        ];
    }
}
