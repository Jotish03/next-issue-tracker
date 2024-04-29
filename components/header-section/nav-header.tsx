"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";
import { ModeToggle } from "../layout/dark-mode";
const NavHeader = () => {
  const pathname = usePathname();
  console.log(pathname);
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
          <ModeToggle />
        </ul>
      </div>
    </nav>
  );
};

export default NavHeader;
