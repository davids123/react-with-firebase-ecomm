import Spinner from "@/components/Spinner";
import { Payment, columns } from "@/components/category/columns";
import { DataTable } from "@/components/category/data-table";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-nav";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


async function getData(): Promise<Payment[]> {    
    return [
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },      
    ]
}

export default function Category(){
    const navigate = useNavigate();
    const [loading,setLoading] = useState<boolean>(true);
    const [categories,setCategories] = useState<any>([]);
    //console.log(categories);
    useEffect(()=>{
        const getTableData = async()=>{
            const data = await getData()
            setCategories(data);
            setTimeout(()=>{        
                setLoading(false);        
            },1000);
        }
        return () =>{
            getTableData();
        }
      
    },[]);
    console.log(categories);
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
                    <Button onClick={()=>navigate('/catalogues/category/add-category')}>New Category</Button>
                    <UserNav />
                </div>
                </div> 
                <DataTable columns={columns} data={categories}/>
            </div>
        }
        </>
    )
}