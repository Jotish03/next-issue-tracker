import prisma from "@/prisma/client";
import React from "react";
import { Table, TableBody, TableRow } from "@/components/ui/table";
import Link from "next/link";
import Badge from "@/components/layout/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const LatestPost = async () => {
  const issue = await prisma.issue.findMany({
    orderBy: { created_at: "desc" },
    take: 5,
    include: { assignedToUser: true },
  });

  return (
    <main>
      <Card className="p-6 mt-10 m-4">
        <CardHeader>
          <CardTitle>Latest Issue</CardTitle>
          <CardDescription>Issue Posted Recently</CardDescription>
        </CardHeader>
        <Table suppressHydrationWarning>
          <TableBody>
            {issue.map((issue) => (
              <TableRow
                key={issue.id}
                className="flex flex-wrap items-center p-4"
              >
                <section className="flex flex-col items-start mr-4 gap-2">
                  <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                  <Badge status={issue.status} />
                </section>
                {issue.assignedToUser && (
                  <Avatar className="ml-auto">
                    <AvatarImage
                      src={issue.assignedToUser.image!}
                      alt={`${issue.assignedToUser.name} avatar`}
                    />
                  </Avatar>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </main>
  );
};

export default LatestPost;
