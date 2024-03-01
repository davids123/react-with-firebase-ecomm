import Spinner from "@/components/Spinner";
import {  columns } from "@/components/brands/columns";
import { DataTable } from "@/components/brands/data-table";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";

import { getBrands } from "@/utils/firebase";
import {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// async function getData(): Promise<BrandProps[]> {
    
//     return [
//       {
//         id: "728ed52f",
//         title: 'sssss',
//         slug: "pending",
//         description: "m@example.com",        
//         thumbnail:'',
//         created_at:'',
//         updated_at:''
//       },      
//     ]
// }


export default function Brand(){
    const navigate = useNavigate();
    const [loading,setLoading] = useState<boolean>(true);    
    //const { brands } = useContext(ProductsContext);
    const [brands,setBrands] = useState<any>([]);    
    
    useEffect(()=>{
        const getTableData = async()=>{
            const data = await getBrands();
            //const { brands } = useContext(ProductsContext); 
            setBrands(data)
            setTimeout(()=>{        
                setLoading(false);        
            },1000);
        }
        return()=>{
            getTableData(); 
        }
    },[]);
    
    return(
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
                    <Button onClick={()=>navigate('/catalogues/brand/add-brand')}>New Brand</Button>
                    <UserNav />
                </div>
                </div> 
                <div className="container mx-auto py-10">
                    <DataTable columns={columns} data={brands} />
                </div>
            </div>
        }
        
        </>
    )
}