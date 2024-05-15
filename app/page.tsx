import UsernmaeHolder from "@/components/username-holder/username-holder";

import Image from "next/image";
import Dashboard from "./dashboard/main-dash";
import { Metadata } from "next";

export default function Home() {
  return (
    <main>
      <Dashboard />
    </main>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
