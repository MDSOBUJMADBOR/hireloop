import React from 'react';
import StatCard from './StatCard'; // একই ফোল্ডারে রাখলে './StatCard' দিন

const DashboardStats = ({ stats }) => {
    // সেফটি চেক: ডাটা পাস না হলে বা খালি থাকলে ক্র্যাশ করবে না
    if (!stats || stats.length === 0) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-7xl">
            {stats.map((stat, index) => (
                <StatCard
                    key={stat.id || index}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                />
            ))}
        </div>
    );
};

export default DashboardStats;