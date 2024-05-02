import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import { ObjectId } from "bson";
import Badge from "@/components/layout/badge";
import { Card, CardContent } from "@/components/ui/card";
import Markdown from "react-markdown";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import IssueEditButton from "./issue-edit-button";
import IssueDetails from "./issue-details";

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
    <main className="flex flex-wrap gap-8 md:grid grid-cols-12 items-start justify-center p-12">
      <div className="grid col-span-11 w-full gap-4 ">
        <IssueDetails getIssues={getIssues} />
      </div>
      <div className="col-span-1">
        <IssueEditButton getIssues={getIssues.id} />
      </div>
    </main>
  );
};

export default GetIssueByID;
