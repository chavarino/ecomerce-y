export interface Product {

    precio: number,
    titulo : string,
    thumbnail_img_url : FotoUrl,
    descripcion ?: string,
    des_categ : string,
    id :string,

    det_img_url_list ?: FotoUrl[

    ],

    fecha ?: Date
    

}


export class FotoUrl {

    private static base : string ="https://drive.google.com/uc?export=view&id="
    constructor(private id:string)
    {

    }


    getUrl()
    {
        return  this.id && this.id!=="" ? FotoUrl.base + this.id : "";
    }
}
