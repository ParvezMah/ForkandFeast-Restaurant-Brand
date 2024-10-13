import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Loader2, Mail } from "lucide-react";
import { useState } from "react"
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const loading:boolean = false;
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
        <form className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg">
            <div className=" text-center">
              <h1 className="font-extrabold text-2xl mb-2">Reset Passord</h1>
              <p className="text-sm text-gray-600">Enter your password to reset old password</p>
            </div>
            <div className="relative">
              <Input type="password" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} placeholder="Enter your password" className="pl-10"/>
              <Mail className="absolute inset-y-2.5 ml-2"/>
            </div>
            {
              loading ? (<Button disabled className="bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please Wait</Button>)
                      : (<Button className="bg-orange hover:bg-hoverOrange">Reset</Button>)
            }
            <span>
              Back to{" "} <Link to="/login" className="text-blue-500">Login</Link>
            </span>

            
        </form>
    </div>
  )
}

export default ResetPassword