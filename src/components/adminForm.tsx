import { ProductsContext } from "@/context/products-context";
import { getProducts, uploadProduct } from "@/utils/firebase";
import { useContext,useRef, useState } from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useForm,Controller,SubmitHandler } from "react-hook-form";
import { 
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "./ui/tabs";
import { Button } from "./ui/button";
//import { Separator } from "./ui/separator";
import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
 } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { AuthContext } from "@/context/auth-context";


// const defaultInputs = {
//     name:'',
//     price:0
// };

type ProductDataProps = {
    title:string;
    price:number;
    selling_price:number;
    description:string;
    sku:string;
    brand:string;
    category:string;
    userId:string | undefined;
    slug?:string;
    images?:[{urls:string;}];
    colour?:[
        {
            colorId:string,
            title:string,
            value:string,
        }
    ];
    tags?:[{tag:string;}];
    ratings?:[
        {
            userId:string,
            thumbnail:string,
            message:string,
            rating:number,
        }
    ];
    rating?:number;
    sizes?:[{size:string;}];
    storeId?:string;

}

export default function AdminForm(){
    const fileRef = useRef(null);
    const {currentUser} = useContext(AuthContext);
    const [fileUpload, setFileUpload] = useState<FileList | null>(null)
    //const [formFields, setFormFields] = useState(defaultInputs)
    const [disabled, setDisabled] = useState(false);
    const { setProducts } = useContext(ProductsContext);
    const {control,handleSubmit,formState:{errors}} = useForm<ProductDataProps>({
        defaultValues:{
            title:"",
            price:0,
            selling_price:0,
            description:"",
            sku:"",
            brand:"",
            category:"",
            slug:"",
            images:[{urls:""}],
            colour:[{
                colorId:"",
                title:"",
                value:"",
            }],
            tags:[{tag:""}],
            ratings:[
                {
                    userId:"ssss",
                    thumbnail:"ssss",
                    message:"dddd",
                    rating:0
                }
            ],
            rating:0,
            sizes:[{size:"10 PX"}],
            storeId:""

        }

    })

    // const handleSubmit = async(e:{preventDefault:()=>void})=>{
    //     e.preventDefault();
    //     setDisabled(true);
    //     alert('ok');

    //     if(fileUpload){
    //         const inputFile = fileRef.current as HTMLInputElement | null;
    //         const res = await uploadProduct(
    //             formFields,
    //             fileUpload[0],
    //             fileUpload[0].name
    //         );

    //         if(res && inputFile){
    //             setDisabled(false);
    //             setFormFields(defaultInputs);
    //             setFileUpload(null);


    //             // Context
    //             const products = await getProducts();
    //             if (products) {
    //                 setProducts(products)
    //             }

    //             //Clear the file upload value
    //             inputFile.value = '';
    //         }
    //     }

    // }

    // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target
    //     setFormFields({...formFields, [name]: value })
    // }

    const onSubmit:SubmitHandler<ProductDataProps> = async(data)=>{
        data.userId = currentUser?.uid;
        //alert(JSON.stringify(data));
        setDisabled(true);
        if(fileUpload){
            const inputFile = fileRef.current as HTMLInputElement | null;
            const res = await uploadProduct(
                data,
                fileUpload[0],
                fileUpload[0].name
            );

            if(res && inputFile){
                setDisabled(false);
                setFileUpload(null);


                // Context
                const products = await getProducts();
                if (products) {
                    setProducts(products)
                }
            }

            
        }
    }

    /**
    *  Tailwind class:
    * .inpt {
    *   @apply border border-[#918e8e] border-solid 
    *   rounded-xl bg-[#3a3636] hover:bg-[#474444] 
    *   cursor-pointer w-11/12 p-2 my-3;
    *  }
    */
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* <div>
                <input 
                    className="inpt"
                    type='text'
                    name='name'
                    value={formFields.name || ''}
                    disabled={disabled}
                    placeholder='Product Name'
                    onChange={handleChange}
                    required
                />
                <input
                    className='inpt'
                    type='number'
                    name='price'
                    step="0.01"
                    min='0'
                    value={formFields.price || ''}
                    disabled={disabled}
                    placeholder='Price'
                    onChange={handleChange}
                    required
                />
                <input
                    ref={fileRef}
                    className='inpt'
                    type="file"
                    name="image"
                    accept=".png, .jpg, .jpeg"
                    disabled={disabled}
                    onChange={(e) => setFileUpload(e.target.files)}
                    required
                />
            </div>
            <div className='flex justify-start ml-3 mt-2'>
                <button disabled={disabled} type="submit">
                    {disabled ? 'Loading' : 'Submit'}
                </button>
            </div> */}
            <Tabs defaultValue="product_info" className="w-[1200px]">
                <div className="space-between flex items-center">
                    <TabsList>
                        <TabsTrigger value="product_info" className="relative">
                            Product Information
                        </TabsTrigger>
                        <TabsTrigger value="product_veration">
                            Product Variation
                        </TabsTrigger>
                        <TabsTrigger value="product_media" >
                          Product Media
                        </TabsTrigger>
                    </TabsList>
                    <div className="ml-auto mr-4">
                        <Button type="submit">
                          <PlusCircledIcon className="mr-2 h-4 w-4" />
                          Save Change
                        </Button>
                    </div>
                </div>
                <TabsContent
                      value="product_info"
                      className="border-none p-0 outline-none"
                >
                     <Card>
                     
                        <CardHeader>
                            <CardTitle>Product Information</CardTitle>
                            <CardDescription>
                            Make changes to product information here. Click save when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Product Title</Label>
                                <Controller 
                                    name="title"
                                    control={control}
                                    rules={{
                                        required:'Title is required',
                                        minLength:{
                                            value:6,
                                            message:'Title should be at least 6 characters long'
                                        },
                                        maxLength:{
                                            value:300,
                                            message:'Title should be max 300 characters long'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <Input {...field} />
                                            {errors.title && <p role="alert">{errors.title.message}</p>}
                                        </>
                                    )}

                                />
                            
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username"> Price</Label>
                                <Controller 
                                    name="price"
                                    control={control}
                                    rules={{
                                        required:'Price is required',
                                        minLength:{
                                            value:1,
                                            message:'Price should be at least 1 characters long'
                                        },
                                        maxLength:{
                                            value:300,
                                            message:'Title should be max 300 characters long'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <Input {...field} />
                                            {errors.price && <p role="alert">{errors.price.message}</p>}
                                        </>
                                    )}

                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Selling Price</Label>
                                <Controller 
                                    name="selling_price"
                                    control={control}
                                    rules={{
                                        required:'Selling Price is required',
                                        minLength:{
                                            value:1,
                                            message:'Selling Price should be at least 1 characters long'
                                        },
                                        maxLength:{
                                            value:300,
                                            message:'Selling Title should be max 300 characters long'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <Input {...field} />
                                            {errors.selling_price && <p role="alert">{errors.selling_price.message}</p>}
                                        </>
                                    )}

                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Product Description</Label>
                                <Controller 
                                    name="description"
                                    control={control}
                                    rules={{
                                        required:'Description is required',
                                        minLength:{
                                            value:10,
                                            message:'Description should be at least 10 characters long'
                                        },
                                        
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <Input {...field} />
                                            {errors.description && <p role="alert">{errors.description.message}</p>}
                                        </>
                                    )}

                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Product SKU</Label>
                                <Controller 
                                    name="sku"
                                    control={control}
                                    rules={{
                                        required:'SKU is required',
                                        minLength:{
                                            value:5,
                                            message:'SKU should be at least 5 characters long'
                                        },
                                        maxLength:{
                                            value:30,
                                            message:'SKU should be max 300 characters long'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <Input {...field} />
                                            {errors.sku && <p role="alert">{errors.sku.message}</p>}
                                        </>
                                    )}

                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Brand</Label>
                                <Controller 
                                    name="brand"
                                    control={control}
                                    rules={{
                                        required:'Brand is required',
                                        minLength:{
                                            value:3,
                                            message:'Brand should be at least 3 characters long'
                                        },
                                        maxLength:{
                                            value:30,
                                            message:'Brand should be max 300 characters long'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <Input {...field} />
                                            {errors.brand && <p role="alert">{errors.brand.message}</p>}
                                        </>
                                    )}

                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Category</Label>
                                <Controller 
                                    name="category"
                                    control={control}
                                    rules={{
                                        required:'Category is required',
                                        minLength:{
                                            value:3,
                                            message:'Category should be at least 3 characters long'
                                        },
                                        maxLength:{
                                            value:30,
                                            message:'Category should be max 300 characters long'
                                        }
                                    }}
                                    render={({ field }) => (
                                        <>
                                            <Input {...field} />
                                            {errors.category && <p role="alert">{errors.category.message}</p>}
                                        </>
                                    )}

                                />
                            </div>
                        </CardContent>
                        {/* <CardFooter>
                            <Button>Save changes</Button>
                        </CardFooter> */}
                     </Card>                    
                </TabsContent>
                <TabsContent
                    value="product_veration"
                    className="h-full flex-col border-none p-0 data-[state=active]:flex"
                >
                    <Card>
                     
                     <CardHeader>
                         <CardTitle>Account</CardTitle>
                         <CardDescription>
                         Make changes to your account here. Click save when you're done.
                         </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-2">
                         <div className="space-y-1">
                         <Label htmlFor="name">Name</Label>
                         <Input id="name" defaultValue="Pedro Duarte" />
                         </div>
                         <div className="space-y-1">
                         <Label htmlFor="username">Username</Label>
                         <Input id="username" defaultValue="@peduarte" />
                         </div>
                     </CardContent>
                     <CardFooter>
                         <Button>Save changes</Button>
                     </CardFooter>
                  </Card>
                    
                </TabsContent>
                <TabsContent
                    value="product_media"
                    className="h-full flex-col border-none p-0 data-[state=active]:flex"
                >
                    <Card>
                     
                     <CardHeader>
                         <CardTitle>Media Upload</CardTitle>
                         <CardDescription>
                         Make changes media file.
                         </CardDescription>
                     </CardHeader>
                     <CardContent className="space-y-2">
                         
                         <div className="space-y-1">
                            <Label htmlFor="username">File Upload</Label>
                            <Input
                                ref={fileRef}
                                className='inpt'
                                type="file"
                                name="image"
                                accept=".png, .jpg, .jpeg"
                                disabled={disabled}
                                onChange={(e) => setFileUpload(e.target.files)}
                                required
                            />
                         </div>
                     </CardContent>
                     {/* <CardFooter>
                         <Button>Save changes</Button>
                     </CardFooter> */}
                  </Card>
                    
                </TabsContent>

            </Tabs>
            
        </form>
    )   
}