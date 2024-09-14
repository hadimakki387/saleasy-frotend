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
];

export enum Status {
  archived = "archived",
  draft = "draft",
  published = "published",
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
