import { PermissionList } from './permission-list';

export type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
    permission: PermissionList;
};

export type Bank = {
    _id: string;
    name: string;
    branch: string;
    accountNumber: string;
    balance: number;
    createdAt: string;
    updatedAt: string;
};