'use client';

import { Card } from '@radix-ui/themes';
import React from 'react'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts'

interface Props {
    open: number,
    inProgress: number,
    closed: number,
}

const IssueChart = (props: Props) => {
    const { open, inProgress, closed } = props;
    const data: {
        label: string,
        value: number
    }[] = [
            { label: 'Open', value: open },
            { label: 'In Progress', value: inProgress },
            { label: 'Closed', value: closed },
        ]


    return (
        <Card>
            {/* Makes chart size to parent container */}
            <ResponsiveContainer width={'100%'} height={300}>
                <BarChart data={data}>
                    <XAxis dataKey={'label'} />
                    <YAxis />
                    <Bar dataKey={'value'} barSize={60} style={{fill: 'var(--accent-9)'}}/>
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default IssueChart