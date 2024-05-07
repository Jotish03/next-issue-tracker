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
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a Assigne.." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Suggestions</SelectLabel>
          {users.map((user) => (
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
