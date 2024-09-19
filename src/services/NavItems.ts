//check the items in sideBar and add them here as navItems with the probability of having subItems
import AI from "@/components/SVGs/AI";
import Categories from "@/components/SVGs/Categories";
import Customers from "@/components/SVGs/Customers";
import Home from "@/components/SVGs/Home";

interface items {
  title: string;
  links: {
    label: string;
    path: string;
    icon: any;
    hasSubItems?: boolean;
    subItems?: {
      label: string;
      path: string;
    }[];
  }[];
}

// get User through the id in cookies

export const NavItems = (): items[] => {
  return [
    {
      title: "",
      links: [
        {
          label: "Landing Page",
          path: "/landing",
          icon: Home,
        },
        {
          label: "Customers",
          path: "/customers",
          icon: Customers,
        },
        {
          label: "Items",
          path: "/items",
          icon: AI,
        },
        {
          label: "Categories",
          path: "/categories",
          icon: Categories,
        },
      ],
    },
  ];
};
