// import { prisma } from '@/prisma/client';
// The path to these is @/app/components, which uses the index.ts file in the components
import Pagination from '@/app/components/Pagination';
import { Status } from '@prisma/client';
import IssueActions from './IssueActions';
import IssueTable, { columnNames, IssueQuery } from './IssueTable';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';
import authOptions from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth';
import { getIssueCount, getManyIssues } from '../IssueUtil';

// interface Props {
//   searchParams: { status: Status }
// }

interface Props {
  searchParams: Promise<IssueQuery>
}

const Issues = async ({ searchParams }: Props) => {
  const session = await getServerSession(authOptions);
  const awaitedSearchParams = await searchParams;
  const { status, orderBy, page } = awaitedSearchParams;

  const statuses = Object.values(Status);
  const validatedStatus = statuses.includes(status) ?
    status
    :
    undefined;

  const orderByValidated = orderBy && columnNames.includes(orderBy);

  const currentPage = parseInt(page) || 1;
  const pageSize = 10;

  const issues = await getManyIssues({
    assignedToUserID: session!.user.id,
    where: { status: validatedStatus },
    orderBy: orderByValidated ?
      { [orderBy]: 'asc', }
      :
      undefined,
    skip: (currentPage - 1) * pageSize,
    take: pageSize,
  })

  const issueCount = await getIssueCount({
    assignedToUserID: session!.user.id,
    where: { status: validatedStatus },
  });

  return (
    <Flex direction='column' gap='3'>
      <IssueActions />
      <IssueTable searchParams={awaitedSearchParams} issues={issues} />

      <Flex justify={'center'}>
        <Pagination itemCount={issueCount} pageSize={pageSize} currentPage={currentPage} />
      </Flex>
    </Flex>
  )
};

// Opts out of static rendering. If this page is rendered statically, it will never get the new issues that have been added 
//  to the database (until it is redeployed)
export const dynamic = 'force-dynamic';

// Does the same as dynamic = 'force-dynamic' eg: revalidate every 0 seconds
// export const revalidate = 0;

// revalidate data every 60 seconds
// export const revalidate = 60;

export default Issues

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues',
}