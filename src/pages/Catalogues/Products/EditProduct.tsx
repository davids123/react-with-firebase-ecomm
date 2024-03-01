import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';



import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from '@/components/ui/card';
import {  doc, updateDoc } from "firebase/firestore";
import { db, getProduct } from "@/utils/firebase";

import { AuthContext } from "@/context/auth-context";
import Spinner from "@/components/Spinner";
import { useToast } from "@/components/ui/use-toast";



type ProductDataProps = {
    title: string;
    price: number;
    selling_price: number;
    description: string;
    sku: string;
    brand: string;
    category: string;
    userId: string | undefined;
    qty: number;
    slug?: string;
    images?: [{ urls: string; }];
    colour?: [
        {
            colorId: string,
            title: string,
            value: string,
        }
    ];
    tags?: [{ tag: string; }];
    ratings?: [
        {
            userId: string,
            thumbnail: string,
            message: string,
            rating: number,
        }
    ];
    rating?: number;
    sizes?: any;
    storeId?: string;

}

const EditProduct = () => {
    const fileRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast()
    const [fileUpload, setFileUpload] = useState<FileList | null>(null);
    const [disabled, setDisabled] = useState(false);
    const { id } = useParams();
    console.log(id);
    const { currentUser } = useContext(AuthContext);
    console.log("Current user Id", currentUser?.uid);


    const { control, handleSubmit, formState: { errors }, setValue } = useForm<ProductDataProps>({
        defaultValues: {
            title: "",
            price: 0,
            selling_price: 0,
            description: "",
            sku: "",
            brand: "",
            category: "",
            slug: "",
            images: [{ urls: "" }],
            colour: [{
                colorId: "",
                title: "",
                value: "",
            }],
            tags: [{ tag: "" }],
            ratings: [
                {
                    userId: "",
                    thumbnail: "",
                    message: "",
                    rating: 0
                }
            ],
            rating: 0,
            sizes: [{ size: "10 PX" }],
            storeId: ""
        }

    })

    const onSubmit: SubmitHandler<ProductDataProps> = async (data) => {
        data.userId = currentUser?.uid;
        toast({
            title:'Product Indormation',
            description:JSON.stringify(data)
        })
        setDisabled(true);
          if(fileUpload){
              //const inputFile = fileRef.current as HTMLInputElement | null;
            //   const res = await uploadProduct(
            //       data,
            //       fileUpload[0],
            //       fileUpload[0].name
            //   );

            //   if(res && inputFile){
            //       setDisabled(false);
            //       setFileUpload(null);


            //       // Context
            //       const products = await getProducts();
            //       if (products) {
            //           setProducts(products)
            //       }
            //   }


        }
        try {
            if (id) {
                const updatedData =  await updateDoc(doc(db, "products", id), data);
                console.log(updatedData);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        
            const getProductData = async () => {
                if (id) {
                    // const ref = await getDoc(doc(db,"products",id));
                    // //const product  = useFirestore
                    // console.log(ref.data());
                    setLoading(true);
                    const product = await getProduct(id);
                    console.log(product);

                    setValue("title", product?.title);
                    setValue("price", product?.price);
                    setValue("selling_price", product?.selling_price);
                    setValue("description", product?.description);
                    setValue("sku", product?.sku);
                    setValue("brand", product?.brand);
                    setValue("category", product?.category);
                    setValue("qty", product?.qty);
                    setValue("sizes", product?.sizes);
                    
                    
                }
            }
            return () => {
                getProductData();
                setTimeout(()=>{
                    setLoading(false);
                },300)
            }
        




    }, [id])


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
                                Here&apos;s product will be update !
                            </p>
                        </div>
                    </div>

                    {/* Edit form start */}
                    <form onSubmit={handleSubmit(onSubmit)}>

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
                                            Make changes to product information here. Click save change when you're done.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="space-y-1">
                                            <Label htmlFor="name">Product Title</Label>
                                            <Controller
                                                name="title"
                                                control={control}
                                                rules={{
                                                    required: 'Title is required',
                                                    minLength: {
                                                        value: 6,
                                                        message: 'Title should be at least 6 characters long'
                                                    },
                                                    maxLength: {
                                                        value: 300,
                                                        message: 'Title should be max 300 characters long'
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
                                                    required: 'Price is required',
                                                    minLength: {
                                                        value: 1,
                                                        message: 'Price should be at least 1 characters long'
                                                    },
                                                    maxLength: {
                                                        value: 300,
                                                        message: 'Title should be max 300 characters long'
                                                    }
                                                }}
                                                render={({ field }) => (
                                                    <>
                                                        <Input {...field}
                                                        //type="number"
                                                        />
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
                                                    required: 'Selling Price is required',
                                                    minLength: {
                                                        value: 1,
                                                        message: 'Selling Price should be at least 1 characters long'
                                                    },
                                                    maxLength: {
                                                        value: 300,
                                                        message: 'Selling Title should be max 300 characters long'
                                                    }
                                                }}
                                                render={({ field }) => (
                                                    <>
                                                        <Input {...field}
                                                        //type="number"
                                                        />
                                                        {errors.selling_price && <p role="alert">{errors.selling_price.message}</p>}
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
                                                    required: 'SKU is required',
                                                    minLength: {
                                                        value: 5,
                                                        message: 'SKU should be at least 5 characters long'
                                                    },
                                                    maxLength: {
                                                        value: 30,
                                                        message: 'SKU should be max 300 characters long'
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
                                            <Label htmlFor="username">Quantity</Label>
                                            <Controller
                                                name="qty"
                                                control={control}
                                                rules={{
                                                    required: 'Quantity is required',
                                                    minLength: {
                                                        value: 1,
                                                        message: 'Quantity should be at least 1 characters long'
                                                    }

                                                }}
                                                render={({ field }) => (
                                                    <>
                                                        <Input {...field}
                                                            type="number"
                                                        />
                                                        {errors.qty && <p role="alert">{errors.qty.message}</p>}
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
                                                    required: 'Description is required',
                                                    minLength: {
                                                        value: 10,
                                                        message: 'Description should be at least 10 characters long'
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
                                            <Label htmlFor="username">Brand</Label>
                                            <Controller
                                                name="brand"
                                                control={control}
                                                rules={{
                                                    required: 'Brand is required',
                                                    minLength: {
                                                        value: 3,
                                                        message: 'Brand should be at least 3 characters long'
                                                    },
                                                    maxLength: {
                                                        value: 30,
                                                        message: 'Brand should be max 300 characters long'
                                                    }
                                                }}
                                                render={({ field: { onChange, onBlur, value, name } }) => {
                                                    //console.log(field);
                                                    return (
                                                        <>
                                                            {/* <Input {...field} />
                                                    {errors.brand && <p role="alert">{errors.brand.message}</p>} */}
                                                            <select
                                                                name={name}
                                                                onBlur={onBlur}
                                                                onChange={onChange}
                                                                value={value}
                                                            >
                                                                <option value="">select brand</option>
                                                                <option value="Apple">Apple</option>
                                                                <option value="Sony">Sony</option>
                                                                <option value="Hp">Hp</option>
                                                            </select>
                                                            {errors.brand && <p role="alert">{errors.brand.message}</p>}



                                                        </>
                                                    )
                                                }
                                                }

                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="username">Category</Label>
                                            <Controller
                                                name="category"
                                                control={control}
                                                rules={{
                                                    required: 'Category is required',
                                                    minLength: {
                                                        value: 3,
                                                        message: 'Category should be at least 3 characters long'
                                                    },
                                                    maxLength: {
                                                        value: 30,
                                                        message: 'Category should be max 300 characters long'
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
                                        <div className="space-y-1">
                                            <Label htmlFor="username">Size</Label>
                                            <Controller
                                                control={control}
                                                rules={{
                                                    maxLength: 100,
                                                }}
                                                render={({ field: { onChange, onBlur, value } }) => (
                                                    <Textarea
                                                        placeholder="Write a size in array"
                                                        className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        value={value}
                                                    />
                                                )}
                                                name="sizes"
                                            />
                                            {/* <Textarea
                                    placeholder="Write a size in array" 
                                    className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                                /> */}
                                        </div>
                                    </CardContent>
                                    {/* <CardFooter>
                         <Button>Save changes</Button>
                     </CardFooter> */}
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

                    {/* Edit form end */}


                </div>
            }




        </>
    )
}

export default EditProduct