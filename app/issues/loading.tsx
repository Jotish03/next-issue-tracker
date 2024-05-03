import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";

const LoadingIssue = () => {
  const issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  return (
    <div className="flex  justify-center">
      <div className="flex flex-col items-center justify-center md:w-1/2 mt-6">
        <Button className="w-full">
          <Link href={"/issues/new"}>New Issue</Link>
        </Button>
        <div className="md:w-full mt-8">
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
                <TableRow key={issue}>
                  <TableCell>
                    {" "}
                    <Skeleton className="h-4 w-[150px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px] rounded-full" />
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Skeleton className="h-4 w-[150px]" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default LoadingIssue;
