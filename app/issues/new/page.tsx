import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const NewIssue = () => {
  return (
    <div className="flex justify-center">
      <main className="flex flex-col items-center justify-center gap-2 w-1/2 mt-12">
        <Input placeholder="Enter Issue Title" />
        <Textarea placeholder="Enter Issue Description" />
        <Button className="w-full">Submit Issue</Button>
      </main>
    </div>
  );
};

export default NewIssue;
