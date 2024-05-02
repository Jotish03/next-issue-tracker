"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";

import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ErrorCallout } from "@/components/layout/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/components/layout/validation-schema";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import ErrorMessage from "@/components/layout/error-message";
import Spinner from "@/components/layout/spinner";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
type IssueForm = z.infer<typeof issueSchema>;

const NewIssue = async () => {
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
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col items-center justify-center gap-2 w-1/2 mt-12"
        onSubmit={handleSubmit(async (data) => {
          try {
            setSubmitting(true);
            await axios.post("/api/issue", data);
            router.push("/issues");
          } catch (error) {
            setSubmitting(false);
            setError("Error creating issue request, please check your fields");
          }
        })}
      >
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Input placeholder="Enter Issue Title" {...register("title")} />

        <ErrorMessage>{errors.description?.message}</ErrorMessage>

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

        <Button className="w-full gap-2" disabled={submitting}>
          Submit Issue {submitting && <Spinner />}
        </Button>
        {error && <ErrorCallout error={error} />}
      </form>
    </div>
  );
};

export default NewIssue;
