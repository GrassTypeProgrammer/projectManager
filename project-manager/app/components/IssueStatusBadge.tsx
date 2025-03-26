import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

interface Props {
    // Status is a type made by prisma based on the status enum made in schema.prisma
    status: Status,
}
// Using 'red' | 'violet' | 'green' instead of string because the badge color doesn't accept any string, it only accepts
//      predefined color strings.
const StatusMap: Record<
    Status,
    { label: string, color: 'red' | 'violet' | 'green' }
> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In Progress', color: 'violet' },
    CLOSED: { label: 'Closed', color: 'green' },
}

const IssueStatusBadge = ({ status }: Props) => {
    const { label, color } = StatusMap[status];

    return (
        <Badge color={color}>
            {label}
        </Badge>
    )
}

export default IssueStatusBadge