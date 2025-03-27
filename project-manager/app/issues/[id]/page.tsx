import React from 'react'
import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'

interface Props {
    params: { id: string }
}

const DetailPage = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue) {
        notFound();
    }

    return (
        <div>
            {/* Flex and Heading are radix components. They're essentially H1 tag (but can be modified) and a flexbox 
            and they reduce how much tailwind is needed */}
            <Heading>{issue.title}</Heading>
            <Flex gap='3' my='2'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card>
                {issue.status}
            </Card>
        </div>
    )
}

export default DetailPage