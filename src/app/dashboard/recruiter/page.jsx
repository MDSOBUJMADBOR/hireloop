'use client';
import { useSession } from '@/lib/auth-client';
import React from 'react';
// সঠিক আইকন নামগুলো ইমপোর্ট করা হয়েছে
import { LayoutHeaderCellsLarge, Persons, Thunderbolt, CircleCheck } from '@gravity-ui/icons';
import DashboardStats from '@/components/dashboard/DashboardStats';

const RecruiterDashboardHomePage = () => {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return <div className="text-white p-6">Loading...</div>;
    }

    const recruiterStats = [
        { title: "Total Job Posts", value: "48", icon: LayoutHeaderCellsLarge }, // ফিক্সড আইকন নাম
        { title: "Total Applicants", value: "1,284", icon: Persons },
        { title: "Active Jobs", value: "18", icon: Thunderbolt },
        { title: "Jobs Closed", value: "32", icon: CircleCheck }
    ];

    const user = session?.user;

    return (
        <div className="p-6 bg-[#0a0a0a] min-h-screen text-white flex flex-col gap-6">
            <h1 className='text-2xl font-semibold'>Welcome, {user?.name || 'Recruiter'}</h1>
            {/* ডাইনামিক ডাটা পাস করা হলো */}
            <DashboardStats stats={recruiterStats} />
        </div>
    );
};

export default RecruiterDashboardHomePage;