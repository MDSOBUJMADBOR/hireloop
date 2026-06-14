import { getJobById } from '@/lib/api/jobs';
import React from 'react';
import Image from 'next/image';

const Page = async ({ params }) => {
    // Next.js App Router-এ params-কে await করতে হয়
    const { id } = await params;
    const job = await getJobById(id);

    // যদি ডেটা না পাওয়া যায় তার হ্যান্ডেলিং
    if (!job) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Job Not Found</h2>
                    <p className="text-gray-500 mt-2">The job details you are looking for could not be found.</p>
                </div>
            </div>
        );
    }

    // ডেটা থেকে প্রোপার্টিজগুলো ডেসট্রাকচার করা হলো
    const {
        jobTitle,
        jobCategory,
        jobType,
        location,
        minSalary,
        maxSalary,
        currency,
        deadline,
        responsibilities,
        requirements,
        benefits,
        companyName,
        companyLogo
    } = job;

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
            
            {/* Header Section: Logo, Title & Apply Button */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-6">
                <div className="flex items-center gap-4">
                    {/* Next.js Image Component */}
                    {companyLogo ? (
                        <div className="relative w-20 h-20 border rounded-xl overflow-hidden p-2 bg-gray-50 flex items-center justify-center">
                            <Image 
                                src={companyLogo} 
                                alt={`${companyName} Logo`} 
                                width={80} 
                                height={80} 
                                className="object-contain"
                                priority // প্রথম স্ক্রিনে থাকার কারণে দ্রুত লোড হবে
                            />
                        </div>
                    ) : (
                        <div className="w-20 h-20 bg-gray-200 rounded-xl flex items-center justify-center font-bold text-gray-500 text-xl">
                            {companyName?.charAt(0)}
                        </div>
                    )}
                    
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">{jobTitle}</h1>
                        <p className="text-lg font-medium text-blue-600 mt-0.5">{companyName}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {location}
                        </p>
                    </div>
                </div>
                
                {/* Apply Now Button */}
                <button className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform active:scale-[0.98]">
                    Apply Now
                </button>
            </div>

            {/* Job Meta Info Tags */}
            <div className="flex flex-wrap gap-3 my-6">
                <span className="px-4 py-1.5 bg-green-50 text-green-700 text-sm font-semibold rounded-md border border-green-200 capitalize">
                    {jobType}
                </span>
                <span className="px-4 py-1.5 bg-purple-50 text-purple-700 text-sm font-semibold rounded-md border border-purple-200 capitalize">
                    {jobCategory}
                </span>
                <span className="px-4 py-1.5 bg-amber-50 text-amber-700 text-sm font-semibold rounded-md border border-amber-200">
                    Salary: {minSalary} - {maxSalary} {currency}
                </span>
                <span className="px-4 py-1.5 bg-red-50 text-red-700 text-sm font-semibold rounded-md border border-red-200">
                    Deadline: {deadline}
                </span>
            </div>

            {/* Main Job Details Content */}
            <div className="space-y-6 mt-8">
                {/* Requirements */}
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
                        Requirements
                    </h2>
                    <div className="text-gray-600 whitespace-pre-line bg-gray-50 p-4 rounded-xl leading-relaxed border border-gray-100">
                        {requirements}
                    </div>
                </div>

                {/* Responsibilities */}
                <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
                        Responsibilities
                    </h2>
                    <div className="text-gray-600 whitespace-pre-line bg-gray-50 p-4 rounded-xl leading-relaxed border border-gray-100">
                        {responsibilities}
                    </div>
                </div>

                {/* Benefits */}
                {benefits && (
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <span className="w-1.5 h-5 bg-blue-600 rounded-full"></span>
                            Benefits
                        </h2>
                        <div className="text-gray-600 whitespace-pre-line bg-gray-50 p-4 rounded-xl leading-relaxed border border-gray-100">
                            {benefits}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;