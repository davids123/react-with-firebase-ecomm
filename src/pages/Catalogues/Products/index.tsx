import  { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserNav } from '@/components/user-nav';

// import { DataTable } from './DataTable/data-table';
// import {  columns } from "./DataTable/columns";
import { Button } from '@/components/ui/button';
import { ProductsContext } from '@/context/products-context';
import Spinner from '@/components/Spinner';

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ]
// }

const Products = () => {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);
    const { products } = useContext(ProductsContext);
    // const[products,setProducts] = useState<any>([]);
    // const {data:prodyctData,} = useProductListQuery();
    
    
    // useEffect(()=>{
    //     if(prodyctData){
    //         setProducts(prodyctData); 
    //     }
      
    // },[prodyctData])

    console.log(products);
    useEffect(()=>{
      setTimeout(()=>{
        setLoading(false)
      },1000);
    },[products])

  
    

  return (
    <>
    
        {loading ? 
          <Spinner /> 
          :
          <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                <p className="text-muted-foreground">
                  Here&apos;s a list of your tasks for this month!
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button onClick={()=>navigate('/catalogues/products/add')}>New Product</Button>
                <UserNav />
              </div>
            </div> 
            {/* <DataTable columns={columns} data={products} /> */}
          </div>
        }
          
        
          
        

      
    </>
  )
}

export default Products