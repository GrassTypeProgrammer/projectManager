import { IssueStatusBadge } from '@/app/components'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Issue } from '@prisma/client';

const IssueDetails = ({ issue }: { issue: Issue }) => {
    {/* Flex and Heading are radix components. They're essentially H1 tag (but can be modified) and a flexbox 
            and they reduce how much tailwind is needed */}
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap='3' my='2'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose max-w-full' mt='4'>
                <ReactMarkdown>
                    {issue.description}
                </ReactMarkdown>
            </Card>
        </>
    )
}

export default IssueDetails