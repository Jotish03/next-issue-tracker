"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssue = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  return (
    <div
      className="flex justify-center"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issue", data);
        router.push("/issues");
      })}
    >
      <form className="flex flex-col items-center justify-center gap-2 w-1/2 mt-12">
        <Input
          placeholder="Enter Issue Title"
          {...register("title", { required: true })}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Enter Issue Description"
              className="w-full "
              {...field}
            />
          )}
        />

        <Button className="w-full">Submit Issue</Button>
      </form>
    </div>
  );
};

export default NewIssue;
