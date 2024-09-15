import { ICategories } from "@/core/features/customer/landing/interfaces/category-interface";
import { ISubCategory } from "@/core/features/customer/landing/interfaces/sub-categories-interface";

export interface CategoryWithSubCategoriesInterface extends ICategories {
  subCategories: ISubCategory[];
}
