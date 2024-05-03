"use client";
import { Button } from "@/components/ui/button";

import React, { useState } from "react";
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
import Spinner from "@/components/layout/spinner";

const IssueDeleteButton = ({ getIssues }: { getIssues: string }) => {
  const router = useRouter();

  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger
          disabled={isDeleting}
          className="gap-2 w-full flex items-center justify-center bg-red-500 p-2 rounded-md text-white disabled:bg-red-300 disabled:cursor-progress"
        >
          <RiDeleteBin5Line />
          <span>Delete</span>
          {isDeleting && <Spinner />}
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

            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={async () => {
                try {
                  setIsDeleting(true);
                  await axios.delete(`/api/issue/${getIssues}`);
                  router.push("/issues");
                  router.refresh();
                } catch (error) {
                  setIsDeleting(false);
                  setIsErrorOpen(true);
                }
              }}
            >
              Delete Issue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isErrorOpen}>
        <AlertDialogContent className="w-[350px] rounded-lg lg:w-full">
          <AlertDialogHeader>
            <AlertDialogTitle>Error Deleting Issue</AlertDialogTitle>
            <AlertDialogDescription>
              Check if Issue exist in Issue page or not and please try again
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsErrorOpen(false)}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default IssueDeleteButton;
