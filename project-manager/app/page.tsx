import { prisma } from "@/prisma/client";
// import IssueSummary from "./IssueSummary";
import { Status } from "@prisma/client";
import IssueChart from "./IssueChart";
// import LatestIssues from "./LatestIssues";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: Status.OPEN } });
  const inProgress = await prisma.issue.count({ where: { status: Status.IN_PROGRESS } });
  const closed = await prisma.issue.count({ where: { status: Status.CLOSED } });

  return (
    // <IssueSummary open={open} inProgress={inProgress} closed={closed} />
    <IssueChart open={open} inProgress={inProgress} closed={closed} />
    // <LatestIssues/> 
  );
}
