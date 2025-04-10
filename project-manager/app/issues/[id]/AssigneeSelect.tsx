'use client'

import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const { data: users, error, isLoading } = useUsers();

    if (isLoading) {
        return <Skeleton />
    }
    else if (error) {
        return null;
    }

    const unassignedValue = 'unassigned';

    const assignIssue = async (userID: string) => {
        await axios
            .patch(`/api/issues/${issue.id}`,
                { assignedToUserID: (userID && userID != unassignedValue) ? userID : null })
            .catch(() => {
                toast.error('Changes could not be made')
            });
    }


    return (
        <>
            <Select.Root
                defaultValue={issue.assignedToUserID || unassignedValue}
                onValueChange={assignIssue}>
                <Select.Trigger placeholder='Assign...' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value={unassignedValue}>Unassigned</Select.Item>
                        {users?.map(user =>
                            <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                        )}
                    </Select.Group>
                </Select.Content>

            </Select.Root>

            <Toaster />
        </>

    )
}

const useUsers = () => useQuery<User[]>({
    // identifies data in the cache
    queryKey: ['users'],
    // functino used to fetch data
    queryFn: () => axios.get('/api/users').then(response => response.data),
    // how long to use cached data before fetching it from the backend again. 60 * 1000 == 60 seconds
    staleTime: 60 * 1000,
    // how many times to try to fetch data if it fails
    retry: 3,
})

export default AssigneeSelect