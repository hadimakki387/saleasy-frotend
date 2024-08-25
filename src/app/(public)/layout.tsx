"use client";
import ThemeProvider from "@/providers/ThemeProvider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-40 ">
      {" "}
      <ThemeProvider>{children}</ThemeProvider>
    </div>
  );
}
