//Put should be for replacing an object, patch should be for updating an object

import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";


// TODO Update status as well
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await request.json();
    // Validate
    const validation = issueSchema.safeParse(body);

    // return error if invalid
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 });
    }

    // get issue from database
    const issue = await prisma.issue.findUnique({
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
            title: body.title,
            description: body.description,
        }
    });

    // return updated issue
    return NextResponse.json(updatedIssue);
}