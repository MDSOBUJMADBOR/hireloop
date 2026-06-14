
import { Button, Table } from "@heroui/react";
import { getCompanyJobs } from '@/lib/api/jobs';
import React from 'react';
import { getLoggedInUserCompany } from "@/lib/api/companies";


const RecruiterJobs = async () => {

    const company = await getLoggedInUserCompany(); 
    console.log(company,'company');
    const jobs = await getCompanyJobs(company?._id) || []; 
    
    // console.log('Company Jobs:', jobs);

    return (
        <div className="p-6">
                        
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Company Jobs List" className="min-w-[600px]">
                        <Table.Header>
                            <Table.Column isRowHeader>Job Title</Table.Column>
                            <Table.Column>Type/Category</Table.Column>
                            <Table.Column>Location</Table.Column>
                            <Table.Column>Status</Table.Column>
                            <Table.Column>Actions</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {jobs && jobs.length > 0 ? (
                                jobs.map((job ) => (
                                    <Table.Row key={job.id || job._id}>
                                        <Table.Cell className="font-semibold">{job.jobTitle}</Table.Cell>
                                        <Table.Cell>{job.jobType}</Table.Cell>
                                        <Table.Cell>{job.location}</Table.Cell>
                                        <Table.Cell className="text-green-500">{job.status}</Table.Cell>
                                        <Table.Cell>
                                        <div>
                                            <Button variant="outline" color="primary" size="sm" className="mr-2">View</Button>
                                            <Button variant="outline" color="secondary" size="sm">Edit</Button>
                                            <Button variant="outline" color="danger" size="sm" className="ml-2">Delete</Button>
                                        </div>
                                         
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            ) : (
                                <Table.Row>
                                    <Table.Cell>No jobs found</Table.Cell>
                                    <Table.Cell>-</Table.Cell>
                                    <Table.Cell>-</Table.Cell>
                                    <Table.Cell>-</Table.Cell>
                                    <Table.Cell>-</Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};

export default RecruiterJobs;