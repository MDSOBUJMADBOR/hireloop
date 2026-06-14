import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";
import { getJobs } from "@/lib/api/jobs";

export default async function JobPage() {
  const jobs = await getJobs();
  console.log(jobs, 'jobs');

  return (
    <div className="p-8 bg-zinc-950 min-h-screen text-white">
      {/* Header section showing total jobs */}
      <header className="mb-8 text-center md:text-left">
        <h2 className="text-2xl font-bold tracking-tight">
          Available Jobs: <span className="text-blue-500">{jobs?.length || 0}</span>
        </h2>
        <JobFilters></JobFilters>
      </header>

      {/* 3-Column Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {jobs && jobs.length > 0 ? (
          jobs.map((jobItem) => (
            <JobCard key={jobItem.id || jobItem._id} job={jobItem} />
          ))
        ) : (
          <p className="text-zinc-400 col-span-full text-center">No jobs found.</p>
        )}
      </div>
    </div>
  );
}