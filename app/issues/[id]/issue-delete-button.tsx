import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const IssueDeleteButton = ({ getIssues }: { getIssues: string }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {" "}
        <Button className="gap-2 w-full" variant={"destructive"}>
          <RiDeleteBin5Line />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[350px] rounded-lg lg:w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-700">
            <Link href={`/issues/${getIssues}/delete`}>Delete Issue</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default IssueDeleteButton;
