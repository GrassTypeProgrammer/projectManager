import { prisma } from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'

const DetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const {id} = await params;
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(id) }
    })

    if (!issue) {
        notFound();
    }

    return (
        // initial is for small devices such as phones and above. md is medium devices, such as tablets and above.
        // So, if it's a medium sized device, 2 columns. Otherwise, 1 column. 
        <Grid columns={{ initial: '1', md: '2' }} gap='5'>
            <Box>
                <IssueDetails issue={issue} />
            </Box>

            <Box>
                <EditIssueButton issueID={issue.id} />
            </Box>
        </Grid>
    )
}

export default DetailPage