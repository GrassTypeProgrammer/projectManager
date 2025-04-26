//Put should be for replacing an object, patch should be for updating an object

import authOptions from "@/app/auth/authOptions";
import { getUniqueIssue } from "@/app/issues/IssueUtil";
import { patchIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";




// TODO Update status as well
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);

    if (!session) {
        // status 401 == unauthorised
        return NextResponse.json({}, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    // Validate
    const validation = patchIssueSchema.safeParse(body);

    // return error if invalid
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const { title, description } = body;


    // get issue from database
    const issue = await getUniqueIssue({
        assignedToUserID: session!.user.id,
        where: { id: parseInt(id) }
    });

    // return error if issue does not exist
    if (!issue) {
        return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 });
    }

    // Update issue
    const updatedIssue = await prisma.issue.update({
        // object to update
        where: { id: issue.id },
        // data to update
        data: {
            title,
            description,
        }
    });

    // return updated issue
    return NextResponse.json(updatedIssue);
}


export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);

    if (!session) {
        // status 401 == unauthorised
        return NextResponse.json({}, { status: 401 });
    }

    const { id } = await params;
    const issue = await getUniqueIssue({
        assignedToUserID: session!.user.id,
        where: { id: parseInt(id) }
    });

    if (!issue) {
        return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 });
    }

    await prisma.issue.delete({
        where: { id: parseInt(id) }
    });

    return NextResponse.json({});
}