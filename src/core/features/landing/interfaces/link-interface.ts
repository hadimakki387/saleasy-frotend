import { MainInterface } from "@/services/types";
import { ICategories } from "./category-interface";

export enum sectionsTypes {
  deals_of_the_day = "deals_of_the_day",
  manually_selected = "manually_selected",
  category_related = "category_related",
}

export interface SectionInterface {
  title: string;
  categoryId: string;
  type: sectionsTypes;
  advertisementSection: {
    text1: string;
    text2: string;
    redText: string;
    link: {
      title: string;
      target: string;
    };
  }[];
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
    header: {
      links: {
        instagram: string;
        facebook: string;
        twitter: string;
      };
      logo: string;
      shippingFee: string;
    };

    Hero: {
      Carousel: {
        text1: string;
        text2: string;
        text3: string;
        text4: string;
        backgroundImage: string;
        link: {
          title: string;
          target: string;
        };
      }[];
      sideBoxes: {
        backgroundImage: string;
        text1: string;
        text2: string;
        text3: string;
        link: {
          title: string;
          target: string;
        };
      }[];
    };

    sections: SectionInterface[];

    footer: {
      descriptionText: string;
    };
  };
}
