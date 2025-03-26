import React from 'react'
import { Button, Table } from '@radix-ui/themes'
import Link from 'next/link'
import { prisma } from '@/prisma/client'

const Issues = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <div className='mb-5'>
        <Button>
          <Link href='/issues/new'>New Issue</Link>
        </Button>
      </div>

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
            return <Table.Row key={issue.id}>
              <Table.Cell>
                {issue.title}
                {/* If md (medium sized device) is hidden */}
                <div className='block md:hidden'>
                  {issue.status}
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.status}</Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
            </Table.Row>
          })}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

export default Issues