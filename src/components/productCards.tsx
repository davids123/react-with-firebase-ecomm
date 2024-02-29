
import { useContext } from "react"
import ProductCardInfo from "./productCardInfo";
import { ProductsContext } from "@/context/products-context";

export default function ProductCards(){
    const { products } = useContext(ProductsContext);

    return(
        <div className="my-3 grid grid-cols-4 gap-1">
            {
                products.map((product:any)=>(
                    <ProductCardInfo key={product.id} product={product}/>
                ))
            }
        </div>
    )
}