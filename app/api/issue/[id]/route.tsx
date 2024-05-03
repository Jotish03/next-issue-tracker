import { issueSchema } from "@/components/layout/validation-schema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { title } from "process";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();

  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 404 });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id,
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  const issue = await prisma.issue.findUnique({
    where: {
      id,
    },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid Request" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: { id },
  });

  return NextResponse.json({});
}
