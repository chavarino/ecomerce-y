import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../services/data.service';
import { FotoUrl, Product } from '../../interfaces/product';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA)  data : string, private dataServ : DataService) {

        this.id = data;
     }
  id : string;
  img_selected : FotoUrl = new FotoUrl("");
  p_detail : Product = {
    det_img_url_list: [],
    des_categ :"",
    id : "",
    precio : 0,
    thumbnail_img_url : new FotoUrl(""),
    titulo : ""
  } as Product;


 


  close()
  {
    this.dialogRef.close({
      msg:"OK"
    })
  }

  setImageSelected(img:FotoUrl)
  {
    this.img_selected = img;
  }
  ngOnInit(): void {

    this.dataServ.getProductDetail(this.id)
    .pipe(tap((v)=> console.log(v)))
    .subscribe(p => {
      this.p_detail = p;
      this.img_selected = p.det_img_url_list && p.det_img_url_list[0] ? p.det_img_url_list[0] : new FotoUrl("");
      
    });
  }

}
