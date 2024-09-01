"use client";
import ThemeProvider from "@/providers/ThemeProvider";
import { usePathname } from "next/navigation";
import React from "react";
import NextTopLoader from "nextjs-toploader";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  return (
    <div
      className={`max-sm:px-2 px-4 2xl:px-40 py-4 flex flex-col min-h-screen ${
        path.split("/").includes("search")
          ? "bg-white"
          : path.split("/").includes("item")
          ? "bg-[#f6f9fc]"
          : "bg-primary-bg"
      }`}
    >
      {" "}
      <ThemeProvider>
        {" "}
        <NextTopLoader
          color="var(--error)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px var(--error),0 0 5px var(--error)"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        {children}
      </ThemeProvider>
    </div>
  );
}
