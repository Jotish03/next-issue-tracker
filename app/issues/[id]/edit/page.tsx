import React from "react";
import dynamic from "next/dynamic";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import LoadingForm from "@/components/layout/form-loading";

const IssueForm = dynamic(() => import("../../_component/new-issue-form"), {
  ssr: false,
  loading: () => <LoadingForm />,
});
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
