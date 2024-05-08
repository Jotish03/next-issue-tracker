"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import { Issue, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const AssigneFilter = ({ issue }: { issue: Issue }) => {
  const { toast } = useToast();
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((response) => response.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton className="w-full h-10" />;
  if (error) return null;
  const handleValueChange = async (userId: string) => {
    try {
      await axios.patch("/api/issue/" + issue.id, {
        assignedToUserId: userId === "unassign" ? null : userId,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update assignee",
        action: <ToastAction altText="Retry">Retry</ToastAction>,
      });
    }
  };
  return (
    <Select
      defaultValue={issue.assignedToUserId || ""}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Assigne.." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Suggestions</SelectLabel>
          {issue.assignedToUserId && (
            <SelectItem value="unassign" className="text-red-400">
              Unassign User
            </SelectItem>
          )}
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AssigneFilter;
