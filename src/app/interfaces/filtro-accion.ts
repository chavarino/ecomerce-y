import { Product } from './product';
export enum TIPO_FILTRO {
    SORT = 1,
    FILTER_PRECIO = 2,
    FILTER_CATEGO= 3

}
export interface FiltroAccion {


     titulo : string,
     getTipo : () => TIPO_FILTRO
     action : (p:Product, p2 ?:Product, isReverse ?: boolean) =>   number | boolean
}

export interface FiltroAccionSort extends FiltroAccion{

    
    
}
export interface  FiltroAccionFilter extends FiltroAccion {


    
    
}
export class FiltroAccionSortImpl implements FiltroAccionSort {
    constructor(public titulo : string, private campo : string, private isReverse ?: boolean)
    {

    }
    getTipo () {
        return TIPO_FILTRO.SORT;
    }
     
   
    action(p:Product, p2 ?:Product, isReverse ?: boolean){

         let res= -1;
        if((p as {[key:string] : any})[this.campo] > (p2 as {[key:string] : any})[this.campo])
        {
            res = 1;
        }
        else if((p as {[key:string] : any})[this.campo] === (p2 as {[key:string] : any})[this.campo])
        {
            res = 0;
        }
        
        return res * ( (!this.isReverse && isReverse ||  this.isReverse && !isReverse) ? -1 : 1);

    } 

    
}

export class FiltroAccionByPrecio implements FiltroAccionFilter {
    constructor(public titulo : string, private numInferior : number = -1, private numSuperior : number = 9999999)
    {

    }
   
    getTipo () {
        return TIPO_FILTRO.FILTER_PRECIO;
    }
  
    action(p:Product){


        return this.numInferior<=p.precio && p.precio<=this.numSuperior;

    } 

    
}

export class FiltroAccionByCategoria implements FiltroAccionFilter {
    constructor(public titulo : string)
    {

    }
   
    getTipo () {
        return TIPO_FILTRO.FILTER_CATEGO;
    }
    action(p:Product){

        
        return p.des_categ.includes(this.titulo) || this.titulo==="Todos los productos";

    } 

    
}



export interface FiltrosModel {
    combos: {
      filter: {
        [key: string]: {
          titulo: string;
          lista: FiltroAccionFilter[];
        };
      };
      sort: {
        [key: string]: {
          titulo: string;
          lista: FiltroAccionSort[];
        };
      };
    };
    seleccionados: {
      filter: {
        [key: string]: FiltroAccionFilter,

      }
      sort: {
        [key: string]: FiltroAccionSort,

      }
    };
  }