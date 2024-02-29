import { Button } from "@/components/ui/button"
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader,
    CardFooter,
    CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useForm,Controller,SubmitHandler } from "react-hook-form";
import {  useState } from "react"
import Spinner from "@/components/Spinner";
import { useToast } from "@/components/ui/use-toast";
import { registerUser } from "@/firebase/firebase";



type SignUpData = {
    displayName: string;
    email:string;
    mobile:string;
    password:string;
    confirmPassword:string;
}

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUp = () => {
    const [loading,setLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const {control,handleSubmit,formState: { errors },watch} = useForm<SignUpData>({
        defaultValues: {
            displayName:"",
            email: "",
            mobile:"",
            password: "",
            confirmPassword:'',
        },
    });

    const pwd = watch('password');    

    const onSubmit: SubmitHandler<SignUpData> = async(data) => {
        
        try{
            setLoading(true);         
            const {displayName,email,password} = data;
            // The user will be login upon successful registration.
            const user = await registerUser(displayName,email,password);
            console.log(user);
            toast({
                title:'User Register Successfully',
                description:JSON.stringify(user)
            });
        }catch(error:any){
            if (error.code === 'auth/email-already-in-use') {
                alert('Email already exists!')
            }
        }finally{
            setLoading(false);
        }
    }

    console.log(loading);
    return loading ? (<Spinner />) : (
        <div className="flex justify-center">            
                <Card>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Create an account</CardTitle>
                        <CardDescription>
                            Enter your email below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid grid-cols-2 gap-6">
                            <Button variant="outline">
                                {/* <Icons.gitHub className="mr-2 h-4 w-4" /> */}
                                Github
                            </Button>
                            <Button variant="outline">
                                {/* <Icons.google className="mr-2 h-4 w-4" /> */}
                                Google
                            </Button>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Name</Label>
                            <Controller 
                                name="displayName"
                                control={control}
                                rules={{
                                    required:'Name is required',
                                    minLength:{
                                        value:3,
                                        message:'Name should be at least 3 characters long'
                                    },
                                    maxLength:{
                                        value:24,
                                        message:'Name should be max 24 characters long'
                                    }
                                }}
                                render={({ field }) => (
                                    <>
                                        <Input {...field} />
                                        {errors.displayName && <p role="alert">{errors.displayName.message}</p>}
                                    </>
                                )}

                            />

                            
                            
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>                            
                            <Controller 
                                name="email"
                                control={control}
                                rules={{
                                    required:'Email is required',
                                    pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
                                }}
                                render={({ field }) => (
                                    <>
                                        <Input {...field} />
                                        {errors.email && <p role="alert">{errors.email.message}</p>}
                                    </>
                                )}
                                
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="mobile">Phone</Label>
                            <Controller 
                                name="mobile"
                                control={control}
                                rules={{
                                    required:'Phone is required',
                                    minLength:{
                                        value:10,
                                        message:'Phone number should be at least 10 characters long'
                                    },
                                    maxLength:{
                                        value:10,
                                        message:'Phone number should be max 10 characters long'
                                    }
                                }}
                                render={({ field }) => (
                                    <>
                                        <Input {...field} />
                                        {errors.mobile && <p role="alert">{errors.mobile.message}</p>}
                                    </>
                                )}
                                
                            />
                            
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>                            
                            <Controller 
                                name="password"
                                control={control}
                                rules={{
                                    required:'Password is required',
                                    minLength:{
                                      value:6,
                                      message:'Password should be at least 6 characters long'
                                    }
                                }}
                                render={({ field }) => (
                                    <>
                                        <Input 
                                            type="password"
                                            {...field} 
                                        />
                                        {errors.password && <p role="alert">{errors.password.message}</p>}
                                    </>
                                )}
                                
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password"> Confirm Password</Label>                            
                            <Controller 
                                name="confirmPassword"
                                control={control}
                                rules={{
                                    validate: (value:any) => value === pwd || 'Password do not match',
                                }}
                                render={({ field }) => (
                                    <>
                                        <Input 
                                            type="password"
                                            {...field} 
                                        />
                                        {errors.confirmPassword && <p role="alert">{errors.confirmPassword.message}</p>}
                                    </>
                                )}
                                
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="submit" 
                            className="w-full"                            
                        >
                                Create account
                        </Button>
                    </CardFooter>
                    </form>
                </Card>            
        </div>
    )
}

export default SignUp