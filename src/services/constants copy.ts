import { SidebarData } from "../core/features/broadcast/broadcast-sidebar";

export const ServerUrl =
  process.env.NEXT_PUBLIC_MODE !== "development"
    ? "https://api.residents.ai/v1/"
    : "http://localhost:8080/v1/";

export enum APIEndpoints {
  login = "auth/login",
  register = "auth/register",
  logout = "auth/logout",
  fetchUser = "users",
  fetchInquiries = "inquiries",
  fetchSurveys = "surveys",
  fetchMembers = "members",
  fetchResources = "resources",
  fetchManageEntity = "manage",
  fetchStaff = "staff",
  createPayments = "payments",
}

export enum CookieNames {
  access = "access",
  refresh = "refresh",
  userId = "userId",
  collapsed = "collapsed",
}

export enum ToastType {
  success = "success",
  error = "error",
  info = "info",
  warning = "warning",
  default = "default",
}

export enum ChipType {
  success = "success",
  error = "error",
  info = "info",
  warning = "warning",
  default = "default",
  high = "high",
  low = "low",
  critical = "critical",
  medium = "medium",
}

export enum InputTypes {
  text = "text",
  number = "number",
  email = "email",
  password = "password",
  textarea = "textarea",
  select = "select",
  radio = "radio",
  checkbox = "checkbox",
  date = "date",
  time = "time",
  file = "file",
  image = "image",
}

export enum SortBy {
  date = "createdAt",
  Title = "title",
  Responsednb = "Responsednb",
}


export const SortByOptions = [
  { label: "Date", value: SortBy.date },
  { label: "Title", value: SortBy.Title },
  { label: "Responsednb", value: SortBy.Responsednb },
]

export enum Status {
  archived = "archived",
  draft = "draft",
  published = "published"
}

export const StatusOptions = [
  { label: "archived", value: Status.archived },
  { label: "draft", value: Status.draft },
  { label: "published", value: Status.published },
];

export enum EventColor {
  primary = "primary",
  success = "success",
  warning = "warning",
  info = "info",
}

export enum PaymentsType {
  reoccurring = "reoccurring",
  oneTime = "oneTime",
}

export const PaymentsOption = [
  { label: "Reoccurring Payment", value: PaymentsType.reoccurring },
  { label: "One Time Payment", value: PaymentsType.oneTime },
];

export const OccurrenceOption = [
  { label: "Weekly", value: "Weekly" },
  { label: "Monthly", value: "Monthly" },
  { label: "Yearly", value: "Yearly" },
];

export enum SubType {
  type = "type",
}

export const SubTypeOptions = [
  { label: "Animal Removal", value: SubType.type },
];

export const SidebarInfo: SidebarData = {
  "sms-campaign": {
    title: "SMS Campaign",
    links: [
      {
        id: 1,
        label: "Create Campaign",
        link: "/broadcast/sms-campaign/create-campaign",
      },
      {
        id: 2,
        label: "Scheduled Campaigns",
        link: "/broadcast/sms-campaign/scheduled-campaigns",
      },
      { id: 3, label: "Drafts", link: "/broadcast/sms-campaign/sms-drafts" },
      { id: 4, label: "History", link: "/broadcast/sms-campaign/history" },
    ],
  },
  "email-campaign": {
    title: "Email Campaign",
    links: [
      {
        id: 1,
        label: "Create Campaign",
        link: "/broadcast/email-campaign/create-campaign",
      },
      {
        id: 2,
        label: "Scheduled Campaigns",
        link: "/broadcast/email-campaign/scheduled-campaigns",
      },
      {
        id: 3,
        label: "Drafts",
        link: "/broadcast/email-campaign/email-drafts",
      },
    ],
  },
  "in-app": {
    title: "In App Notifications",
    links: [
      {
        id: 1,
        label: "Create Notifications",
        link: "/broadcast/in-app/create-notification",
      },
      {
        id: 2,
        label: "Scheduled Notifications",
        link: "/broadcast/in-app/scheduled-notification",
      },
      { id: 3, label: "Drafts", link: "/broadcast/in-app/drafts-notification" },
      {
        id: 4,
        label: "Notifications History",
        link: "/broadcast/in-app/history-notification",
      },
    ],
  },
};
