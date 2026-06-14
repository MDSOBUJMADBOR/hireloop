'use client';

import { useState, useEffect } from "react";
import JobCard from "@/components/jobs/JobCard";
import { getJobs } from "@/lib/api/jobs";
import { Select, Label, ListBox, TextField, InputGroup } from "@heroui/react";

export default function JobPage() {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // ফিল্টারের জন্য কম্বাইন্ড স্টেট
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    jobType: "",
    isRemote: false,
  });

  // ডাটা ইনিশিয়াল লোড করার জন্য
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getJobs();
        setAllJobs(data || []);
        setFilteredJobs(data || []);
      } catch (error) {
        console.error("Error loading jobs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // সার্চ এবং ফিল্টারিং এর মূল লজিক (স্টেট চেঞ্জ হলেই রান হবে)
  useEffect(() => {
    let result = [...allJobs];

    // ১. টেক্সট সার্চ (টাইটেল বা কোম্পানির নাম দিয়ে)
    if (filters.search.trim() !== "") {
      const searchLog = filters.search.toLowerCase();
      result = result.filter(
        (job) =>
          job.jobTitle?.toLowerCase().includes(searchLog) ||
          job.companyName?.toLowerCase().includes(searchLog)
      );
    }

    // ২. ক্যাটাগরি ফিল্টার
    if (filters.category !== "" && filters.category !== "all") {
      result = result.filter((job) => job.jobCategory === filters.category);
    }

    // ৩. জব টাইপ ফিল্টার (যেমন: full-time, part-time)
    if (filters.jobType !== "" && filters.jobType !== "all") {
      result = result.filter((job) => job.jobType === filters.jobType);
    }

    // ৪. রিমোট ফিল্টার
    if (filters.isRemote) {
      result = result.filter((job) => job.isRemote === true);
    }

    setFilteredJobs(result);
  }, [filters, allJobs]);

  // ফিল্টার স্টেট হ্যান্ডলার
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <div className="p-8 bg-zinc-950 min-h-screen text-white text-center">Loading jobs...</div>;
  }

  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      
      {/* হেডার সেকশন */}
      <header className="mb-8 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-tight">
          Available Jobs: <span className="text-blue-500">{filteredJobs.length}</span>
        </h2>
      </header>

      {/* --- ফিল্টার প্যানেল (Hero UI ব্যবহার করে) --- */}
      <div className="bg-[#0f0f0f] p-6 rounded-2xl border border-[#1f1f1f] mb-8 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        
        {/* সার্চ ইনপুট */}
        <TextField 
          value={filters.search} 
          onChange={(val) => handleFilterChange("search", val)}
        >
          <Label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block">
            Search
          </Label>
          <InputGroup className="bg-zinc-950 border-[#1f1f1f] rounded-lg">
            <InputGroup.Input 
              placeholder="Title or company..." 
              className="text-sm py-2 text-white placeholder-zinc-500 bg-transparent w-full focus:outline-none"
            />
          </InputGroup>
        </TextField>

        {/* ক্যাটাগরি ফিল্টার */}
        <Select 
          selectedKey={filters.category} 
          onSelectionChange={(val) => handleFilterChange("category", val)}
        >
          <Label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block">
            Category
          </Label>
          <Select.Trigger className="bg-zinc-950 border border-[#1f1f1f] rounded-lg px-4 py-2 text-sm w-full text-left flex justify-between items-center">
            <Select.Value placeholder="Select Category" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg text-white">
            <ListBox>
              <ListBox.Item id="all">All Categories</ListBox.Item>
              <ListBox.Item id="design">Design</ListBox.Item>
              <ListBox.Item id="development">Development</ListBox.Item>
              <ListBox.Item id="marketing">Marketing</ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        {/* জব টাইপ ফিল্টার */}
        <Select 
          selectedKey={filters.jobType} 
          onSelectionChange={(val) => handleFilterChange("jobType", val)}
        >
          <Label className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1 block">
            Job Type
          </Label>
          <Select.Trigger className="bg-zinc-950 border border-[#1f1f1f] rounded-lg px-4 py-2 text-sm w-full text-left flex justify-between items-center">
            <Select.Value placeholder="Select Type" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg text-white">
            <ListBox>
              <ListBox.Item id="all">All Types</ListBox.Item>
              <ListBox.Item id="full-time">Full-time</ListBox.Item>
              <ListBox.Item id="part-time">Part-time</ListBox.Item>
              <ListBox.Item id="contract">Contract</ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        {/* রিমোট অনলি চেকবক্স */}
        <div className="flex items-center h-10 pl-2">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.isRemote}
              onChange={(e) => handleFilterChange("isRemote", e.target.checked)}
              className="w-4 h-4 rounded border-[#1f1f1f] bg-zinc-950 text-blue-500 focus:ring-0 cursor-pointer"
            />
            <span className="text-sm font-medium text-zinc-300">Remote Only</span>
          </label>
        </div>

      </div>

      {/* --- ৩-কলামের জব গ্রিড লেআউট --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((jobItem) => (
            <JobCard 
              key={jobItem._id?.$oid || jobItem.id || jobItem._id} 
              job={jobItem} 
            />
          ))
        ) : (
          <p className="text-zinc-500 col-span-full text-center py-12">
            No jobs match your search criteria.
          </p>
        )}
      </div>

    </div>
  );
}