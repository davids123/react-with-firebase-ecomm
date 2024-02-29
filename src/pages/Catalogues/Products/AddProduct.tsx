import  { useEffect, useState } from 'react'


import { useCategoryListQuery } from '../../../redux/services/categoryService';
import { useBrandListQuery } from '../../../redux/services/brandService';
import { Separator } from '@/components/ui/separator';
import AddProductForm from './forms/add/add-product-form';

const AddProduct = () => {
    const [categories, setCategories] = useState<any>([]);
    const [brands, setBrands] = useState<any>([]);
    // const [title, setTitle] = useState("");
    // const [price, setPrice] = useState("");
    // const [description, setDescription] = useState("");
    // const [quantity, setQuantity] = useState("");
    // const [brand, setBrand] = useState("");
    // const [sold, setSold] = useState("");
    // const [size, setSize] = useState([]);
    // const [thumbnail, setThumbnail] = useState("");
    // const [images, setImages] = useState([]);
    // const [color, setColor] = useState([]);
    // const [tags, setTags] = useState("");
    // const [totalrating, setTotalrating] = useState("");


    //const [createProduct, response] = useCreateProductMutation();
    const { data: categoryData } = useCategoryListQuery();
    const { data: brandData } = useBrandListQuery();

    useEffect(() => {
        if (categoryData) {
            setCategories(categoryData);
        }
        if (brandData) {
            setBrands(brandData);
        }
    }, [categoryData, brandData])

    // const handleSubmit = async (e: any) => {
    //     e.preventDefault();
    //     const data = { title: title, description: description, }
    //     alert(JSON.stringify(data));
    // }
    console.log(categories);
    console.log(brands);
    return (
        <>
            <div className="hidden space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Products</h2>
                    <p className="text-muted-foreground">
                        Manage your catalogue settings and products preferences.
                    </p>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:w-1/5">
                        {/* <SidebarNav items={sidebarNavItems} /> */}
                        <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                            {/* <Link to={`/catalogues/products/edit/${id}`} className='hover:bg-transparent hover:underline justify-start'>
                                Product
                            </Link> */}
                        </nav>
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-medium">Edit Product</h3>
                                <p className="text-sm text-muted-foreground">
                                    Customize the product of the app
                                </p>
                            </div>
                            <Separator />
                            {/* Form Start */}
                            <AddProductForm />
                            {/* Form End */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddProduct