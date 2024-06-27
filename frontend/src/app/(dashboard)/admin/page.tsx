'use client';

import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

import withAuth from '@/components/hoc/withAuth';
import Table from '@/components/table/Table';
import Typography from '@/components/Typography';
import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import { ApiReturn } from '@/types/api';
import { Bank } from '@/types/entities/user';
import clsxm from '@/lib/clsxm';
import { getToken } from '@/lib/cookies';

export default withAuth(DashboardBankPage, ['authed']);

function DashboardBankPage() {
    const tokens = getToken();
    const {
        data: bankResponse,
        isLoading
    } = useQuery<ApiReturn<Bank[]>>({ queryKey: ['/bank'] });

    const columns: ColumnDef<Bank>[] = [
        {
            accessorKey: 'no',
            header: 'No',
            cell: props => <span>{props.row.index + 1}</span>,
        },
        {
            accessorKey: 'name',
            header: 'Name',
            cell: props => <span>{`${props.getValue()}`}</span>,
            filterFn: (row, _id, value) => {
                return value.includes(row.getValue(_id));
            },
        },
        {
            accessorKey: 'branch',
            header: 'Branch',
            cell: props => <span>{`${props.getValue()}`}</span>,
            filterFn: (row, _id, value) => {
                return value.includes(row.getValue(_id));
            },
        },
        {
            accessorKey: 'accountNumber',
            header: 'Account Number',
            cell: props => <span>{`${props.getValue()}`}</span>,
            filterFn: (row, _id, value) => {
                return value.includes(row.getValue(_id));
            },
        },
        {
            accessorKey: 'balance',
            header: 'Balance',
            cell: props => <span>{`${props.getValue()}`}</span>,
            filterFn: (row, _id, value) => {
                return value.includes(row.getValue(_id));
            },
        },
        {
            accessorKey: 'createdAt',
            header: 'Created At',
            cell: (info) => {
                const createdAt = info.row.original.createdAt;
                if (!createdAt) {
                    return (
                        <Typography
                            as='td'
                            className={clsxm(
                                'truncate whitespace-nowrap py-3 px-10 lg:text-[16px] text-[14px]'
                            )}
                        >
                            {' '}
                        </Typography>
                    );
                } else {
                    const dateTime = createdAt.toString();
                    const date = dateTime.split('T')[0];
                    const time = dateTime.split('T')[1].split('.')[0];
                    const formattedTime = `${date} - ${time}`;

                    return (
                        <Typography
                            as='td'
                            className={clsxm(
                                'truncate whitespace-nowrap py-3 lg:text-[16px] text-[14px]'
                            )}
                        >
                            {formattedTime}
                        </Typography>
                    );
                }
            },
            filterFn: (row, _id, value) => {
                return value.includes(row.getValue(_id));
            },
        },
    ];

    return (
        (tokens !== undefined ? (
            <DashboardLayout>
                <section className='w-full bg-typo-surface px-10 py-10 min-h-screen flex flex-col gap-4 items-start'>
                    <Typography variant='btn' font='epilogue' weight='medium'>
                        BANK DASHBOARD
                    </Typography>
                    <Typography as='h5' variant='h5' font='epilogue' weight='semibold'>
                        Bank Data Management
                    </Typography>

                    <Table
                        className='text-black'
                        data={bankResponse?.data ?? []}
                        columns={columns}
                        isLoading={isLoading}
                        withFilter
                        withPaginationControl
                        withPaginationCount
                    />
                </section>
            </DashboardLayout>
        ) : (
            <></>
        ))
    );
}
