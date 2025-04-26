// import { prisma } from '@/prisma/client';
import { Card, Flex, Heading, Table } from '@radix-ui/themes';
import Link from 'next/link';
import { IssueStatusBadge } from '../components';
import { getManyIssues } from '../issues/IssueUtil';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/authOptions';

const LatestIssues = async () => {
    const session = await getServerSession(authOptions);

    const issues = await getManyIssues({
        assignedToUserID: session!.user.id,
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
            assignedToUser: true,
        }
    });

    return (
        <Card>
            <Heading size={'4'} mb='5'>
                Latest Issues
            </Heading>

            <Table.Root>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Flex justify={'between'}>
                                    <Flex direction={'column'} align='start' gap='2'>
                                        <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                                        <IssueStatusBadge status={issue.status} />
                                    </Flex>

                                    {/* {issue.assignedToUser && */}
                                    {/* <Avatar
                                            fallback='?'
                                            src={issue.assignedToUser.image!}
                                            size='2'
                                            radius='full'
                                        /> */}
                                    {/* } */}
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    )
}

export default LatestIssues