import { Status } from "@prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";
import { getIssueCount } from "../issues/IssueUtil";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";

export default async function Home() {
    const session = await getServerSession(authOptions);

    const open = await getIssueCount({ assignedToUserID: session!.user.id, where: { status: Status.OPEN } });
    const inProgress = await getIssueCount({ assignedToUserID: session!.user.id, where: { status: Status.IN_PROGRESS } });
    const closed = await getIssueCount({ assignedToUserID: session!.user.id, where: { status: Status.CLOSED } });

    return (
        <Grid columns={{ initial: '1', md: '2' }} gap='5'>
            <Flex direction={'column'} justify='between' gap='5'>
                <IssueSummary open={open} inProgress={inProgress} closed={closed} />
                <IssueChart open={open} inProgress={inProgress} closed={closed} />
            </Flex>

            <LatestIssues />
        </Grid>
    );
}

// For SEO
export const metadata: Metadata = {
    title: 'Issue Tracker - Dashboard',
    description: 'View a summary of project issues',
}