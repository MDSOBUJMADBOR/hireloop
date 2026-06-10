"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "react-toastify";
import {Description, Label, Radio, RadioGroup} from "@heroui/react";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
   const [role, setRole] = useState("seeker");

  const handleSubmit = async (e) => {
e.preventDefault();
const name = e.target.name.value;
const email = e.target.email.value;
const password = e.target.password.value;

const {data,error} = await authClient.signUp.email({  
name,
email,
password,
role,
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
    <div className="min-h-screen flex items-center justify-center bg-gray-400 px-4 bg-amber-400">
      <div className="w-full max-w-md border border-white p-8 rounded-2xl shadow-lg bg-black">
        <h1 className="text-2xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
            required
          />

{/* Role Selection */}
<div className="flex flex-col gap-4">
      <Label>Subscription plan</Label>
      <RadioGroup defaultValue="seeker" name="role" onChange={(value) => setRole(value)} orientation="horizontal">
        <Radio  value="seeker">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Job Seeker</Label>            
          </Radio.Content>
        </Radio>
        <Radio value="recruiter">
          <Radio.Control>
            <Radio.Indicator />
          </Radio.Control>
          <Radio.Content>
            <Label>Recruiter</Label>
           
          </Radio.Content>
        </Radio>     
      </RadioGroup>
    </div>

          <Button
            type="submit"
            className="w-full border py-2 rounded-lg cursor-pointer"
          >
            Signup
          </Button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Have an account?{" "}
          <Link href="/signin" className="text-blue-500 cursor-pointer">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}