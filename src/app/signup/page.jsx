"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { authClient, signUp } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
console.log(data,'data');
    if (!data.name || !data.email || !data.password) {
      alert("সব ফিল্ড পূরণ করো");
      return;
    }

    const {data1, error} = await authClient.signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    });

    if (res.error) {
      alert(res.error.message);
    } else {
      alert("Signup successful");
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 bg-amber-400">
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

          <Button
            type="submit"
            className="w-full border py-2 rounded-lg cursor-pointer"
          >
            Signup
          </Button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Have an account?{" "}
          <span
            onClick={() => router.push("/signin")}
            className="text-blue-500 cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}