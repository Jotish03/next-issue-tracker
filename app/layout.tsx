import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import PageLayout from "@/components/layout/page-layout";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Issue Tracker",
  description: "Created by JO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <PageLayout>{children}</PageLayout>
      </body>
    </html>
  );
}
