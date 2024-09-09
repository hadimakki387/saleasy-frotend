"use client";
import ThemeProvider from "@/providers/ThemeProvider";
import { notFound, useParams, usePathname } from "next/navigation";
import React, { Suspense } from "react";
import NextTopLoader from "nextjs-toploader";
import Header from "@/components/layout/Header";
import MainLoader from "@/components/global/navLoader/MainLoader";
import Footer from "@/components/layout/footer";
import { useAppSelector } from "@/providers/StoreWrapper";
import { useGetStoreDataQuery } from "@/core/features/landing/redux/rtk";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const path = usePathname();
  const { store } = useParams();
  const {
    data: storeData,
    isLoading: storeLoading,
    error: storeError,
  } = useGetStoreDataQuery({
    id: store as string,
  });
  if (!storeData && storeError) throw notFound();
  return (
    <>
      {storeLoading ? (
        <div className="h-screen flex items-center justify-center">
          <MainLoader />
        </div>
      ) : (
        storeData && (
          <>
            <Suspense fallback={<div>Loading...</div>}>
              <Header link={storeData} />
            </Suspense>
            <main className="">
              {" "}
              <div
                className={`max-sm:px-2 px-4 2xl:px-40 py-4 flex flex-col min-h-screen ${
                  path.split("/").includes("search")
                    ? "bg-white"
                    : path.split("/").includes("item")
                    ? "bg-[#f6f9fc]"
                    : "bg-primary-bg"
                }`}
              >
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
                    template='<div class="bar" role="bar"><div class="peg"></div></div>'
                    zIndex={1600}
                    showAtBottom={false}
                  />
                  {children}
                </ThemeProvider>
              </div>
            </main>

            <Footer data={storeData} />
          </>
        )
      )}{" "}
    </>
  );
}
