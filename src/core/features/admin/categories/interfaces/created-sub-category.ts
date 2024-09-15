import { ICategories } from "@/core/features/customer/landing/interfaces/category-interface";
import { IStore } from "./store-interface";
import { MainInterface } from "@/services/types";

export interface CreatedItemSubCategory extends MainInterface {
  name: string;
  category: ICategories;
  store: IStore;
}
