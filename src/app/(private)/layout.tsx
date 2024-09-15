"use client";
import { setUser } from "@/components/global-slice";
import MainLoader from "@/components/global/navLoader/MainLoader";
import AdminHeader from "@/components/layout/AdminHeader";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/Header";
import { SideBar } from "@/components/layout/reactsideBar/SideBar.tsx";
import SearchDialog from "@/components/layout/SearchDialog";
import { setStore } from "@/core/features/admin/global-admin-redux";
import { setCartItems } from "@/core/features/customer/item-page/redux/redux";
import AuthenticationDialog from "@/core/features/customer/landing/components/AuthenticationDialog";
import {
  useGetMeQuery,
  useGetStoreDataQuery,
} from "@/core/features/customer/landing/redux/rtk";
import CartDrawer from "@/core/features/customer/search-page/components/CartDrawer";
import { notFound, useParams, usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";
import React, { Suspense, useLayoutEffect } from "react";
import "react-phone-number-input/style.css";
import { useDispatch } from "react-redux";
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
  } = useGetStoreDataQuery({
    id: store as string,
  });
  // const { CartItems } = useAppSelector((state) => state.ItemSlice);
  const dispatch = useDispatch();
  const { data, isError, isLoading } = useGetMeQuery();
  useLayoutEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
    if (storeData) {
      dispatch(setStore(storeData));
    }
  }, [data, storeData]);

  if (!storeData && storeError) throw notFound();
  if ((data?.role !== "admin" && !isLoading) || isError) throw notFound();
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
              template='<div class="bar" role="bar"><div class="peg"></div></div>'
              zIndex={1600}
              showAtBottom={false}
            />
            <SideBar />
            <div className="md:ml-[250px] 2xl:ml-[15vw]">
              <AdminHeader />
              {children}
            </div>
          </>
        )
      )}{" "}
    </>
  );
}
