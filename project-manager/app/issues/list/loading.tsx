import { Skeleton } from '@/app/components'
import { Table } from '@radix-ui/themes'
import IssueActions from './IssueActions'

const LoadingIssuesPage = () => {
    // Dummy data for the loading skeleton
    const issues = [1, 2, 3, 4, 5];

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
                        return <Table.Row key={issue}>
                            <Table.Cell>
                                <Skeleton />
                                {/* If md (medium sized device) is hidden */}
                                <div className='block md:hidden'>
                                    <Skeleton />
                                </div>
                            </Table.Cell>

                            <Table.Cell className='hidden md:table-cell'>
                                <Skeleton />
                            </Table.Cell>

                            <Table.Cell className='hidden md:table-cell'>
                                <Skeleton />
                            </Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default LoadingIssuesPage