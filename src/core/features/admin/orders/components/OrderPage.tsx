"use client";
import { useAppSelector } from "@/providers/StoreWrapper";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useGetStoreOrderQuery } from "../redux/rtk";
import SeChip from "@/components/global/Chip/SE-Chip";
import { OrderStatus } from "../interfaces/order-entity";
import { ChipType } from "@/services/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";

type Props = {};

function OrderPage({}: Props) {
  const { store } = useAppSelector((state) => state.GlobalAdminRedux);
  const { data } = useGetStoreOrderQuery(store?.id as string, {
    skip: !store?.id,
  });
  console.log(data);
  return (
    <div className="mx-4">
      {data &&
        data.length &&
        data.map((order, index) => {
          return (
            <Accordion
              className="accordion-shadow"
              key={index}
              sx={{
                "& .MuiAccordion-root": {
                  boxShadow: "none !important",
                },
              }}
              style={{
                /* @ts-ignore */
                "--Paper-shadow": "none",
                "--tw-shadow":
                  "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                "--tw-shadow-colored":
                  "0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color)",
                "box-shadow":
                  "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
                "--tw-shadow-color": "#e5e5e5",
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <div className="flex items-center gap-4">
                  <p>{`#${order.id.slice(0, 8)}`}</p>
                  <SeChip
                    label={
                      order.status === OrderStatus.SHIPPING ? (
                        <FontAwesomeIcon icon={faTruck} className="" />
                      ) : (
                        order.status
                      )
                    }
                    type={
                      order.status === OrderStatus.ACCEPTED
                        ? ChipType.success
                        : order.status === OrderStatus.REJECTED
                        ? ChipType.error
                        : order.status === OrderStatus.PENDING
                        ? ChipType.warning
                        : ChipType.info
                    }
                  />
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className="grid grid-cols-5">
                  <div className="flex items-start gap-4">
                    <div className="col-span-1">order price:</div>
                    <div className="col-span-4">${order.total}</div>
                  </div>
                </div>
                <div className="grid grid-cols-5">
                  <div className="flex items-center gap-4 col-span-5">
                    <div className="col-span-1">order items:</div>
                    <div className="col-span-4  flex items-center gap-4">
                      {order.orderOptions?.map((order, index) => {
                        return (
                          <p key={index}>
                            {order.quantity} {order.item.name}
                            {","}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
}

export default OrderPage;
