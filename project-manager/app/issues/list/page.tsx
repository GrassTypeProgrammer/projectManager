import { prisma } from '@/prisma/client'
import { Table } from '@radix-ui/themes'
// The path to these is @/app/components, which uses the index.ts file in the components
import { IssueStatusBadge, Link } from '@/app/components'
import IssueActions from './IssueActions'
import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link';
import { ArrowUpIcon } from '@radix-ui/react-icons';

// interface Props {
//   searchParams: { status: Status }
// }

const Issues = async ({searchParams} : {searchParams:Promise<{status: Status, orderBy: keyof Issue}>}) => {
  const { status, orderBy, } = await searchParams;
  const queries = await searchParams;

  const columns: {
    label: string,
    value: keyof Issue,
    className?: string,
  }[] = [
      { label: "Issue", value: "title" },
      // {/* "hidden md:table-cell" == only appears on medium sized screens. So hidden on mobile.  */}
      { label: "Status", value: "status", className: "hidden md:table-cell" },
      { label: "Created At", value: "createdAt", className: "hidden md:table-cell" },
    ]

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
            {columns.map(column => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink href={{
                  // add all searchParams, then override order by. This preserves the other search params, such as filtering
                  query: { ...queries, orderBy: column.value }
                }}>
                  {column.label}
                </NextLink>
                {/* TODO implement sort by descending */}
                {column.value === orderBy &&
                  <ArrowUpIcon className='inline'/>
                }
              </Table.ColumnHeaderCell>
            ))}
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