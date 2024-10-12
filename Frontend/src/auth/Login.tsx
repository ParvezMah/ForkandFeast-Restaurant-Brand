import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator";
import { Loader2, Lock, Mail } from "lucide-react"
import { Link } from "react-router-dom";

const Login = () => {
    const loading = false;
  return (
    <div className="flex items-center justify-center min-h-screen">
        <form className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-200">
            <div>
                <h1 className="font-bold text-2xl">Fork&Feast</h1>
            </div>

            <div className="mb-4">
                <div className="relative">
                    <Input type="email" placeholder="Email" className="pl-10 focus-visible:ring-1" />
                    <Mail className="absolute inset-y-2 left-3 text-gray-500 pointer-events-none"/>
                </div>
            </div>
                
            <div className="mb-4">
               <div className="relative">
                    <Input type="password" placeholder="Password" className="pl-10 focus-visible:ring-1" />
                    <Lock className="absolute inset-y-2 left-3 text-gray-500 pointer-events-none"/>
                </div>
            </div>

            <div className="mb-10">
                {
                    loading ? <Button className="w-full bg-orange hover:bg-hoverOrange"><Loader2 className="mr-2 w-4 animate-spin"/>Please Wait</Button>
                            : <Button className="w-full bg-orange hover:bg-hoverOrange">Login</Button>
                }
                
            </div>
            <Separator/>
            <p>
                Don't have any account?{" "}
                <Link to=""></Link>
            </p>
        </form>
    </div>
  )
}

export default Login