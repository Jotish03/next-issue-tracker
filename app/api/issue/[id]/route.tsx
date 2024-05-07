import { AuthOptions } from "@/components/auth-provider/auth-options";
import {
  issueSchema,
  patchIssueSchema,
} from "@/components/layout/validation-schema";
import prisma from "@/prisma/client";
import { ObjectId } from "bson";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params: { id } }: Props) {
  // const session = await getServerSession(AuthOptions);

  // if (!session)
  //   return NextResponse.json("Not Allowed, Please Try Signing in again", {
  //     status: 401,
  //   });
  const body = await request.json();

  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 404 });
  }

  const { assignedToUserId, title, description } = body;

  // Check if assignedToUserId is provided and valid
  if (assignedToUserId && ObjectId.isValid(assignedToUserId)) {
    const objectId = new ObjectId(assignedToUserId);

    const user = await prisma.user.findUnique({
      where: { id: objectId.toString() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
    }
    // If the user exists, you can proceed with other operations
  } else {
    // Handle the case when assignedToUserId is not provided or invalid
    return NextResponse.json({ error: "Error with ID" }, { status: 404 });
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
      title,
      description,
      assignedToUserId,
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
