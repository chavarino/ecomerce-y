import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FotoUrl, Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient : HttpClient) { 



  }

   url_csv : string = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTzGaLvYLC70v_YiZSFBrPI-JX3uMFBDXb1_FA8jOBuCq3SnYCujMwI3NAiy0bx6m6_gZR_y9pbnHEL/pub?output=tsv";
   
  mapProductos : Map<string, Product> = new Map();
  getProductList(n_pag ?: number, sz_pag ?: number ):  Observable<Product[]>
  {

  
      
      return this.getProductCsvList();
  }

  private getProductCsvList()
  {
    let headers = {
      headers: new HttpHeaders({
        'Accept': 'text/html, application/xhtml+xml, */*',
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      responseType: 'text'
    };
      let array : Product[] = [];

      return new Observable<Product[]>((s)=>{


            this.httpClient.get(this.url_csv, headers as {}).subscribe((data) => {
              let dataString :string  = data as string;
              let csvToRowArray = dataString.split("\n");
              for (let index = 1; index < csvToRowArray.length - 1; index++) {
                let row = csvToRowArray[index].split("\t");
                const producto :Product = {
                  titulo: row[1],
                  des_categ: row[3],
                  descripcion : row[2],
                  id: row[0],
                  precio: parseInt(row[4] || "0"),
                  thumbnail_img_url: new FotoUrl( row[6] || ""),
                  det_img_url_list: (row as string[]).slice(6, 11).map(v=>new FotoUrl(v)).filter(v => v.getUrl()!==""),
                  fecha:  row[14] ?  new Date(row[14]) :  undefined
                };
                this.mapProductos.set(producto.id,producto);
                array.push(producto);
              }
              s.next(array)
              console.log(array);
          } )

      })

  }

  getProductDetail(id: string):  Observable<Product>
  {

      let det_img_url_list_mock = [
        "assets/images/yolanda/diadema1.jpeg",
        "assets/images/yolanda/diadema2.jpeg"
      ];
      let p = this.mapProductos.get(id) || {} as Product;
      return of(p);

  }

}
