import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from '@/schema/userSchema';
import { toast } from 'sonner';


const API_END_POINT = "http://localhost:8000/api/v1/user";
axios.defaults.withCredentials = true;

type User = {
    fullname: string;
    email: string;
    contact: number;
    address: string;
    city: string;
    country: string;
    profilePicture: string;
    admin: boolean;
    isVerified: boolean;

}

type UserState = {
    user: User | null;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    loading: boolean;
    signup: (input: SignupInputState)=> Promise<void>;
    login: (input: LoginInputState)=> Promise<void>;
    verifyEmail: (veificationCode: string)=> Promise<void>;
    checkAuthentication: ()=> Promise<void>;
    logout: ()=> Promise<void>;
    forgotPassword: (email: string)=> Promise<void>;
    resetPassword: (token: string, newPassword: string)=> Promise<void>;
    updateProfile: (input: any)=> Promise<void>;

}


export const useUserStore = create<UserState>()(persist((set)=>({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    loading:false,

    // signup api implementation
    signup: async (input: SignupInputState)=>{
        try {
            set({loading: true});
            const response = await axios.post(`${API_END_POINT}/signup`, input,{
                headers: {
                    'Content-Type':'application/json'
                }
            });
            if(response.data.success){
                console.log(response.data);
                toast.success(response.data.message);
                set({loading: false, user: response.data.user, isAuthenticated:true});
            }
        } catch (error:any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    login: async ( input: LoginInputState)=> {
        try {
            set({ loading : true});
            const response = await axios.post(`${API_END_POINT}/login`, input,{
                headers: {
                    'Content-Type':'application/json'
                }
            });
            if(response.data.success){
                console.log(response.data);
                toast.success(response.data.message);
                set({loading: false, user: response.data.user, isAuthenticated:true});
            }
        } catch (error:any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    verifyEmail: async (veificationCode: string) => {
        try {
            set({ loading : true});
            const response = await axios.post(`${API_END_POINT}/verify-email`, veificationCode,{
                headers: {
                    'Content-Type':'application/json'
                }
            });
            if(response.data.success){
                console.log(response.data);
                toast.success(response.data.message);
                set({loading: false, user: response.data.user, isAuthenticated:true});
            }

            // return response.data;
        } catch (error) {
            set({ loading: false });
        }
    },
    checkAuthentication: async ()=> {
        try {
            set({isCheckingAuth:true});
            const response = await axios.get(`${API_END_POINT}/check-authentication`);
            if(response.data.success){
                set({loading:false, user:response.data.user, isAuthenticated:true, isCheckingAuth:false})
            }
        } catch (error) {
            set({loading:false, isAuthenticated:false, ischeckingAuth: false})
        }
    },
    logout: async ()=> {
        try {
            set({ loading : true});
            const response = await axios.post(`${API_END_POINT}/logout`);
            if(response.data.success){
                console.log(response.data);
                toast.success(response.data.message);
                set({loading: false, user: null, isAuthenticated:false});
            }

            // return response.data;
        } catch (error) {
            set({loading:false})
        }
    },
    forgotPassword: async (email: string)=> {
        try {
            set({ loading : true});
            const response = await axios.post(`${API_END_POINT}/forgot-password`, {email});
            if(response.data.success){
                console.log(response.data);
                toast.success(response.data.message);
                set({loading: false});
            }

            // return response.data;
        } catch (error:any) {
            toast.error(error.response.data.message);
            set({loading:false})
        }
    },
    resetPassword: async (token: string, newPassword: string)=> {
        try {
            set({ loading : true});
            const response = await axios.post(`${API_END_POINT}/reset-password/${token}`, {newPassword});
            if(response.data.success){
                console.log(response.data);
                toast.success(response.data.message);
                set({loading: false});
            }

            // return response.data;
        } catch (error:any) {
            toast.error(error.response.data.message);
            set({loading:false})
        }
    },
    updateProfile: async (input: any)=> {
        try {
            set({ loading : true});
            const response = await axios.post(`${API_END_POINT}/profile/update`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(response.data.success){
                console.log(response.data);
                toast.success(response.data.message);
                set({loading: false, user:response.data.user, isAuthenticated:true});
            }

            // return response.data;
        } catch (error:any) {
            set({loading:false})
        }
    },
}),
{
    name: 'user-name',
    storage: createJSONStorage(()=> localStorage)
}
))