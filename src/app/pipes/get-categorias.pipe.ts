import { Pipe, PipeTransform } from '@angular/core';
import { FiltroAccionByCategoria } from '../interfaces/filtro-accion';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'getCategorias'
})
export class GetCategoriasPipe implements PipeTransform {

  transform(array: Product[]): FiltroAccionByCategoria[] {
    let mapa : any = {};
    mapa["Todos los productos"]=true;
    array.forEach(v => {
       
      mapa[v.des_categ] = true;
    })
    return Object.keys(mapa).map(v => new FiltroAccionByCategoria(v));
  }

}
