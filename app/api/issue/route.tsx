import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../../components/layout/validation-schema";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/components/auth-provider/auth-options";

export async function POST(request: NextRequest) {
  const session = await getServerSession(AuthOptions);

  if (!session)
    return NextResponse.json("Not Allowed, Please Try Signing in again", {
      status: 401,
    });

  const body = await request.json();

  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 200 });
}
