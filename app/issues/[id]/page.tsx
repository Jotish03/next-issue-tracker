import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { ObjectId } from "bson";

interface Props {
  params: { id: string };
}

const GetIssueByID = async ({ params }: Props) => {
  // Check if the provided id is a valid ObjectId
  if (!ObjectId.isValid(params.id)) {
    // Handle the case where the id is invalid
    notFound();
    return null;
  }

  const objectId = new ObjectId(params.id);
  const getIssues = await prisma.issue.findUnique({
    where: { id: objectId.toString() },
  });

  if (!getIssues) notFound();

  return (
    <div>
      <p>{getIssues.title}</p>
      <p>{getIssues.description}</p>
      <p>{getIssues.status}</p>
      <p>{getIssues.created_at.toDateString()}</p>
    </div>
  );
};

export default GetIssueByID;
