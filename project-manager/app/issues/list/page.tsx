import { prisma } from '@/prisma/client'
import { Table } from '@radix-ui/themes'
// The path to these is @/app/components, which uses the index.ts file in the components
import { IssueStatusBadge, Link } from '@/app/components'
import IssueActions from './IssueActions'
import { Status } from '@prisma/client';

interface Props {
  searchParams: { status: Status }
}

const Issues = async ({ searchParams }: Props) => {
  const {status} = await searchParams;
  const statuses = Object.values(Status);
  const validatedStatus = statuses.includes(status) ?
    status
    :
    undefined;

  const issues = await prisma.issue.findMany(
    {
      where: {
        status: validatedStatus,
      }
    }
  );

  return (
    <div>
      <IssueActions />

      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
            {/* 'hidden md:table-cell' == only appears on medium sized screens. So hidden on mobile.  */}
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map(issue => {
            return <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                {/* If md (medium sized device) is hidden */}
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>

              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>

              <Table.Cell className='hidden md:table-cell'>
                {issue.createdAt.toDateString()}
              </Table.Cell>

            </Table.Row>
          })}
        </Table.Body>
      </Table.Root>
    </div>
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