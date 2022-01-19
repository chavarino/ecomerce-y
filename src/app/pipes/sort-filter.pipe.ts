import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';
import { FiltroAccionSort } from '../interfaces/filtro-accion';

@Pipe({
  name: 'sortFilter'
})
export class SortFilterPipe implements PipeTransform {

  transform(array: Product[], filtro: FiltroAccionSort ): Product[] {
    if(!filtro  )
    {
      return array;
    }

    
    return array.sort((a,b )=>{

      return filtro.action(a,b) as number
    })
  }

}
