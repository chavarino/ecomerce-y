import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { environment } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { FiltroAccion, FiltroAccionByCategoria, FiltroAccionByPrecio, FiltroAccionSortImpl, FiltrosModel, FiltroAccionFilter, FiltroAccionSort, TIPO_FILTRO } from '../../interfaces/filtro-accion';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  
  constructor(private m_dialog : MatDialog, private dataServ : DataService) { }
  productos : Product[] = [];

  

 

  isFilterShowed : boolean = false;

  filtros : FiltrosModel = {
      combos : {
        filter : {
          filtroPrecio : {
            lista :[
              new FiltroAccionByPrecio("Todos"),
              new FiltroAccionByPrecio("0.00€ - 50.00€", 0, 50),
              new FiltroAccionByPrecio("50.00€ - 100.00€", 50, 100),
              new FiltroAccionByPrecio("100.00€ - 150.00€", 100, 150),
              new FiltroAccionByPrecio("+200.00€", 200)
            ] ,
            titulo: "Precio"
          }
        },
        sort : {
          filtersOrderBy : {
            lista :[
              new FiltroAccionSortImpl("Nombre", "titulo"),
              new FiltroAccionSortImpl("Precio: Menor a Mayor", "precio"),
              new FiltroAccionSortImpl("Precio: Mayor a Menor", "precio", true),
              new FiltroAccionSortImpl("Fecha", "fecha", true),
            ],
            titulo: "Ordenar por"
          }
        }
      },
      seleccionados : {
        filter :{},
        sort: {}
      }
    }
  


    saveFiltroSelected(filtro :FiltroAccion)
    {

        if(filtro.getTipo() ===TIPO_FILTRO.SORT)
        {
          this.filtros.seleccionados.sort[filtro.getTipo()] = filtro;
        }
        else  {
          this.filtros.seleccionados.filter[filtro.getTipo()] = filtro;
        
        } 
    }
  
  
    /*
  
  {
    ,
    filtersByPrecio : [
      new FiltroAccionByPrecio("All"),
      new FiltroAccionByPrecio("0.00€ - 50.00€", 0, 50),
      new FiltroAccionByPrecio("50.00€ - 100.00€", 50, 100),
      new FiltroAccionByPrecio("100.00€ - 150.00€", 100, 150),
      new FiltroAccionByPrecio("+200.00€", 200)
    ] 
  }*/
  getFiltrosForSort()
  {
    
    return Object.values(this.filtros.seleccionados.sort)[0];
  }
  getFiltrosForFilter()
  {
    
    return Object.values(this.filtros.seleccionados.filter);
  }
  switchFilterShow() 
  {

     this.isFilterShowed= !this.isFilterShowed;
  }
  isCategoria(filtroCategoria: FiltroAccionByCategoria )
  {
    return this.filtros.seleccionados.filter[filtroCategoria.getTipo()] === filtroCategoria;
  }
  setCategoriaFilter(filtroCategoria: FiltroAccionByCategoria  )
  {
    
    this.saveFiltroSelected(filtroCategoria)
  }
  openDialogDetail(p:Product)
  {
      let ref = this.m_dialog.open(ProductDetailComponent, {
        data: p.id,
 
 
        maxHeight:"95%",
        panelClass: "dialog_cust"
      })

      ref.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
       
      });
  }
  
  ngOnInit(): void {
    
    this.dataServ.getProductList().subscribe((o)=>{
        this.productos.push(...o)
    })
  }


  getUrlFoto(p : Product)
  {


    return p.thumbnail_img_url && p.thumbnail_img_url.getUrl()!=='' ? p.thumbnail_img_url.getUrl() : environment.img_not_found;

  }

}
