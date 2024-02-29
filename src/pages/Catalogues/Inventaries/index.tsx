import AdminForm from "@/components/adminForm"
import ProductCards from "@/components/productCards"


const Inventaries = () => {
  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {/* <Button onClick={()=>navigate('/catalogues/products/add')}>New Product</Button> */}
            {/* <UserNav /> */}
          </div>
        </div>
        {/* <DataTable data={} columns={columns} /> */}

        {/* DataTable Start */}
          {/* <DataTable columns={columns} data={products} /> */}
        {/* DataTable End */}
        <AdminForm />
        <div className='md:col-span-2'>
          <p className='text-2xl pt-3 md:pt-0'>Shopping Cards</p>
          <ProductCards />
        </div>

    </div>
  )
}

export default Inventaries