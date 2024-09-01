import { setIsCartDrawerOpen } from "@/components/global-slice";
import SeButton from "@/components/global/SeButton";
import SeDrawer from "@/components/global/SeDrawer";
import { useAppSelector } from "@/providers/StoreWrapper";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { setCartItems } from "../../item-page/redux/redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type Props = {};

function CartDrawer({}: Props) {
  const { isCartDrawerOpen } = useAppSelector((state) => state.GlobalSlice);
  const { CartItems } = useAppSelector((state) => state.ItemSlice);
  const dispatch = useDispatch();
  return (
    <SeDrawer
      open={isCartDrawerOpen}
      onOpen={() => {}}
      onClose={() => {
        dispatch(setIsCartDrawerOpen(false));
      }}
    >
      {CartItems.length ? (
        <div className="space-y-2">
          {CartItems.map((item, index) => {
            console.log(item.quantity);
            return (
              <div key={index} className="flex items-center gap-4 ">
                <div className="flex flex-col gap-1 items-center justify-between min-h-full">
                  <div>
                    <SeButton
                      label={"+"}
                      fullRounded
                      sx={{
                        width: "1.5rem !important",
                        height: "1.5rem !important",
                        padding: "0",
                        minWidth: "1.5rem",
                      }}
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => {
                        const findItem = CartItems.map((cartItem) => {
                          if (cartItem.id === item.id) {
                            return {
                              ...cartItem,
                              quantity: cartItem.quantity + 1,
                            };
                          } else {
                            return cartItem;
                          }
                        });
                        if (!findItem) return;
                        dispatch(setCartItems(findItem));
                      }}
                    />
                  </div>
                  <div>{item.quantity}</div>
                  <div>
                    <SeButton
                      onClick={() => {
                        const findItem = CartItems.map((cartItem) => {
                          if (cartItem.id === item.id) {
                            return {
                              ...cartItem,
                              quantity: cartItem.quantity - 1,
                            };
                          } else {
                            return cartItem;
                          }
                        });
                        if (!findItem) return;
                        dispatch(setCartItems(findItem));
                      }}
                      label={"-"}
                      fullRounded
                      sx={{
                        width: "1.5rem !important",
                        height: "1.5rem !important",
                        padding: "0",
                        minWidth: "1.5rem",
                      }}
                      variant="outlined"
                      color="error"
                      size="small"
                    />
                  </div>
                </div>
                <Image
                  src={item.imageSrc}
                  alt="pants"
                  width={100}
                  height={100}
                  className="w-28 rounded-md bg-slate-100"
                />
                <div className="w-full flex items-center justify-between">
                  <div className="flex flex-col items-start justify-start h-full">
                    <p>{item.title}</p>
                    <p className="text-xs text-sub-title-text">
                      ${item.price} x {item.quantity}
                    </p>
                    <p className="text-sm text-error font-semibold">
                      ${item.price * item.quantity}
                    </p>
                  </div>
                  <div>
                    <SeButton
                      icon={<FontAwesomeIcon icon={faX} className="text-sm" />}
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        const findItem = CartItems.filter(
                          (cartItem) => cartItem.id !== item.id
                        );
                        if (!findItem) return;
                        dispatch(setCartItems(findItem));
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="sticky bottom-0 left-0 right-0 flex items-center justify-center bg-white py-4">
            <SeButton
              label={"Checkout"}
              variant="contained"
              color="error"
              rounded
              sx={{
                padding: "0.5rem 2rem",
                fontSize: "1rem",
              }}
              fullWidth
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          {" "}
          <p>No items in cart</p>
        </div>
      )}
    </SeDrawer>
  );
}

export default CartDrawer;
