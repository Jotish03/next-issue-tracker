import React from "react";
import IssueForm from "../../_component/new-issue-form";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
interface Props {
  params: { id: string };
}
const EditIssue = async ({ params }: Props) => {
  const { id } = params;

  const issues = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issues) notFound();

  return <IssueForm issue={issues} />;
};

export default EditIssue;
