'use client';

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

interface Props {
    itemCount: number,
    pageSize: number,
    currentPage: number,
}

const Pagination = (props: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push('?' + params.toString());
    }

    const { itemCount, pageSize, currentPage } = props;
    const pageCount = Math.ceil(itemCount / pageSize);

    if (pageCount <= 1) {
        return null;
    }

    return (
        <Flex align='center' gap='2'>
            <Button size='1' color='gray' variant='soft' disabled={currentPage === 1} onClick={() => { changePage(1) }}>
                <DoubleArrowLeftIcon />
            </Button>
            <Button size='1' color='gray' variant='soft' disabled={currentPage === 1} onClick={() => { changePage(currentPage - 1) }}>
                <ChevronLeftIcon />
            </Button>

            <Text size='2'>Page {currentPage} of {pageCount}</Text>

            <Button size='1' color='gray' variant='soft' disabled={currentPage === pageCount} onClick={() => { changePage(currentPage + 1) }}>
                <ChevronRightIcon />
            </Button>
            <Button size='1' color='gray' variant='soft' disabled={currentPage === pageCount} onClick={() => { changePage(pageCount) }}>
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    )
}

export default Pagination