"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";
import { ModeToggle } from "../layout/dark-mode";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import ProfileAvatar from "./avatar";
import { Skeleton } from "../ui/skeleton";

const NavHeader = () => {
  const pathname = usePathname();
  const { status, data: session } = useSession();
  const router = useRouter();
  if (status === "loading") return <Skeleton className="w-[30px] h-3" />;
  const links = [
    { label: "Dashboard", paths: "/dashboard" },
    { label: "Issues", paths: "/issues" },
  ];

  return (
    <nav className="flex items-center justify-around p-4 border-b-2">
      <div>
        <Link href={"/"}>
          {" "}
          <FaBug size={30} />
        </Link>
      </div>
      <div>
        <ul className="flex items-center gap-4 text-zinc-400 font-medium">
          {links.map((link) => (
            <li
              key={link.paths}
              className={classNames({
                "text-zinc-900 dark:text-zinc-50": link.paths === pathname,
                "text-zinc-400 ": link.paths !== pathname,
                "hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors":
                  true,
              })}
            >
              <Link href={link.paths}>{link.label}</Link>
            </li>
          ))}

          {status === "authenticated" && (
            <ProfileAvatar
              username={session.user?.name}
              src={session.user?.image}
              fallback={session.user?.name}
            />
          )}
          {status === "unauthenticated" && (
            <Button
              variant={"outline"}
              onClick={() => router.push("/api/auth/signin")}
            >
              Sign In
            </Button>
          )}
          <ModeToggle />
        </ul>
      </div>
    </nav>
  );
};

export default NavHeader;
