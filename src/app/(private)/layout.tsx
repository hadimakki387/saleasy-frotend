"use client";
import {
  setIsAuthecationDialogOpen,
  setIsLoginDialogOpen,
  setUser,
} from "@/components/global-slice";
import MainLoader from "@/components/global/navLoader/MainLoader";
import AdminHeader from "@/components/layout/AdminHeader";
import { SideBar } from "@/components/layout/reactsideBar/SideBar.tsx";
import {
  setAdminUser,
  setStore,
} from "@/core/features/admin/global-admin-redux";
import { useGetAdminStoreDataQuery } from "@/core/features/admin/landing-page/redux/rtk";
import {
  LandingExtendedApi,
  useGetMeQuery,
} from "@/core/features/customer/landing/redux/rtk";
import { useAppDispatch } from "@/providers/StoreWrapper";
import {
  notFound,
  useParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import React, { useLayoutEffect } from "react";
import "react-phone-number-input/style.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { store } = useParams();
  const {
    data: storeData,
    isLoading: storeLoading,
    error: storeError,
  } = useGetAdminStoreDataQuery(store as string);
  // const { CartItems } = useAppSelector((state) => state.ItemSlice);
  const dispatch = useAppDispatch();
  const { data, isError, isLoading, error, refetch } = useGetMeQuery();

  useLayoutEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
    if (storeData) {
      dispatch(setStore(storeData));
    }
  }, [data, storeData]);
  const router = useRouter();
  const params = useSearchParams();

  if (!storeData && storeError) throw notFound();
  useLayoutEffect(() => {
    if (
      (data?.role !== "admin" && !isLoading) ||
      (isError && error && params.get("login") !== "true")
    ) {
      dispatch(setIsAuthecationDialogOpen(true));
      dispatch(setIsLoginDialogOpen(true));
      router.push(`/${store}?adminRedirect=${window.location.pathname}`);
      //reset the query data
      localStorage.removeItem("beerer");
      // dispatch(
      //   LandingExtendedApi.util.updateQueryData("getMe", undefined, (draft) => {
      //     draft = undefined;
      //   })
      // );
    }

    if (data && !isLoading) {
      dispatch(setAdminUser(data));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, storeData, isLoading, isError]);
  return (
    <>
      {storeLoading ? (
        <div className="h-screen flex items-center justify-center">
          <MainLoader />
        </div>
      ) : (
        storeData && (
          <>
            <NextTopLoader
              color="var(--admin-primary)"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={true}
              easing="ease"
              speed={200}
              shadow="0 0 10px var(--admin-primary),0 0 5px var(--admin-primary)"
              template='<div class="bar" role="bar" style="z-index:100000000000000000"><div class="peg"style="z-index:100000000000000000"></div></div>'
              zIndex={10 ^ 30}
              showAtBottom={false}
            />

            <div className="flex ">
              <SideBar />
              <div className="w-full">
                <AdminHeader />
                {children}
              </div>
            </div>
          </>
        )
      )}{" "}
    </>
  );
}
