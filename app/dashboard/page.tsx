import IssuePagination from "@/components/layout/pagination";

import React from "react";
import LatestPost from "./latest-issue";
import IssueSummary from "./issue-summary";
import prisma from "@/prisma/client";
import IssueCharts from "./issue-charts";

const Dashboard = async () => {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inprogress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  return (
    <main className="">
      <LatestPost />
      <IssueSummary open={open} inProgress={inprogress} closed={closed} />
      <IssueCharts open={open} inProgress={inprogress} closed={closed} />
    </main>
  );
};

export default Dashboard;
