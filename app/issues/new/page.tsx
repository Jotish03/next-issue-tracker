"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorCallout } from "@/components/layout/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/components/layout/validation-schema";
import { z } from "zod";
import { Label } from "@/components/ui/label";

type IssueForm = z.infer<typeof issueSchema>;

const NewIssue = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col items-center justify-center gap-2 w-1/2 mt-12"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issue", data);
            router.push("/issues");
          } catch (error) {
            setError("Error creating issue request, please check your fields");
          }
        })}
      >
        {errors.title && (
          <Label className="text-red-500 ">{errors.title.message}</Label>
        )}
        <Input placeholder="Enter Issue Title" {...register("title")} />

        {errors.description && (
          <Label className="text-red-500">{errors.description.message}</Label>
        )}
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
        {error && <ErrorCallout error={error} />}
      </form>
    </div>
  );
};

export default NewIssue;
