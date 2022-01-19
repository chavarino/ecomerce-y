import { Pipe, PipeTransform } from '@angular/core';
import { FiltroAccionFilter } from '../interfaces/filtro-accion';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'catFilter'
})
export class CatFilterPipe implements PipeTransform {

  transform(array: Product[], filtros: FiltroAccionFilter[]): Product[] {
    
    if(!filtros || filtros.length===0)
    {
      return array;
    }

    
    return array.filter((p)=>{

        return filtros.reduce((b:boolean,c:FiltroAccionFilter)=> {
          
          let res =   c.action(p) as boolean;

          return b && res;
        }, true)
    });
  }

}
