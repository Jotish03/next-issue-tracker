import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface Props {
  src: string | null | undefined;
  fallback: string | null | undefined;
  username: string | null | undefined;
}

const ProfileAvatar = ({ src, fallback, username }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <Avatar className="w-8 h-8">
          <AvatarImage src={typeof src === "string" ? src : undefined} />
          <AvatarFallback>
            {" "}
            {typeof fallback === "string" ? fallback : undefined}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {typeof username === "string" ? username : undefined}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/api/auth/signout">Sign Out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAvatar;
