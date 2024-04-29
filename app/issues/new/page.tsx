"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssue = () => {
  return (
    <div className="flex justify-center">
      <main className="flex flex-col items-center justify-center gap-2 w-1/2 mt-12">
        <Input placeholder="Enter Issue Title" />
        <SimpleMDE placeholder="Enter Issue Description" className="w-full " />
        <Button className="w-full">Submit Issue</Button>
      </main>
    </div>
  );
};

export default NewIssue;
