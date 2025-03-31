import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import { prisma } from '@/prisma/client'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { Pencil2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'

interface Props {
    params: { id: string }
}

const DetailPage = async (props: Props) => {
    const params = await props.params;

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue) {
        notFound();
    }

    return (
        // initial is for small devices such as phones and above. md is medium devices, such as tablets and above.
        // So, if it's a medium sized device, 2 columns. Otherwise, 1 column. 
        <Grid columns={{ initial: '1', md: '2' }} gap='5'>
            <Box>
                {/* Flex and Heading are radix components. They're essentially H1 tag (but can be modified) and a flexbox 
            and they reduce how much tailwind is needed */}
                <Heading>{issue.title}</Heading>
                <Flex gap='3' my='2'>
                    <IssueStatusBadge status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card className='prose' mt='4'>
                    <ReactMarkdown>
                        {issue.description}
                    </ReactMarkdown>
                </Card>
            </Box>

            <Box>
                <Button >
                    <Pencil2Icon />
                    <Link href={`issues/${issue.id}/edit`}>
                        Edit Issue
                    </Link>
                </Button>
            </Box>
        </Grid>
    )
}

export default DetailPage