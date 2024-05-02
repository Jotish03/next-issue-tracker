import Badge from "@/components/layout/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Issue } from "@prisma/client";
import React from "react";
import Markdown from "react-markdown";

const IssueDetails = ({ getIssues }: { getIssues: Issue }) => {
  return (
    <>
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
    </>
  );
};

export default IssueDetails;
