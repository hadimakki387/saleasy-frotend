import { MainInterface } from "@/services/types";
import { ICategories } from "./category-interface";

export enum sectionsTypes {
  deals_of_the_day = "deals_of_the_day",
  manually_selected = "manually_selected",
  category_related = "category_related",
}

export interface advertisementSection {
  id: string;
  text1: string;
  text2: string;
  redText: string;
  backgroundImage: string;
  link: {
    title: string;
    target: string;
  };
}
export interface SectionInterface {
  id: string;
  title: string;
  categoryId: string;
  items?: string[];
  type: sectionsTypes;
  advertisementSection: advertisementSection[];
}

export interface IHeaderLink {
  id?: string;
  links: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
  logoSize: number;
  logo: string;
  shippingFee: string;
}

export interface ICarousel {
  id: string;
  text1: string;
  text2: string;
  text3: string;
  text4: string;
  backgroundImage: string;
  link: {
    title: string;
    target: string;
  };
}

export interface sideBoxInterface {
  id: string;
  backgroundImage: string;
  text1: string;
  text2: string;
  text3: string;
  link: {
    title: string;
    target: string;
  };
}

export interface IHeroSection {
  Carousel: ICarousel[];
  sideBoxes: sideBoxInterface[];
}

export interface ILinkEntity extends MainInterface {
  name: string;
  description: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  isPublished: boolean;
  categories: ICategories[];
  link: {
    id: string;
    header: IHeaderLink;

    Hero: IHeroSection;

    sections: SectionInterface[];

    footer: {
      descriptionText: string;
    };
  };
}
