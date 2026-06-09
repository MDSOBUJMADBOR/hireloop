"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function SigninPage() {
  const router = useRouter();

    const handleSubmit = async (e) => {
  e.preventDefault(); 
  const email = e.target.email.value;
  const password = e.target.password.value;
  
  const {data,error} = await authClient.signIn.email({  
  email,
  password,
  })
  if(!error) {
   router.push("/")
  }
  console.log(data,error);
  
  if(error){
    toast.error(error.message);
  }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-md border border-white p-8 rounded-2xl shadow-lg bg-black">
        <h1 className="text-2xl font-bold text-center mb-6">
          Welcome Back
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <Button
            type="submit"            
            className="w-full border py-2 rounded-lg cursor-pointer  text-white hover:bg-gray-800 transition-colors"
          >
            Sign In
          </Button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <span 
            onClick={() => router.push("/signup")} 
            className="text-blue-500 cursor-pointer "
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}