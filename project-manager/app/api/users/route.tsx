import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// the request isn't used but kept here to prevent caching
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest){
    const users = await prisma.user.findMany({orderBy: {name: 'asc'}});
    return NextResponse.json(users);
}