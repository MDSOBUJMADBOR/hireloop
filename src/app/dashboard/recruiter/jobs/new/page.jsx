'use client';
import React, { useState } from 'react';
import { 
  Form, 
  Fieldset, 
  Input, 
  TextArea,    
  Button,
  Select,      
  Label,       
  ListBox,     
} from "@heroui/react";
import { createJob } from '@/lib/actions/jobs';
import { useRouter } from 'next/navigation';

export default function CreateJobForm({ companyData }) {
   const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // কোম্পানি ডাটা এবং লিমিট চেক
  const company = companyData || {
    name: "Acme Corp",
    isApproved: true,
    plan: "Free",
    activeJobCount: 2,
  };

  const planLimits = { Free: 3, Growth: 10, Enterprise: 50 };
  const maxLimit = planLimits[company.plan] || 3;
  const isLimitReached = company.activeJobCount >= maxLimit;
  const canPost = company.isApproved && !isLimitReached;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canPost) return;
const formElement = e.currentTarget;
    setLoading(true);
    setFormError("");

    const formData = new FormData(e.currentTarget);
    const jobData = Object.fromEntries(formData.entries());
    
    const finalPayload = {
      ...jobData,
      companyId: 'company_123',
      status: "active",
      createdAt: new Date().toISOString()
    };
   


    try {
      const res = await createJob(finalPayload);
      if(res.insertedId) {
        alert("Job posted successfully!");
         router.push('/dashboard/recruiter');
      }
      console.log("Submitting to API:", finalPayload);
      // await axios.post('/api/jobs', finalPayload);
      formElement.reset();
     redirect('/dashboard/recruiter/jobs');
    } catch (err) {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Tailwind Reusable Classes (fild.png ডার্ক স্টাইল ম্যাচিং)
  const baseInputWrapper = "bg-[#121212] border border-[#262626] group-data-[focus=true]:border-[#f4f4f5] rounded-lg text-white";
  const baseLabel = "text-[#f4f4f5] text-xs font-medium mb-1.5 block";
  const selectTrigger = "w-full min-h-10 px-3 bg-[#121212] border border-[#262626] rounded-lg text-left text-sm text-[#f4f4f5] flex items-center justify-between focus:border-[#f4f4f5] outline-none";
  const popoverStyle = "bg-[#121212] border border-[#262626] rounded-lg p-1 shadow-xl text-white";
  const listItemStyle = "px-3 py-2 text-sm text-[#a1a1aa] hover:bg-[#212121] hover:text-white rounded-md cursor-pointer outline-none transition-colors data-[selected=true]:bg-[#212121] data-[selected=true]:text-white";

  return (
    <div className="w-full  bg-[#0a0a0a] p-6 text-white min-h-screen">
      
      {/* কোম্পানি ও প্ল্যান লিমিট ইনফো ব্যানার */}
      <div className="mb-6 p-4 bg-[#121212] border border-[#262626] rounded-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h4 className="text-sm font-semibold text-[#f4f4f5]">Posting as: {company.name}</h4>
          <p className="text-xs text-[#71717a]">
            Plan: <span className="text-[#a1a1aa] font-medium">{company.plan}</span> ({company.activeJobCount}/{maxLimit} active jobs used)
          </p>
        </div>
        {!company.isApproved && (
          <span className="text-xs bg-danger-500/10 text-danger-400 px-3 py-1.5 rounded-lg border border-danger-500/20">Approval Pending</span>
        )}
        {isLimitReached && company.isApproved && (
          <span className="text-xs bg-warning-500/10 text-warning-400 px-3 py-1.5 rounded-lg border border-warning-500/20">Limit Reached</span>
        )}
      </div>

      <Form onSubmit={handleSubmit} disabled={!canPost || loading} className="space-y-8">
        
        {/* SECTION 1: JOB INFO */}
        <Fieldset legend="Job Information" description="Provide the core parameters for the opening.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
            
            {/* Job Title */}
            <div>
              <Label className={baseLabel}>Job Title</Label>
              <Input required name="jobTitle" placeholder="e.g. Senior Frontend Engineer" classNames={{ inputWrapper: baseInputWrapper }} />
            </div>

            {/* Job Category */}
            <div className="flex flex-col">
              <Label className={baseLabel}>Job Category</Label>
              <Select name="jobCategory" placeholder="Select category">
                <Select.Trigger className={selectTrigger}>
                  <Select.Value />
                  <Select.Indicator className="text-[#71717a]" />
                </Select.Trigger>
                <Select.Popover className={popoverStyle}>
                  <ListBox className="outline-none">
                    <ListBox.Item className={listItemStyle} id="technology" textValue="Technology">Technology</ListBox.Item>
                    <ListBox.Item className={listItemStyle} id="design" textValue="Design">Design</ListBox.Item>
                    <ListBox.Item className={listItemStyle} id="marketing" textValue="Marketing">Marketing</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Job Type */}
            <div className="flex flex-col">
              <Label className={baseLabel}>Job Type</Label>
              <Select name="jobType" placeholder="Select type">
                <Select.Trigger className={selectTrigger}>
                  <Select.Value />
                  <Select.Indicator className="text-[#71717a]" />
                </Select.Trigger>
                <Select.Popover className={popoverStyle}>
                  <ListBox className="outline-none">
                    <ListBox.Item className={listItemStyle} id="Full-time" textValue="Full-time">Full-time</ListBox.Item>
                    <ListBox.Item className={listItemStyle} id="Part-time" textValue="Part-time">Part-time</ListBox.Item>
                    <ListBox.Item className={listItemStyle} id="Remote" textValue="Remote">Remote</ListBox.Item>
                    <ListBox.Item className={listItemStyle} id="Contract" textValue="Contract">Contract</ListBox.Item>
                    <ListBox.Item className={listItemStyle} id="Internship" textValue="Internship">Internship</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Location */}
            <div>
              <Label className={baseLabel}>Location</Label>
              <Input required name="location" placeholder="City, Country (or 'Remote')" classNames={{ inputWrapper: baseInputWrapper }} />
            </div>

            {/* Salary Fields */}
            <div className="grid grid-cols-2 gap-2 w-full">
              <div>
                <Label className={baseLabel}>Min Salary</Label>
                <Input required type="number" name="minSalary" placeholder="0" classNames={{ inputWrapper: baseInputWrapper }} />
              </div>
              <div>
                <Label className={baseLabel}>Max Salary</Label>
                <Input required type="number" name="maxSalary" placeholder="0" classNames={{ inputWrapper: baseInputWrapper }} />
              </div>
            </div>

            {/* Currency and Deadline */}
            <div className="grid grid-cols-2 gap-2 w-full">
              <div className="flex flex-col">
                <Label className={baseLabel}>Currency</Label>
                <Select name="currency" defaultSelectedKeys={["USD"]}>
                  <Select.Trigger className={selectTrigger}>
                    <Select.Value />
                    <Select.Indicator className="text-[#71717a]" />
                  </Select.Trigger>
                  <Select.Popover className={popoverStyle}>
                    <ListBox className="outline-none">
                      <ListBox.Item className={listItemStyle} id="USD" textValue="USD">USD ($)</ListBox.Item>
                      <ListBox.Item className={listItemStyle} id="BDT" textValue="BDT">BDT (৳)</ListBox.Item>
                      <ListBox.Item className={listItemStyle} id="EUR" textValue="EUR">EUR (€)</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <div>
                <Label className={baseLabel}>Application Deadline</Label>
                <Input required type="date" name="deadline" classNames={{ inputWrapper: `${baseInputWrapper} text-[#71717a]` }} />
              </div>
            </div>

          </div>
        </Fieldset>

        {/* SECTION 2: JOB DESCRIPTION */}
        <Fieldset legend="Job Description Details" description="Outline the role's responsibilities and requirements.">
          <div className="space-y-4 w-full mt-4">
            <div>
              <Label className={baseLabel}>Responsibilities</Label>
              <TextArea required name="responsibilities" placeholder="Tell us about the daily tasks..." rows={4} classNames={{ inputWrapper: baseInputWrapper }} />
            </div>

            <div>
              <Label className={baseLabel}>Requirements</Label>
              <TextArea required name="requirements" placeholder="List down technical skills..." rows={4} classNames={{ inputWrapper: baseInputWrapper }} />
            </div>

            <div>
              <Label className={baseLabel}>Benefits (Optional)</Label>
              <TextArea name="benefits" placeholder="e.g. Health insurance, Unlimited PTO..." rows={3} classNames={{ inputWrapper: baseInputWrapper }} />
            </div>
          </div>
        </Fieldset>

        {formError && (
          <div className="text-sm text-danger-400 bg-danger-500/10 border border-danger-500/20 p-3 rounded-lg">{formError}</div>
        )}

        {/* Actions Buttons */}
        <div className="flex justify-end items-center gap-3 border-t border-[#1f1f1f] pt-4">
          <Button type="button" variant="flat" className="bg-[#121212] text-[#f4f4f5] border border-[#262626] rounded-lg">
            Cancel
          </Button>
          <Button type="submit" isLoading={loading} disabled={!canPost || loading} className="bg-white text-black font-semibold rounded-lg disabled:opacity-50">
            Publish Job
          </Button>
        </div>

      </Form>
    </div>
  );
}