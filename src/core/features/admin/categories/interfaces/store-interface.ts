import { ILinkEntity } from "@/core/features/customer/landing/interfaces/link-interface";

export interface IStore {
  name: string;

  description: string;

  logo: string;

  address: string;

  phone: string;

  email: string;

  link: ILinkEntity;
}
