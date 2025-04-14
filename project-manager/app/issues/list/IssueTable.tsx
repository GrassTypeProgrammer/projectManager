'use client'

import { IssueStatusBadge } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import { default as Link, default as NextLink } from 'next/link';

export interface IssueQuery{
    status: Status,
    orderBy: keyof Issue,
    page: string,
}

interface Props {
    searchParams: IssueQuery,
    issues: Issue[],
}

const IssueTable = ({ searchParams, issues }: Props) => {
    const { orderBy, } = searchParams;
    const queries = searchParams;

    return (
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
                                <ArrowUpIcon className='inline' />
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

    )
}


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

export const columnNames = columns.map(column => column.value)
export default IssueTable
