import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React, { cache } from "react";
import { ObjectId } from "mongodb";
import Badge from "@/components/layout/badge";
import { Card, CardContent } from "@/components/ui/card";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TbEdit } from "react-icons/tb";
import IssueEditButton from "./issue-edit-button";
import IssueDeleteButton from "./issue-delete-button";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/components/auth-provider/auth-options";
import AssigneFilter from "./assigne-select";
import { title } from "process";

interface Props {
  params: { id: string };
}
// caching
// const getIssuesId = cache((issueId:string)=> prisma.issue.findUnique({where:{ id: issueId}}))

const GetIssueByID = async ({ params }: Props) => {
  const session = await getServerSession(AuthOptions);

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
  const gridCols = session ? "md:grid-cols-5" : "md:grid-cols-1";
  return (
    <main
      className={`flex flex-wrap gap-8 md:grid ${gridCols} items-start justify-center p-12`}
    >
      <div className="grid col-span-4 w-full gap-4 ">
        <h1 className="text-6xl font-bold text-center">{getIssues.title}</h1>
        <div className="flex justify-center gap-2">
          <Badge status={getIssues.status} />
          <p className="text-zinc-500">{getIssues.created_at.toDateString()}</p>
        </div>
        <Card className="md:w-full mx-auto p-4">
          <CardContent className="prose dark:prose-invert max-w-full ">
            <Markdown>{getIssues.description}</Markdown>
          </CardContent>
        </Card>
      </div>

      {session && (
        <div className="col-span-1 flex flex-col gap-2 w-full ">
          <AssigneFilter issue={getIssues} />
          <IssueEditButton getIssues={getIssues.id} />
          <IssueDeleteButton getIssues={getIssues.id} />
        </div>
      )}
    </main>
  );
};

export async function generateMetadata({ params }: Props) {
  const meta = await prisma.issue.findUnique({ where: { id: params.id } });
  return {
    title: meta?.title,
    description: meta?.description,
  };
}

export default GetIssueByID;
