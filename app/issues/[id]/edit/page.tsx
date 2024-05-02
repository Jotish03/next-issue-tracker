import React from "react";
import IssueForm from "../../_component/new-issue-form";
import prisma from "@/prisma/client";
import { ObjectId } from "bson";
import { notFound } from "next/navigation";
interface Props {
  params: { id: string };
}
const EditIssue = async ({ params }: Props) => {
  if (!ObjectId.isValid(params.id)) {
    // Handle the case where the id is invalid
    notFound();
    return null;
  }

  const objectId = new ObjectId(params.id);
  const issues = await prisma.issue.findUnique({
    where: { id: objectId.toString() },
  });

  if (!issues) notFound();

  return <IssueForm issue={issues} />;
};

export default EditIssue;
