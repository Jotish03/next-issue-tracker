import { AuthOptions } from "@/components/auth-provider/auth-options";
import {
  issueSchema,
  patchIssueSchema,
} from "@/components/layout/validation-schema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(AuthOptions);
  if (!session)
    return NextResponse.json("Not Allowed, Please Try Signing in again", {
      status: 401,
    });

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 404 });
  }

  const { assignedToUserId, title, description } = body;

  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id },
    data: {
      title,
      description,
      assignedToUserId: assignedToUserId || null,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const session = await getServerSession(AuthOptions);
  if (!session)
    return NextResponse.json("Not Allowed, Please Try Signing in again", {
      status: 401,
    });

  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: { id },
  });

  return NextResponse.json({});
}
