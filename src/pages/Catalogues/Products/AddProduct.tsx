



import { Separator } from '@/components/ui/separator';
import AddProductForm from './forms/add/add-product-form';

const AddProduct = () => {
    
    return (
        <>
            <div className="hidden space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Product Create</h2>
                    <p className="text-muted-foreground">
                        Manage your catalogue settings and products preferences.
                    </p>
                </div>
                <Separator className="my-6" />
                <AddProductForm />
                {/* <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">                        
                        <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">                            
                        </nav>
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium">Basic Product Details</h3>
                                <p className="text-sm text-muted-foreground">
                                    Customize the product of the app
                                </p>
                            </div>
                            <Separator />                            
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    )
}

export default AddProduct