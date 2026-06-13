import React from 'react';
import PostJobForm from './PostJobForm';
import { getLoggedInUserCompany } from '@/lib/api/companies';

const PostJobPage = async () => {

    const company = await getLoggedInUserCompany();
// console.log(company,'company page');

    return (
        <div>
            <PostJobForm company={company}></PostJobForm>
        </div>
    );
};

export default PostJobPage;