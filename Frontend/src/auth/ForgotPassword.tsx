import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Loader2, Mail } from "lucide-react";
import { useState } from "react"
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const loading:boolean = false;
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
        <form className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg">
            <div className=" text-center">
              <h1 className="font-extrabold text-2xl mb-2">Forgot Passord</h1>
              <p className="text-sm text-gray-600">Enter your email address to reset your password</p>
            </div>
            <div className="relative">
              <Input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter your email" className="pl-10"/>
              <Mail className="absolute inset-y-2.5 ml-2"/>
            </div>
            {
              loading ? (<Button disabled className="bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</Button>)
                      : (<Button className="bg-orange hover:bg-hoverOrange">Send Reset Link</Button>)
            }
            <span>
              Back to {" "} <Link to="/login" className="text-blue-5">Login</Link>
            </span>

            
        </form>
    </div>
  )
}

export default ForgotPassword