'use client'

import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import Skeleton from 'react-loading-skeleton';

const AssigneeSelect = () => {
    const { data: users, error, isLoading } = useQuery<User[]>({
        // identifies data in the cache
        queryKey: ['users'],
        // functino used to fetch data
        queryFn: () => axios.get('/api/users').then(response => response.data),
        // how long to use cached data before fetching it from the backend again. 60 * 1000 == 60 seconds
        staleTime: 60 * 1000,
        // how many times to try to fetch data if it fails
        retry: 3,
    })

    if (isLoading) {
        return <Skeleton />
    }
    else if (error) {
        return null;
    }

    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign...' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users?.map(user =>
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    )}
                </Select.Group>
            </Select.Content>

        </Select.Root>
    )
}

export default AssigneeSelect