import { Prisma } from "@prisma/client";
import { prisma } from '@/prisma/client';

interface getIssuesParams {
    assignedToUserID: string,
    where?: Prisma.IssueWhereInput,
    orderBy?: Prisma.IssueOrderByWithRelationInput | Prisma.IssueOrderByWithRelationInput[],
    take?: number,
    skip?: number,
    include?: Prisma.IssueInclude,
}

export function getManyIssues(
    {
        assignedToUserID,
        where,
        orderBy,
        skip,
        take,
        include,
    }: getIssuesParams) {
    const issues = prisma.issue.findMany(
        {
            where: { ...where, assignedToUserID },
            orderBy,
            skip,
            take,
            include,
        }
    );

    return issues;
}

export function getIssueCount({
    assignedToUserID,
    where,
    orderBy,
    skip,
    take,
}: getIssuesParams) {
    const count = prisma.issue.count({
        where: { ...where, assignedToUserID },
        orderBy,
        skip,
        take,
    });

    return count;
}


interface getUniqueIssuesParams {
    assignedToUserID: string,
    include?: Prisma.IssueInclude
    where: Prisma.IssueWhereUniqueInput,
}

export function getUniqueIssue({
    assignedToUserID,
    include,
    where,
}: getUniqueIssuesParams) {
    const issue = prisma.issue.findUnique(
        {
            where: { ...where, assignedToUserID },
            include,
        }
    );

    return issue;
}