"use client"

import IssueStatusBadge, { StatusMap } from '@/app/components/IssueStatusBadge'
import { Issue, Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import React from 'react'
import { Toaster } from 'react-hot-toast'


const SetStatusDropdown = ({ issue }: { issue: Issue }) => {

    const onValueChange = () => {

    }

    return (
        <>
            <Select.Root
                defaultValue={issue.status}
                onValueChange={onValueChange}>
                <Select.Trigger placeholder='Assign...' />
                <Select.Content>
                    <Select.Group >
                        <Select.Label>Statuses:</Select.Label>
                        {Object.keys(Status).map((status) => {
                            const { label } = StatusMap[status as Status];

                            return (
                                <Select.Item key={label} value={status}>
                                    <IssueStatusBadge  status={status as Status}/>
                                </Select.Item>
                            )
                        }
                        )}
                    </Select.Group>
                </Select.Content>

            </Select.Root>

            <Toaster />
        </>)
}

export default SetStatusDropdown