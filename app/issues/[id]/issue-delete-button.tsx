"use client";
import { Button } from "@/components/ui/button";

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
import axios from "axios";
import { useRouter } from "next/navigation";

const IssueDeleteButton = ({ getIssues }: { getIssues: string }) => {
  const router = useRouter();
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="gap-2 w-full flex items-center justify-center bg-red-500 p-2 rounded-md text-white">
          <RiDeleteBin5Line />
          <span>Delete</span>
        </div>
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
          <AlertDialogAction>
            <Button
              onClick={async () => {
                try {
                  await axios.delete(`/api/issue/${getIssues}`);
                  router.push("/issues");
                  router.refresh();
                } catch (error) {
                  console.error("Error deleting issue:", error);
                }
              }}
            >
              Delete Issue
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default IssueDeleteButton;
