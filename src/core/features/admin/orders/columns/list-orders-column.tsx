import CustomImage from "@/components/global/CustomImage";
import {
  getAction,
  getActionMore,
  getChips,
  getOrderChips,
  renderImage,
  renderMoreActionsIcons,
} from "@/services/table-utils";
import { ColumnGetter } from "@/services/types copy";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const OrdersColumns: ColumnGetter = ({ onActionClick }) => {
  return [
    {
      field: "id",
      headerName: "ORDER ID",
      flex: 1,
      renderCell: (params) => {
        return <div>#{params.value.slice(0, 8)}</div>;
      },
    },
    {
      field: "status",
      headerName: "ORDER STATUS",
      flex: 1,
      textTransform: "uppercase",
      renderCell: (params) => {
        return getOrderChips({ params });
      },
    },
    {
      field: "createdAt",
      headerName: "CREATED AT",
      flex: 1,
    },
    {
      field: "updatedAt",
      headerName: "UPDATED AT",
      flex: 1,
    },

    {
      field: "more",
      headerName: "",
      renderCell: (params) => {
        return renderMoreActionsIcons({
          params,
          onActionClick,
          buttons: [
            {
              value: "view",
              icon: (
                <FontAwesomeIcon icon={faEye} className="text-title-text" />
              ),
            },
            {
              value: "delete",
              icon: (
                <FontAwesomeIcon icon={faTrashCan} className="text-error" />
              ),
            },
          ],
        });
      },
      flex: 0.2,
      sortable: false,
    },
  ];
};
