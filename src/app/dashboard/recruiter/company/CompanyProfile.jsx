"use client";

import React, { useState, useRef } from "react";
import Image from "next/image"; 
import { 
  Form, 
  Input, 
  Select, 
  ListBox, 
  Button, 
  Card, 
  Chip 
} from "@heroui/react";
import { ArrowUpToLine, Pencil, Factory, Globe, MapPin, Persons, Layers, FileText } from "@gravity-ui/icons";
import { createCompany } from "@/lib/actions/companies";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API; 

const baseLabel = "text-sm font-medium text-[#f4f4f5] block mb-1.5";
const baseInputWrapper = [
  "bg-[#161616]",
  "border border-[#262626]",
  "hover:border-[#3f3f46]",
  "focus-within:!border-white",
  "focus-within:!ring-0",
  "rounded-lg",
  "h-10",
  "transition-colors",
].join(" ");

const selectTrigger = "w-full bg-[#161616] border border-[#262626] hover:border-[#3f3f46] focus:border-white h-10 rounded-lg px-3 flex items-center justify-between text-[#f4f4f5] transition-colors text-sm";
const popoverStyle = "bg-[#121212] border border-[#262626] rounded-lg p-1 min-w-[200px]";
const listItemStyle = "text-[#e4e4e7] hover:bg-[#1c1c1c] focus:bg-[#1c1c1c] rounded-md px-2 py-1.5 text-sm cursor-pointer outline-none transition-colors data-[selected=true]:bg-white data-[selected=true]:text-black";

export default function CompanyProfile({ recruiter }) {

  const [company, setCompany] = useState(null); 
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [formError, setFormError] = useState("");
  
  const fileInputRef = useRef(null);
console.log('company',company);

  const handleLogoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFormError("Logo file size must be less than 5MB");
      return;
    }

    setLogoUploading(true);
    setFormError("");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      
      if (data.success) {
        setLogoUrl(data.data.url);
      } else {
        setFormError("Failed to upload image to Imgbb.");
      }
    } catch (error) {
      setFormError("An error occurred during logo upload.");
    } finally {
      setLogoUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("companyName"),
      industry: formData.get("industry"),
      websiteUrl: formData.get("websiteUrl"),
      location: formData.get("location"),
      employeeCount: formData.get("employeeCount"),
      description: formData.get("description"),
      logo: logoUrl || (company ? company.logo : ""),
      status: company ? company.status : "Pending", 
      recruiterId: recruiter.id,
    };
    console.log(payload,'payload');

