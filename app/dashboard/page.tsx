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
    <section className="grid grid-cols-1 md:grid-cols-2 items-center">
      <div>
        <IssueCharts open={open} inProgress={inprogress} closed={closed} />
        <IssueSummary open={open} inProgress={inprogress} closed={closed} />
      </div>

      <LatestPost />
    </section>
  );
};

export default Dashboard;
