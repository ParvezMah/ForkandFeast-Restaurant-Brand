import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { Loader2, Lock, Mail } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { LoginInputState, userLoginSchema } from "./userSchema";

// No need because of UserLoginSchema
// interface loginInputState {
//     email: string,
//     password: string,
// }

const Login = () => {
    const [input, setInput] = useState<LoginInputState>({
        email:"", 
        password: "",
    });
    const [error, setError] = useState<Partial<LoginInputState>>({})

    const changeEventHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInput({...input, [name]:value});
    }

    const loginSubmitHandler = (e:FormEvent) =>{
        e.preventDefault();
        // Form Validation Start
        const result = userLoginSchema.safeParse(input);
        if(!result.success){
            const fieldErrors = result.error.formErrors.fieldErrors;
            setError(fieldErrors as Partial<LoginInputState>);
            return;
        }
        console.log(input)
    }
    const loading = false;
  return (
    <div className="flex items-center justify-center min-h-screen">
        <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200">
            <div>
                <h1 className="font-bold text-2xl">Fork&Feast</h1>
            </div>

            <div className="mb-4">
                <div className="relative">
                    <Input value={input.email} onChange={changeEventHandler} name="email" type="email" placeholder="Email" className="pl-10 focus-visible:ring-1" />
                    <Mail className="absolute inset-y-2 left-3 text-gray-500 pointer-events-none"/>
                    {error && <span className="text-sm text-red-500">{error.email}</span>}
                </div>
            </div>
                
            <div className="mb-4">
               <div className="relative">
                    <Input value={input.password} onChange={changeEventHandler} name="password" type="password" placeholder="Password" className="pl-10 focus-visible:ring-1" />
                    <Lock className="absolute inset-y-2 left-3 text-gray-500 pointer-events-none"/>
                    {error && <span className="text-sm text-red-500">{error.password}</span>}
                </div>
            </div>

            <div className="mb-10">
                {
                    loading ? <Button disabled className="w-full bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 w-4 animate-spin"/>Please Wait</Button>
                            : <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">Login</Button>
                }
                
            </div>
            <Separator/>
            <p className="mt-4">
                Don't have any account?{" "}
                <Link to="/signup" className=" text-blue-500 font-bold underline">Sign Up</Link>
            </p>
        </form>
    </div>
  )
}

export default Login