import { prisma } from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './edit/DeleteIssueButton'

const DetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) }
    })

    if (!issue) {
        notFound();
    }

    return (
        // initial is for small devices such as phones and above. md is medium devices, such as tablets and above.
        // So, if it's a medium sized device, 2 columns. Otherwise, 1 column. 
        <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
            {/* md == tablet in tailwind, sm == tablet in radixUI */}
            {/* Only span 4 columns if device size == medium (eg: tablet) */}
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>

            <Box>
                <Flex direction='column' gap='4'>
                    <EditIssueButton issueID={issue.id} />
                    <DeleteIssueButton issueID={issue.id} />
                </Flex>
            </Box>
        </Grid>
    )
}

export default DetailPage