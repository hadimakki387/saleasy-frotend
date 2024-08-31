"use client";
import ThemeProvider from "@/providers/ThemeProvider";
import { usePathname } from "next/navigation";
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
      <ThemeProvider>{children}</ThemeProvider>
    </div>
  );
}
