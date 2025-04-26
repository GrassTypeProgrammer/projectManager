import React from 'react'
// import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';
import { getUniqueIssue } from '../../IssueUtil';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

const IssueForm = dynamic(
    () => import('@/app/issues/_components/IssueForm'),
    {
        //   ssr: false,
        loading: () => <IssueFormSkeleton />
    }
)


const EditIssuePage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    const issue = await getUniqueIssue({
        assignedToUserID: session!.user.id,
        where: { id: parseInt(id) }
    });

    if (!issue) {
        notFound();
    }

    return (
        <IssueForm issue={issue} />
    )
}

export default EditIssuePage