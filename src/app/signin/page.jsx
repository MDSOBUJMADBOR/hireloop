// "use client";

// import { Button } from "@heroui/react";
// import { useRouter } from "next/navigation";

// export default function SigninPage() {
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const data = Object.fromEntries(formData.entries());

   
//     if (data.email && data.password) {
   
//       console.log("Sign In Data:", data);
      
      
//       router.push("/");
//     } else {
//       alert("Please fill in all fields");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4">
//       <div className="w-full max-w-md border border-white p-8 rounded-2xl shadow-lg ">
//         <h1 className="text-2xl font-bold text-center mb-6">
//           Welcome Back
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />

//           <Button
//             type="submit"            
//             className="w-full border py-2 rounded-lg cursor-pointer  text-white hover:bg-gray-800 transition-colors"
//           >
//             Sign In
//           </Button>
//         </form>

//         <p className="text-sm text-center mt-4 text-gray-600">
//           Don't have an account?{" "}
//           <span 
//             onClick={() => router.push("/signup")} 
//             className="text-blue-500 cursor-pointer "
//           >
//             Sign Up
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }