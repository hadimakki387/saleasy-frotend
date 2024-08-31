"use client";
import ThemeProvider from "@/providers/ThemeProvider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-sm:px-2 px-4 2xl:px-40 py-4">
      {" "}
      <ThemeProvider>{children}</ThemeProvider>
    </div>
  );
}
