import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { ObjectId } from "bson";
import Badge from "@/components/layout/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className="flex flex-col items-center justify-center gap-4 p-6">
      <h1 className="text-6xl font-bold">{getIssues.title}</h1>
      <div className="flex gap-2">
        <Badge status={getIssues.status} />
        <p className="text-zinc-500">{getIssues.created_at.toDateString()}</p>
      </div>
      <Card className="md:w-1/2 p-4">
        <CardContent>
          <p>{getIssues.description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GetIssueByID;
