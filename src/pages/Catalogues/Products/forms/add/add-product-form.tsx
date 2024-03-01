import { useContext, useRef, useState } from 'react'
import { useForm, useFieldArray,SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
// import { toast } from "@/components/ui/use-toast"
// import {  useNavigate } from "react-router-dom";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'

import { AuthContext } from '@/context/auth-context';
import { ProductsContext } from '@/context/products-context';
import { getProducts, uploadProduct } from '@/utils/firebase';









type FormFields = {
  title:string;
  price:number;
  selling_price:number;
  description:string;
  sku:string;
  brand:string;
  category:string;
  userId:string | undefined;
  slug?:string;
  images: {urls: string;}[] ;
  colour?:{
        colorId:string,
        title:string,
        value:string,
  }[];
  tags?:{
    tag:string;
  }[];
  ratings?:{
    userId:string,
    thumbnail:string,
    message:string,
    rating:number,
  }[];
  rating?:number;
  sizes?:{
    size:string;
  }[];
  storeId?:string;
};




const AddProductForm = () => {
    const fileRef = useRef(null);
    //const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);
    const [disabled, setDisabled] = useState(false);
    const { setProducts } = useContext(ProductsContext);
    const [fileUpload, setFileUpload] = useState<FileList | null>(null)
    const {
      register,
      control,
      handleSubmit,
      formState: { errors }
    } = useForm<FormFields>({
      defaultValues: {
        title:"",
        price:0,
        selling_price:0,
        description:'',
        sku:'',
        brand:'',
        category:'',
        slug:'',
        images: [{ urls:""}],
        colour: [{ 
          colorId:'',
          title:'',
          value:'',
        }],
        tags:[{tag:''}],
        ratings:[{
          userId:'',
          thumbnail:'',
          message:'',
          rating:0
        }],
        rating:0,
        sizes:[{  size:'' }],
        storeId:''

      },
      mode: "onBlur"
    });

    const { fields, append, remove } = useFieldArray({
      name: "images",
      control
    });
    
  
    const onSubmit:SubmitHandler<FormFields> = async(data)=>{
      data.userId = currentUser?.uid;
      console.log(data);
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
    };

  
  
  return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
            <CardDescription>
              What area are you having problems with?
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="area">Product Title</Label>
              <Textarea
                {...register("title")}                
                placeholder="Please enter product title."
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="area">Brand</Label>
              <select defaultValue="" {...register("brand")}>
                {/* <SelectTrigger id="area">
                  <SelectValue placeholder="Select"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Apple">Apple</SelectItem>
                  <SelectItem value="Acer">Acer</SelectItem>
                  <SelectItem value="Hp">Hp</SelectItem>
                  <SelectItem value="Dell">Dell</SelectItem>
                  <SelectItem value="Lanvo">Lenvo</SelectItem>
                </SelectContent> */}
                <option value="Dell">Dell</option>
                <option value="Hp">Hp</option>
                <option value="Apple">Apple</option>
              </select>
            </div>
            
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="area">Slug Url</Label>
              <Input id="subject" type='text' placeholder="Enter slug " {...register("slug")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="area">Category</Label>
              <select defaultValue="billing" {...register("category")}>
                {/* <SelectTrigger id="area">
                  <SelectValue placeholder="Select"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Cloath">Cloath</SelectItem>
                  <SelectItem value="Books">Books</SelectItem>
                  <SelectItem value="Toys">Toys</SelectItem>
                  <SelectItem value="Computers">Computers</SelectItem>
                </SelectContent> */}
                <option value="Electronics">Electronics</option>
                <option value="Books">Books</option>
                <option value="Computer">Computer</option>
              </select>
            </div>
            
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="area">Max Price</Label>
              <Input id="subject" type='text' placeholder="Enter Max Price " {...register("price")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="area">Discount Price</Label>
              <Input id="subject" type='text' placeholder="Enter Discount Price " {...register("selling_price")}/>
            </div>
            
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              placeholder="Please include all information relevant to your issue."
              {...register("description")}
            />
          </div>
          {/* <div className="grid gap-2">
            <Label htmlFor="description">Long Description</Label>
            <Textarea
              id="description"
              placeholder="Please include all information relevant to your issue."
            />
          </div> */}
          {/* <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="area">User</Label>
              <Select defaultValue="billing">
                <SelectTrigger id="area">
                  <SelectValue placeholder="Select"  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team">Team</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="account">Account</SelectItem>
                  <SelectItem value="deployments">Deployments</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="area">In Stock Total</Label>
              <Select defaultValue="billing">
                <SelectTrigger id="area">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="team">Team</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="account">Account</SelectItem>
                  <SelectItem value="deployments">Deployments</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
          </div> */}
          <div className="grid gap-2">
            <h4>Product Media</h4>
            
          </div>
          {/* <Separator className="my-6"/> */}
          <div className="grid gap-2">
            <Label htmlFor="subject">Media Url</Label>
            <Input
              ref={fileRef}             
              type='file'
              name="image"
              accept=".png, .jpg, .jpeg"
              disabled={disabled}
              onChange={(e) => setFileUpload(e.target.files)}
              required 
              placeholder="Upload image File"  
              
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="subject">Medias Urls</Label>           
            {fields.map((field, index) => {
                return(
                  <div  key={field.id}>
                    <Input  
                      type='text'
                      placeholder="urls" 
                      {...register(`images.${index}.urls` as const, {
                        required: true
                      })}
                      className={errors?.images?.[index]?.urls ? "error" : ""}
                    />
                  </div>
                )
            })}
            <div className="justify-start ">             
              <Button                
                type='button'
                onClick={() =>
                  append({
                    urls: "",                  
                  })
                }
              >Add Urls</Button>
              <Button
                variant="ghost" 
                type='button'
                onClick={() =>
                  remove(0)
                }
              >Remove Urls</Button>
            </div>
          </div>
            {/* <div className="grid gap-2">
              <Label htmlFor="subject">Medias Url</Label>
              <Input 
                id="subject" 
                type='text'  
                placeholder="name"
              />
            </div> */}
                    

          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button variant="ghost">Cancel</Button>
            <Button>Save</Button>
          </CardFooter>

        </Card>
        </form>
      </>
  )
}

export default AddProductForm