"use client";
import { v4 as uuidv4 } from "uuid";
import {
  Payments,
  AIAnalysis,
  Broadcasts,
  LayoutCalender as Calendar,
  Chat,
  Home,
  Check,
  Management,
  Members,
  Inquiries,
  Logout,
  NewsLetter,
  Reports,
  Resources,
  Staff,
  IconProps,
  Settings,
} from "digital-dojo-sidebar/dist";
import { NavItem } from "@/core/features/layout/types";

export const subItemIcon = (props?: IconProps) => (
  <div className={`w-2 h-2 rounded-full ${props?.fill}`} />
);

export const mainPaths: string[] = [
  "/virtual",
  "/",
  "/surveys",
  "/inquiries",
  "/newsletter",
  "/resources",
  "/events",
  "/broadcast",
  "/ai-chatbot",
  "/reports",
  "/members",
  "/payments",
  "/management",
  "/staff",
  "/virtual2",
  "/settings",
  "/features-management",
  "/support",
  "",
];

export const pathMap: any = {
  "/broadcast": [
    "/broadcast/sms-campaign/create-campaign",
    "/broadcast/email-campaign/create-campaign",
    "/broadcast/in-app/create-notification",
  ],
  "/management": [
    "/management/payments-management",
    "/management/verification-management",
  ],
  "/settings": [
    "/settings/account",
    "/settings/notifications",
    "/settings/faq",
  ],
};

export const NavItemsInit: NavItem[] = [
  {
    name: "",
    path: "/virtual",
    icon: (props) => null,
    index:0.0,
    subMenuIndex:0,
  },
  {
    name: "My Dashboard",
    path: "/",
    icon: (props) => <Home {...props} />,
    index:1.0,
    subMenuIndex:0,
  },
  {
    name: "Surveys",
    path: "/surveys",
    icon: (props) => <Check {...props} />,
    index:2.0,
    subMenuIndex:0,
  },
  {
    name: "Inquiries",
    path: "/inquiries",
    icon: (props) => <Inquiries {...props} />,
    index:3.0,
    subMenuIndex:0,
  },
  {
    name: "Newsletter",
    path: "/newsletter",
    icon: (props) => <NewsLetter {...props} />,
    index:4.0,
    subMenuIndex:0,
  },
  {
    name: "Resources",
    path: "/resources",
    icon: (props) => <Resources {...props} />,
    index:5.0,
    subMenuIndex:0,
  },
  {
    name: "Events",
    path: "/events",
    icon: (props) => <Calendar {...props} />,
    index:6.0,
    subMenuIndex:0,
  },
  {
    name: "Broadcast Tools",
    path: "/broadcast",
    icon: (props) => <Broadcasts {...props} />,
    index:7.0,
    subMenuIndex:0,
    subItems: [
      {
        name: "SMS Campaign",
        path: "sms-campaign/create-campaign",
        icon: subItemIcon,
        index:7.1,
        subMenuIndex:0,
      },
      {
        name: "Email Campaign",
        path: "email-campaign/create-campaign",
        icon: subItemIcon,
        index:7.2,
        subMenuIndex:0,
      },
      {
        name: "In App Notifications",
        path: "in-app/create-notification",
        icon: subItemIcon,
        index:7.3,
        subMenuIndex:0,
      },
    ],
  },
  {
    name: "AI Chatbot",
    path: "/ai-chatbot",
    icon: (props) => <AIAnalysis {...props} />,
    index:8.0,
    subMenuIndex:0,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: (props) => <Reports {...props} />,
    index:9.0,
    subMenuIndex:0,
  },

  {
    name: "Members",
    path: "/members",
    icon: (props) => <Members {...props} />,
    index:10.0,
    subMenuIndex:0,
  },
  {
    name: "Payments",
    path: "/payments",
    icon: (props) => <Payments {...props} />,
    index:11.0,
    subMenuIndex:0,
  },

  {
    name: "Management",
    path: "/management",
    icon: (props) => <Management {...props} />,
    index:12.0,
    subMenuIndex:0,
  },

  {
    name: "Staff",
    path: "/staff",
    icon: (props) => <Staff {...props} />,
    index:13.0,
    subMenuIndex:0,
  },
  {
    name: "",
    path: "/virtual2",
    icon: (props) => null,
    index:14.0,
    subMenuIndex:0,
  },
];

export const NavItems = NavItemsInit.map((item, index) => ({
  ...item,
  id: uuidv4(),
  subItems: item.subItems?.map((subItem) => ({
    ...subItem,
    id: uuidv4(),
  })),
}));

export const FooterItemsInit: NavItem[] = [
  {
    name: "Settings",
    path: "/settings",
    icon: (props) => <Settings {...props} />,
    index:50,
    subMenuIndex:0,
    subItems: [
      {
        name: "Account",
        path: "account",
        icon: subItemIcon,
        index:50.1,
        subMenuIndex:0,
      },
      {
        name: "Notifications",
        path: "notifications",
        icon: subItemIcon,
        index:50.2,
        subMenuIndex:0,
      },
      {
        name: "FAQS",
        path: "faq",
        icon: subItemIcon,
        index:50.3,
        subMenuIndex:0,
      },
    ],
  },
  {
    name: "Features Management",
    path: "/features-management",
    icon: (props) => <Settings {...props} />,
    index:51,
    subMenuIndex:0,
  },
  {
    name: "Provider Support",
    path: "/support",
    icon: (props) => <Chat {...props} />,
    index:52,
    subMenuIndex:0,
  },
  {
    name: "Logout",
    action: "LOGOUT",
    path: "",
    icon: (props) => <Logout {...props} />,
    subMenuIndex:0,
    
  },
];


export const FooterItems = FooterItemsInit.map((item, index) => ({
  ...item,
  id: uuidv4(),
  subItems: item.subItems?.map((subItem) => ({
    ...subItem,
    id: uuidv4(),
  })),
}));
