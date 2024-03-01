
import { 
    ReactNode, 
    createContext, 
    useEffect, 
    useState 
} from "react";
import { DocumentData } from "firebase/firestore";
import { getBrands, getProducts } from "../utils/firebase";

type Props = {
    children?: ReactNode
}

export const ProductsContext = createContext({
    products: [] as DocumentData[],
    setProducts: (_products:DocumentData[]) => {},
    brands:[] as DocumentData[],
    setBrands:(_brands:DocumentData[]) => {}

})

export const ProductsProvider = ({ children }:Props) => {
    const [products, setProducts] = useState<DocumentData[]>([]);
    const [brands,setBrands] = useState<DocumentData[]>([]);

    useEffect(() => {
      const getProductsMap = async () => {
        const productsMap = await getProducts();
        setProducts(productsMap)
      }
      const getBrandsMap = async() =>{
        const brandsMap = await getBrands();
        setBrands(brandsMap);
      }

      return () => {
        getProductsMap();
        getBrandsMap();
      }
    }, [])


    const value = {
      products,
      setProducts,
      brands,
      setBrands,
    }

    return (
      <ProductsContext.Provider 
        value={value}
      >
        {children}
      </ProductsContext.Provider>
    )
  }
  