"use client";
import { setUser } from "@/components/global-slice";
import MainLoader from "@/components/global/navLoader/MainLoader";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/Header";
import SearchDialog from "@/components/layout/SearchDialog";
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
  const path = usePathname();
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
  const cart = localStorage.getItem("cart_items");
  useLayoutEffect(() => {
    if (cart) {
      const cartItems = JSON.parse(cart);
      if (cartItems.length > 0) {
        dispatch(setCartItems(cartItems));
      }
    }
  }, [cart]);
  const { data } = useGetMeQuery();
  useLayoutEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);

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
                <AuthenticationDialog
                  logo={storeData.logo}
                  storeName={storeData.name}
                />
                <SearchDialog />
                <div className="col-span-1 max-lg:hidden">
                  <CartDrawer />
                </div>
                {children}
              </div>
            </main>

            <Footer data={storeData} />
          </>
        )
      )}{" "}
    </>
  );
}
