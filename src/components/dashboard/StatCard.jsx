import React from 'react';
// HeroUI v3 এর সঠিক কম্পোনেন্ট ইমপোর্ট
import { Card, CardHeader, CardBody } from "@heroui/react";

function StatCard({ title, value, icon: Icon }) {
  return (
    <Card className="w-full bg-[#121212] border border-[#262626] rounded-xl p-4 shadow-sm flex flex-col gap-4 items-start">
      
      {/* ১. আইকনের জন্য CardHeader */}
      <CardHeader className="p-0 bg-[#212121] text-[#a1a1aa] rounded-xl flex items-center justify-center border border-[#2e2e2e] size-10 min-w-10">
        {Icon && <Icon size={20} />}
      </CardHeader>
      
      {/* ২. টেক্সট এবং ভ্যালুর জন্য CardBody */}
    
        {/* টাইটেল বা লেবেল */}
        <p className="text-xs font-medium text-[#71717a] tracking-wide m-0">
          {title}
        </p>
        {/* মেইন নাম্বার বা ভ্যালু */}
        <h3 className="text-2xl font-semibold text-[#f4f4f5] tracking-tight m-0">
          {value}
        </h3>
      

    </Card>
  );
}

export default StatCard;