import { Separator } from "@/components/ui/separator";

import {  useRef, useState } from "react";
import { useForm,SubmitHandler } from "react-hook-form";
//import { useNavigate } from "react-router-dom";
import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { uploadBrand } from "@/utils/firebase";
import { useToast } from "@/components/ui/use-toast";

type BrandFormProps = {
    title:string;
    slug:string;
    description:string;
}

export default function AddBrand(){
    const fileRef = useRef(null);
    //const navigate = useNavigate(); 
    const [disabled, setDisabled] = useState(false);
    const { toast } = useToast();
    //const { setProducts } = useContext(ProductsContext);
    const [fileUpload, setFileUpload] = useState<FileList | null>(null);

    const {
        register,
        //control,
        handleSubmit,
        //formState: { errors }
      } = useForm<BrandFormProps>({
        defaultValues: {
          title:"",
          slug:"",
          description:"",
        }
    })
    const onSubmit:SubmitHandler<BrandFormProps> = async(data)=>{
        console.log(data);
        setDisabled(true);
        if(fileUpload){
            const inputFile = fileRef.current as HTMLInputElement | null;
            const res = await uploadBrand(
                data,
                fileUpload[0],
                fileUpload[0].name
            );

            if(res && inputFile){
                setDisabled(false);
                setFileUpload(null);


                // Context
                // const products = await getProducts();
                // if (products) {
                //     setProducts(products)
                // }
                setTimeout(()=>{
                    toast(
                        {
                            title:'Brand Create Successfully !',
                            description:'Got brand list'
                        }
                    )
                    //navigate('');
                },300);
            }
        }
        

    }
    return(
        <>
        <div className="hidden space-y-6 p-10 pb-16 md:block">
                <div className="space-y-0.5">
                    <h2 className="text-2xl font-bold tracking-tight">Brand Create</h2>
                    <p className="text-muted-foreground">
                        Manage your catalogue settings and brand preferences.
                    </p>
                </div>
                <Separator className="my-6" />
                {/* form start */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Brand Information</CardTitle>
                            <CardDescription>
                            What area are you having problems with?
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="area">Brand Title</Label>
                                    <Input
                                        {...register("title")}                
                                        placeholder="Please enter brand title."                                    
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="area">Slug</Label>
                                    <Input
                                        {...register("slug")}                
                                        placeholder="Please enter brand title."                                    
                                    />
                                </div>                                
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Please include all information relevant to your issue."
                                    {...register("description")}
                                    rows={3}
                                />
                            </div>
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
                        </CardContent>
                        <CardFooter className="justify-between space-x-2">
                            <Button variant="ghost">Cancel</Button>
                            <Button>Save</Button>
                        </CardFooter>
                    </Card>

                </form>

                {/* endform */}
        </div>
        </>
    )
}