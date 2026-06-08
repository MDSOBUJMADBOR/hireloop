"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function SignupPage() {
  const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

 if(data) {
  router.push("/")
 }
 if(!data) {
  alert("Please fill in all fields");

}
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md border border-white  p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit}  className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
          
            className="w-full px-4 py-2 border rounded-lg "
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
           
            className="w-full px-4 py-2 border rounded-lg "
            required
          />
 <div className="relative">
          <input
            type={isVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            
            className="w-full px-4 py-2 border rounded-lg "
            required
          />
 <Button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="absolute    text-sm text-gray-600 bg-transparent"
            >
              {isVisible ? "🙈" : "👁️"}
            </Button>
         </div>



          <Button
            type="submit"            
            className="w-full border py-2 rounded-lg cursor-pointer"
          >
            {/* {loading ? "Creating..." : "Sign Up"} */} 
            Signup
          </Button>
        </form>
      </div>
    </div>
  );
}