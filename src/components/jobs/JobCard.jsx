'use client';

import React from "react";
import Image from "next/image";
import { Card } from "@heroui/react";
import { MapPin, Briefcase, ArrowRight } from "@gravity-ui/icons";
import Link from "next/link";

export default function JobCard({ job }) {
  const {
    _id,
    jobTitle,
    location,
    jobType,
    minSalary,
    maxSalary,
    currency,
    companyName,
    companyLogo,
  } = job;

  return (
  <div>
    
      <Card className="bg-[#0f0f0f] border border-[#1f1f1f] text-white rounded-2xl p-5">
      
      {/* HEADER */}
      <Card.Header className="flex items-center gap-3 mb-3">
        
        <div className="relative w-10 h-10"> 
          <Image
            src={companyLogo || "/logo.png"}
            alt="company logo"
            fill
            className="rounded-md object-cover"
          />
        </div>

        <div>
          <Card.Title className="text-lg font-semibold">
            {jobTitle}
          </Card.Title>
          <Card.Description className="text-xs text-gray-400">
            {companyName || "Unknown Company"}
          </Card.Description>
        </div>
      </Card.Header>

      {/* CONTENT */}
      <Card.Content className="space-y-3">
        <div className="flex flex-wrap gap-2 text-sm">
          
          <span className="flex items-center gap-1 px-3 py-1 bg-[#1a1a1a] rounded-full">
            <MapPin width={14} /> {location}
          </span>

          <span className="flex items-center gap-1 px-3 py-1 bg-[#1a1a1a] rounded-full">
            <Briefcase width={14} /> {jobType}
          </span>

          <span className="px-3 py-1 bg-[#1a1a1a] rounded-full">
            💰 {currency} {minSalary}-{maxSalary}
          </span>

        </div>
      </Card.Content>

      {/* FOOTER */}
      <Card.Footer className="mt-4 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Apply before: {job.deadline}
        </span>

        <Link
          href={`/jobs/${_id}`}
          className="flex items-center gap-1 text-sm hover:underline"
        >
          Apply Now <ArrowRight width={14} />
        </Link>
      </Card.Footer>
    </Card>
  </div>
  );
}