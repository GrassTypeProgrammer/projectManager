"use client"

import IssueStatusBadge, { StatusMap } from '@/app/components/IssueStatusBadge'
import { Issue, Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'


const IssueStatusDropdown = ({ issue }: { issue: Issue }) => {
    const setStatus = async (status: Status) => {
        await axios
            .patch(`/api/issues/${issue.id}`,
                { status })
            .catch(() => {
                toast.error('Changes could not be made.')
            });
    }

    return (
        <>
            <Select.Root
                defaultValue={issue.status}
                onValueChange={setStatus}>
                <Select.Trigger placeholder='Assign...' />
                <Select.Content>
                    <Select.Group >
                        <Select.Label>Statuses:</Select.Label>
                        {
                            Object.keys(Status).map((status) => {
                                const { label } = StatusMap[status as Status];

                                return (
                                    <Select.Item key={label} value={status}>
                                        <IssueStatusBadge status={status as Status} />
                                    </Select.Item>
                                )
                            })
                        }
                    </Select.Group>
                </Select.Content>

            </Select.Root>

            <Toaster />
        </>)
}

export default IssueStatusDropdown