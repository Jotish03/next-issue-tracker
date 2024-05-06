"use client";
import { useSession } from "next-auth/react";
import React from "react";

const UsernmaeHolder = () => {
  const { status, data: session } = useSession();
  return (
    <div className="flex items-center justify-center mt-12">
      {status === "authenticated" && (
        <h1 className="font-semi-bold text-6xl">
          <span className="font-thin text-green-500 dark:text-yellow-500">
            Hi ,
          </span>{" "}
          {session.user?.name}
        </h1>
      )}
    </div>
  );
};

export default UsernmaeHolder;
