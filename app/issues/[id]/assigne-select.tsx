"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

const AssigneFilter = () => {
  const [users, setUser] = useState<User[]>([]);

  useEffect(() => {
    const fetchedData = async () => {
      const { data } = await axios.get<User[]>("/api/users");
      setUser(data);
    };
    fetchedData();
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border border-black dark:border-white p-[6px] rounded-md">
        Select Assigne..
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]">
        <DropdownMenuLabel>Suggestions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {users.map((user) => (
          <DropdownMenuItem key={user.id}>{user.name}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AssigneFilter;
