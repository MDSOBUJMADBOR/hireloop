

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getCompanyJobs = async (companyId, status = "active") => {
  if (!baseUrl) {
    alert("API base URL is not defined");
    return [];
  }

  const res = await fetch(
    `${baseUrl}/api/jobs?${companyId}&${status}`
  );

  return res.json();
};