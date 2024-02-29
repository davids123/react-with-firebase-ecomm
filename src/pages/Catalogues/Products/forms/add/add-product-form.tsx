import { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Link, useNavigate } from "react-router-dom";
import { useBrandListQuery } from '@/redux/services/brandService'
import { useCategoryListQuery } from '@/redux/services/categoryService'
import { useCreateProductMutation } from '@/redux/services/productService'


const productFormSchema = z.object({
  title: z.string()
    .min(5, {message: "Title must be at least 5 characters.",})
    .max(300, {message: "Title must not be longer than 300 characters.",}),
  category: z.string({required_error: "Please select an category to display.",}),
  brand: z.string({required_error: "Please select an brand to display.",}),
  description: z.string(),
  price:z.coerce.number().int().gte(1),
  quantity:z.coerce.number().int(),
  sold:z.coerce.number().int(),
  thumbnail:z.string(),
  images: z
    .array(
      z.object({
        url: z.string().url({ message: "Please enter a valid URL." }),
      })
    )
    .optional(),
})

type ProductFormValues = z.infer<typeof productFormSchema>








const AddProductForm = () => {
  //Fatching data
    const navigate = useNavigate();
    //const [product,setProduct] = useState<any>({});
    const [categories,setCategories] = useState<any>([]);
    const [brands,setBrands] = useState<any>([]);
    
    //const {data:productData,isLoading:isProductLoading,error:productError} = useSingleProductQuery(id!);
    const {data:categoryData,error:categoryError} = useCategoryListQuery();
    const {data:brandData,error:brandError} =useBrandListQuery();
    const [
      createProduct,
      {
        data:createProductData,        
        error:createProductError,
      }
    ] = useCreateProductMutation();
    


    useEffect(()=>{
      if(categoryError){
        console.log(categoryError);
      }
      if(brandError){
        console.log(brandError);
      }
      
    },[categoryError,brandError]);
    useEffect(()=>{
      if(brandData){
        setBrands(brandData);
      }
      if(categoryData){
        setCategories(categoryData);
      }
      
    },[brandData,categoryData]);

    //console.log(productFormSchema.safeParse(product?.title));
    
  // Product Form
  // This can come from your database or API.
  const defaultValues: Partial<ProductFormValues> = {
    title:'',
    category:'',
    brand:'',
    description:'',
    price:0,
    quantity:0,
    sold:0,
    thumbnail:'',
    images: [
      { url: "https://shadcn.com" },
      { url: "http://twitter.com/shadcn" },
    ],
  };
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields, append } = useFieldArray({
    name: "images",
    control: form.control,
  })

  async function onSubmit(data: ProductFormValues) {
    try{
      
      await createProduct(data);
      // toast({
      //   title: "You submitted the following values:",
      //   description: (
      //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      //     </pre>
      //   ),
      // })
    }catch(err){
      console.error(err);
    }
  }

  useEffect(()=>{
    if(createProductError){
      console.log(createProductError);
    }
    if(createProductData){
      console.log(createProductData);
      setTimeout(()=>{
        toast({
          title: "Product created successfully !",          
        })
        navigate('/catalogues/products');
      },300);
    }
  },[createProductData,createProductError]);
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter product title ..." {...field} /> 
                
              </FormControl>
              <FormDescription>
                This is your public display title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified category to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((item:any,index:any)=>{
                    return(
                      <SelectItem value={item?.title} key={index}>{item?.title}</SelectItem>
                    )
                  })}                 
                  
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage category in your{" "}
                <Link to="/examples/forms"> settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified brand to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {brands.map((item:any,index:any)=>{
                    return(
                      <SelectItem value={item?.title} key={index}>{item?.title}</SelectItem>
                    )
                  })}                  
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage brand in your{" "}
                <Link to="/examples/forms"> settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descriptions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter description ..."
                  className="h-full min-h-[200px] lg:min-h-[300px] xl:min-h-[300px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations to
                link to them.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input  placeholder="Enter price ..." {...field} />
                {/* <Textarea
                  placeholder="Enter product title..."
                  className="resize-none"
                  {...field}
                /> */}
              </FormControl>
              <FormDescription>
                This is your public display price.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input  placeholder="Enter quantity ..." {...field} />
                {/* <Textarea
                  placeholder="Enter product title..."
                  className="resize-none"
                  {...field}
                /> */}
              </FormControl>
              <FormDescription>
                This is your private display price.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sold</FormLabel>
              <FormControl>
                <Input  placeholder="Enter sold ..." {...field} />
                {/* <Textarea
                  placeholder="Enter product title..."
                  className="resize-none"
                  {...field}
                /> */}
              </FormControl>
              <FormDescription>
                This is your private display price.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Single Image</FormLabel>
              <FormControl>
                <Input placeholder="Enter image url http://example.com .." {...field} />
                {/* <Textarea
                  placeholder="Enter product title..."
                  className="resize-none"
                  {...field}
                /> */}
              </FormControl>
              <FormDescription>
                Please  thumbnail image url in your product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`images.${index}.url`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Images
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add image to your products, blog, or social media profiles.
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ url: "" })}
          >
            Add URL
          </Button>
        </div>
        <Button type="submit">Save Change</Button>
      </form>
    </Form>
  )
}

export default AddProductForm