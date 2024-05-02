import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { ObjectId } from "mongodb";
import Badge from "@/components/layout/badge";
import { Card, CardContent } from "@/components/ui/card";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TbEdit } from "react-icons/tb";

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
    <main className="flex flex-wrap gap-8 md:grid grid-cols-10 items-start justify-center p-12">
      <div className="grid col-span-9 w-full gap-4 ">
        <h1 className="text-6xl font-bold text-center">{getIssues.title}</h1>
        <div className="flex justify-center gap-2">
          <Badge status={getIssues.status} />
          <p className="text-zinc-500">{getIssues.created_at.toDateString()}</p>
        </div>
        <Card className="md:w-1/2 mx-auto p-4">
          <CardContent className="prose">
            <Markdown>{getIssues.description}</Markdown>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-1">
        <Link href={`/issues/${getIssues.id}/edit`}>
          <Button className="gap-2">
            <TbEdit />
            Edit
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default GetIssueByID;
