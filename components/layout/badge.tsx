import React from "react";
import { ShowBadge } from "../ui/badge";
import { Status } from "@prisma/client";

const statusMap: Record<Status, { label: string; color: string }> = {
  OPEN: { label: "Open", color: "bg-red-400" },
  IN_PROGRESS: { label: "In Progress", color: "bg-violet-400" },
  CLOSED: { label: "Closed", color: "bg-green-400" },
};

const Badge = ({ status }: { status: Status }) => {
  return (
    <ShowBadge className={statusMap[status].color}>
      {statusMap[status].label}
    </ShowBadge>
  );
};

export default Badge;
