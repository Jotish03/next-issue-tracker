"use client";

import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";
interface Props {
  open: number;
  inProgress: number;
  closed: number;
}
const IssueCharts = ({ open, inProgress, closed }: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const htmlElement = document.documentElement;
    const isDarkModeEnabled = htmlElement.classList.contains("dark");
    setIsDarkMode(isDarkModeEnabled);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          setIsDarkMode(htmlElement.classList.contains("dark"));
        }
      });
    });

    observer.observe(htmlElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  const data: { label: string; value: number }[] = [
    { label: "Open Issues", value: open },
    { label: "In-Progress Issues", value: open },
    { label: "Closed Issues", value: closed },
  ];
  return (
    <div className="m-4 ">
      <Card>
        <ResponsiveContainer width={"100%"} height={400}>
          <BarChart data={data}>
            <XAxis dataKey={"label"} />
            <YAxis />
            <Bar
              dataKey={"value"}
              barSize={60}
              fill={isDarkMode ? "yellow" : "black"}
            />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default IssueCharts;