const payloads = await createCompany(payload);
console.log(payloads,'payloads');
if(payloads){
alert('Company created successfully!');
}


    if (!payload.logo) {
      setFormError("Please upload a company logo.");
      setLoading(false);
      return;
    }

    try {
      setCompany(payload);
      setIsEditing(false);
    } catch (err) {
      setFormError("Something went wrong saving the company data.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusChipColor = (status) => {
    switch (status) {
      case "Approved": return "success";
      case "Rejected": return "danger";
      default: return "warning";
    }
  };

  // CASE 1: No Company Registered
  if (!company && !isEditing) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-[#09090b] min-h-[400px] border border-[#1f1f1f] rounded-xl text-center">
        <div className="w-16 h-16 rounded-full bg-[#161616] border border-[#262626] flex items-center justify-center mb-4 text-[#71717a]">
          <Factory size={28} />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">No Company Registered Yet</h3>
        <p className="text-sm text-[#a1a1aa] max-w-md mb-6">
          To start hiring talent and listing positions on HireLoop, you first need to configure your business profile details.
        </p>
        <Button 
          onPress={() => { setIsEditing(true); setLogoUrl(""); }}
          className="bg-white text-black font-semibold rounded-lg px-6 hover:bg-neutral-200 transition-colors"
        >
          Register Company
        </Button>
      </div>
    );
  }

  // CASE 2: Edit Form Mode
  if (isEditing) {
    return (
      <div className="max-w-2xl mx-auto bg-[#0c0c0e] border border-[#1f1f1f] rounded-xl shadow-2xl overflow-hidden font-sans">
        <div className="p-6 border-b border-[#1f1f1f] flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-white tracking-tight">
              {company ? "Edit Company Profile" : "Register New Company"}
            </h2>
            <p className="text-xs text-[#a1a1aa] mt-1">
              Enter your business details to start hiring on HireLoop.
            </p>
          </div>
          <button 
            type="button"
            onClick={() => setIsEditing(false)} 
            className="text-[#71717a] hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <Form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            
            {/* Company Name */}
            <div>
              <label className={baseLabel}>Company Name</label>
              <Input 
                required 
                name="companyName" 
                defaultValue={company?.name || ""} 
                placeholder="e.g. Acme Corp" 
                classNames={{ inputWrapper: baseInputWrapper, input: "text-sm text-white" }} 
              />
            </div>

            {/* Industry / Category */}
            <div className="flex flex-col">
              <label className={baseLabel}>Industry / Category</label>
              <Select 
                name="industry" 
                placeholder="Select Industry" 
                defaultSelectedKeys={company?.industry ? [company.industry] : ["technology"]}
              >
                <Select.Trigger className={selectTrigger}>
                  <Select.Value />
                  <Select.Indicator className="text-[#71717a]" />
                </Select.Trigger>
                <Select.Popover className={popoverStyle}>
                  <ListBox className="outline-none">
                    <ListBox.Item className={listItemStyle} id="technology" textValue="Technology">Technology</ListBox.Item>
                    <ListBox.Item className={listItemStyle} id="design" textValue="Design">Design</ListBox.Item>
                    <ListBox.Item className={listItemStyle} id="marketing" textValue="Marketing">Marketing</ListBox.Item>
                    <ListBox.Item className={listItemStyle} id="healthcare" textValue="Healthcare">Healthcare</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Website URL */}
            <div>
              <label className={baseLabel}>Website URL</label>
              <Input 
                required 
                name="websiteUrl" 
                type="url"
                defaultValue={company?.websiteUrl || ""} 
                placeholder="https://www.company.com" 
                classNames={{ inputWrapper: baseInputWrapper, input: "text-sm text-white" }} 
              />
            </div>

            {/* Location */}
            <div>
              <label className={baseLabel}>Location</label>
              <Input 
                required 
                name="location" 
                defaultValue={company?.location || ""} 
                placeholder="City, Country" 
                startContent={<MapPin size={16} className="text-[#71717a] mr-1" />}
                classNames={{ inputWrapper: baseInputWrapper, input: "text-sm text-white" }} 
              />
            </div>

            {/* Employee Count Range */}
            <div className="flex flex-col">
              <label className={baseLabel}>Employee Count Range</label>
              <Select 
                name="employeeCount" 
                placeholder="Select range" 
                defaultSelectedKeys={company?.employeeCount ? [company.employeeCount] : ["1-10"]}
              >
                <Select.Trigger className={selectTrigger}>
                  <Select.Value />
                  <Select.Indicator className="text-[#71717a]" />
                </Select.Trigger>
                <Select.Popover className={popoverStyle}>
                  <ListBox className="outline-none">
                    <ListBox.Item className={listItemStyle} id="1-10" textValue="1-10 employees">1-10 employees</ListBox.Item>
                    <ListBox.Item className={listItemStyle} id="11-50" textValue="11-50 employees">11-50 employees</ListBox.Item>
                    <ListBox.Item className={listItemStyle} id="51-200" textValue="51-200 employees">51-200 employees</ListBox.Item>
                    <ListBox.Item className={listItemStyle} id="201+" textValue="201+ employees">201+ employees</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Logo Upload */}
            <div>
              <label className={baseLabel}>Company Logo</label>
              <input 
                type="file" 
                accept="image/*" 
                ref={fileInputRef} 
                onChange={handleLogoChange} 
                className="hidden" 
              />
              <div className="flex items-center gap-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-14 h-14 bg-[#161616] border border-dashed border-[#3f3f46] hover:border-white rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden"
                >
                  {logoUploading ? (
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : logoUrl || company?.logo ? (
                    <Image 
                      src={logoUrl || company?.logo} 
                      alt="Logo Preview" 
                      fill
                      sizes="56px"
                      className="object-cover" 
                    />
                  ) : (
                    <ArrowUpToLine size={18} className="text-[#71717a] group-hover:text-white transition-colors" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium text-[#e4e4e7]">
                    {logoUploading ? "Uploading..." : logoUrl || company?.logo ? "Image selected" : "Upload image"}
                  </p>
                  <p className="text-[11px] text-[#71717a] mt-0.5">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>

          </div>

          {/* Flipped from Textarea to Native HTML textarea stylized with custom styles */}
          <div>
            <label className={baseLabel}>Brief Description</label>
            <textarea 
              required 
              name="description" 
              defaultValue={company?.description || ""}
              placeholder="Tell us about your company's mission and culture..." 
              rows={4} 
              className="w-full bg-[#161616] border border-[#262626] hover:border-[#3f3f46] focus:border-white focus:outline-none rounded-lg p-3 transition-colors text-sm text-white placeholder-[#52525b] resize-none"
            />
          </div>

          {formError && (
            <div className="text-xs font-medium text-danger-400 bg-danger-500/10 border border-danger-500/20 p-3 rounded-lg">
              {formError}
            </div>
          )}

          <div className="flex justify-end items-center gap-3 border-t border-[#1f1f1f] pt-4">
            <Button 
              type="button" 
              onPress={() => setIsEditing(false)} 
              className="bg-transparent text-[#e4e4e7] border border-[#262626] hover:bg-[#161616] rounded-lg text-sm px-4 h-10"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              isLoading={loading} 
              className="bg-white text-black font-semibold rounded-lg text-sm px-5 h-10"
            >
              {company ? "Update Details" : "Register Company"}
            </Button>
          </div>
        </Form>
      </div>
    );
  }

  // CASE 3: Active Profile View Card
  return (
    <Card className="max-w-2xl mx-auto bg-[#0c0c0e] border border-[#1f1f1f] rounded-xl shadow-xl p-6 text-white font-sans">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1f1f1f] pb-5 mb-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-[#161616] border border-[#262626] p-1 flex items-center justify-center overflow-hidden relative">
            <Image 
              src={company.logo} 
              alt={`${company.name} logo`} 
              fill
              sizes="64px"
              className="object-cover p-1 rounded-xl" 
            />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-2xl font-bold tracking-tight text-white">{company.name}</h2>
              <Chip 
                size="sm" 
                variant="flat" 
                color={getStatusChipColor(company.status)}
                className="font-medium text-xs rounded-md px-1"
              >
                {company.status}
              </Chip>
            </div>
            <p className="text-sm text-[#71717a] mt-0.5 flex items-center gap-1 capitalize">
              <Layers size={14} /> {company.industry} Industry
            </p>
          </div>
        </div>
        
        <Button 
          onPress={() => { setLogoUrl(company.logo); setIsEditing(true); }}
          className="bg-[#161616] hover:bg-[#222226] border border-[#262626] text-sm text-[#e4e4e7] rounded-lg px-4 h-9 self-start sm:self-center"
          startContent={<Pencil size={14} />}
        >
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex items-start gap-3 bg-[#121214] border border-[#1f1f23] p-3 rounded-lg">
          <Globe size={16} className="text-[#71717a] mt-0.5" />
          <div>
            <p className="text-[11px] text-[#71717a] uppercase font-semibold tracking-wider">Website URL</p>
            <a href={company.websiteUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline break-all">
              {company.websiteUrl}
            </a>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-[#121214] border border-[#1f1f23] p-3 rounded-lg">
          <MapPin size={16} className="text-[#71717a] mt-0.5" />
          <div>
            <p className="text-[11px] text-[#71717a] uppercase font-semibold tracking-wider">Location</p>
            <p className="text-sm text-[#e4e4e7]">{company.location}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-[#121214] border border-[#1f1f23] p-3 rounded-lg">
          <Persons size={16} className="text-[#71717a] mt-0.5" />
          <div>
            <p className="text-[11px] text-[#71717a] uppercase font-semibold tracking-wider">Employee Size</p>
            <p className="text-sm text-[#e4e4e7]">{company.employeeCount} employees</p>
          </div>
        </div>
      </div>

      <div className="bg-[#121214] border border-[#1f1f23] p-4 rounded-lg">
        <p className="text-[11px] text-[#71717a] uppercase font-semibold tracking-wider mb-2 flex items-center gap-1.5">
          <FileText size={14} /> Brief Description
        </p>
        <p className="text-sm text-[#a1a1aa] leading-relaxed whitespace-pre-wrap">
          {company.description}
        </p>
      </div>

    </Card>
  );
}