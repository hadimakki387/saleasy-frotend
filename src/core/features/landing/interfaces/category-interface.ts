import { MainInterface } from "@/services/types";

export interface ICategories extends MainInterface {
  name: string;
  description: string;
  image: string;
}
