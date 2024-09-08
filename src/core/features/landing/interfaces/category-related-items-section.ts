import { MainInterface } from "@/services/types";
import { ItemInterface } from "./items-interface";
import { ISubCategory } from "./sub-categories-interface";

export interface ICategoryRelatedItemsSection extends MainInterface {
  name: string;
  description: string;
  image: string;
  items: ItemInterface[];
  subCategories: ISubCategory[];
}
