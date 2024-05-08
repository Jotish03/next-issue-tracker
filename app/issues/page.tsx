import { Button } from "@/components/ui/button";
import prisma from "@/prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShowBadge } from "@/components/ui/badge";
import Badge from "@/components/layout/badge";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/components/auth-provider/auth-options";
import IssueFilter from "./_component/issue-filter";
import { Status } from "@prisma/client";

interface searchParamsProps {
  searchParams: { status: Status };
}

const Issues = async ({ searchParams }: searchParamsProps) => {
  const session = await getServerSession(AuthOptions);
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
  });

  return (
    <div className="flex  justify-center">
      <div className="flex flex-col items-center justify-center md:w-1/2 mt-6">
        {session && (
          <div className="flex items-center justify-between w-full">
            <IssueFilter />
            <Button className="">
              <Link href={"/issues/new"}>New Issue</Link>
            </Button>
          </div>
        )}
        <div className="md:w-full mt-8">
          {issues.length === 0 ? (
            <p className="text-center">No Issue Posted</p>
          ) : (
            <Table>
              <TableCaption>A list of recent issues posted</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Issue</TableHead>
                  <TableHead className="">Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell>
                      <Link
                        href={`/issues/${issue.id}`}
                        className="hover:text-zinc-500 transition-colors underline "
                      >
                        {issue.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge status={issue.status} />
                    </TableCell>
                    <TableCell>{issue.created_at.toDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";
export default Issues;
