import CustomImage from "@/components/global/CustomImage";
import { getAction, getActionMore, renderImage } from "@/services/table-utils";
import { ColumnGetter } from "@/services/types copy";

export const CustomerColumns: ColumnGetter = ({ onActionClick }) => {
  return [
    {
      field: "image",
      headerName: "",
      flex: 0.2,
      renderCell: (params) => {
        return renderImage(params, true);
      },
    },
    {
      field: "id",
      headerName: "#",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "CUSTOMER NAME",
      flex: 1,
      textTransform: "uppercase",
    },
    {
      field: "email",
      headerName: "EMAIL",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "PHONE",
      flex: 1,
    },

    {
      field: "createdAt",
      headerName: "CREATED AT",
      flex: 1,
    },

    {
      field: "totalOrders",
      headerName: "TOTAL ORDERS",
      flex: 0.5,
    },
    {
      field: "totalSpent",
      headerName: "TOTAL SPENT",
      flex: 0.5,
    },
    {
      field: "more",
      headerName: "",
      renderCell: (params) =>
        getActionMore({
          params,
          onActionClick,
          buttons: [
            {
              id: "contactOnWhatsApp",
              name: "Contact On WhatsApp",
              className: "text-black-500",
            },
          ],
        }),
      flex: 0.2,
      sortable: false,
    },
  ];
};
