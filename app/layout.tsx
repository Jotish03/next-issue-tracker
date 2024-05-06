import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import PageLayout from "@/components/layout/page-layout";
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "@/components/auth-provider/authprovider";

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
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system">
            <PageLayout>{children}</PageLayout>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
