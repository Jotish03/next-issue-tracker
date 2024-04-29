import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Issues = () => {
  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-center w-1/2 mt-6">
        <Button className="w-full">
          <Link href={"/issues/new"}>New Issue</Link>
        </Button>
      </div>
    </div>
  );
};

export default Issues;
