export interface Product_types {
    id:string,
    title:string,
    slug:{
        type:'slug',
        current:string
    },
    description:string,
    price:number,
    image: { asset: { _ref: string } }; 
    detailImage_2: { asset: { _ref: string } }; 
    detailImage_3: { asset: { _ref: string } }; 
    category:string

}