
import { Button } from "@/components/ui/button"
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader,
    CardFooter,
    CardTitle } from "@/components/ui/card"

import { Input } from "@/components/ui/input"

// import { 
//     Form,
//     FormControl,    
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage, 
// } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { signInUser } from "@/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useState } from "react";


const defaultFormFields = {
    email: '',
    password: '',
}



const SignIn = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields
    const navigate = useNavigate()

    const resetFormFields = () => {
        return (
          setFormFields(defaultFormFields)
        );
    }
    const { toast } = useToast();
    
   
    
    
   

      async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const userCredential = await signInUser(email, password);
            if (userCredential) {
                toast({
                    title:"User Login Successfully!"
                })
                resetFormFields()
                navigate('/');
            }
        }catch(error:any){
            console.log('User Sign In Failed', error.message);
        }
        
      }

      const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormFields({...formFields, [name]: value })
      }

    return (
        <>
            <div className="flex justify-center">
                <Card>
                    
                        <form onSubmit={onSubmit}>
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-2xl">Sign in an account</CardTitle>
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
                                <Input  
                                    placeholder="example@example.com"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                    required 
                                />
                                </div>
                                <div className="grid gap-2">
                                <Input  
                                    type="password"                                    
                                    name='password'
                                    value={password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required 
                                    
                                />
                                    
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit" className="w-full">Sign in</Button>
                            </CardFooter>
                        </form>
                   
                </Card>
            </div>
            
        </>
    )
}

export default SignIn