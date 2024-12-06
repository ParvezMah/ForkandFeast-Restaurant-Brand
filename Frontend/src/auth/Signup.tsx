
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema";
import { useUserStore } from "@/store/useUserStore";
import { Loader2, Lock, Mail, PhoneOutgoing, User } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";


// No need because of UserSignupSchema
// interface SignupInputState {
//     fullname: string,
//     email: string,
//     password: string,
//     contact: string,
// }

const Signup = () => {
    const [input, setInput] = useState<SignupInputState>({
        fullname: "", 
        email:"", 
        password: "",
        contact: ""
    });
    const [error, setError] = useState<Partial<SignupInputState>>({})
    const {signup, loading} = useUserStore();

    const changeEventHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInput({...input, [name]:value});
    }

    const loginSubmitHandler = async (e:FormEvent) =>{
        e.preventDefault();

        // Form Validation Check start
        const result = userSignupSchema.safeParse(input);
        if(!result.success){
          const fieldErrors = result.error.formErrors.fieldErrors;
          setError(fieldErrors as Partial<SignupInputState>);
          return;
        }

        // log in Api Implementation here
        await signup(input)
    }

  return (
    <div className="flex items-center justify-center min-h-screen">
        <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200">
            <div>
                <h1 className="font-bold text-2xl">Fork&Feast</h1>
            </div>

            <div className="mb-4">
                <div className="relative">
                    <Input value={input.fullname} onChange={changeEventHandler} name="fullname" type="text" placeholder="Full Name" className="pl-10 focus-visible:ring-1" />
                    <User className="absolute inset-y-2 left-3 text-gray-500 pointer-events-none"/>
                    {error && <span className="text-sm text-red-500">{error.fullname}</span>}
                </div>
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
                
            <div className="mb-4">
               <div className="relative">
                    <Input value={input.contact} onChange={changeEventHandler} name="contact" type="text" placeholder="Contact" className="pl-10 focus-visible:ring-1" />
                    <PhoneOutgoing className="absolute inset-y-2 left-3 text-gray-500 pointer-events-none"/>
                    {error && <span className="text-sm text-red-500">{error.contact}</span>}
                </div>
            </div>

            <div className="mb-10">
                {
                    loading ? <Button disabled className="w-full bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 w-4 animate-spin"/>Please Wait</Button>
                            : <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">Sign Up</Button>
                }
                
            </div>
            <Separator/>
            <p className="mt-4">
                Already have an account?{" "}
                <Link to="/login" className=" text-blue-500 font-bold underline">Login</Link>
            </p>
        </form>
    </div>
  )
}

export default Signup