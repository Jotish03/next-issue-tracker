import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Status } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const container: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-Progress Issues", value: open, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <div className="flex justify-around gap-2 m-4 flex-wrap ">
      {container.map((issue) => (
        <Card key={issue.label} className=" p-10 w-full lg:w-[600px]  ">
          <div className="flex flex-col items-center justify-center ">
            <Link href={`/issues?status=${issue.status}`}>{issue.label}</Link>
            <Label className="mt-4 font-bold text-4xl">{issue.value}</Label>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default IssueSummary;
