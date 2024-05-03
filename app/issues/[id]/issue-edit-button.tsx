import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { TbEdit } from "react-icons/tb";
const IssueEditButton = ({ getIssues }: { getIssues: string }) => {
  return (
    <Link href={`/issues/${getIssues}/edit`}>
      <Button className="gap-2 w-full">
        <TbEdit />
        Edit
      </Button>
    </Link>
  );
};

export default IssueEditButton;
