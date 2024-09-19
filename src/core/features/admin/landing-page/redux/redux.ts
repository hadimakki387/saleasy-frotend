import { ItemInterface } from "@/core/features/customer/landing/interfaces/items-interface";
import { createSlice } from "@reduxjs/toolkit";
import { CarouselProp } from "../components/hero-edit/dialogs/edit-carousel/HeroAdminEditCarousel";
import { sideBoxInterface } from "@/core/features/customer/landing/interfaces/link-interface";

const initialState: {
  selectedHeroCarousel: (CarouselProp & { carouselItemIndex: number }) | null;
  createNewCarousel: boolean;
  editSideBox: (sideBoxInterface & { bgImage: string }) | null;
} = {
  selectedHeroCarousel: null,
  createNewCarousel: false,
  editSideBox: null,
};

const AdminLandingPageEdit = createSlice({
  name: "AdminLandingPageEdit",
  initialState,
  reducers: {
    setSelectedHeroCarousel: (state, action) => {
      state.selectedHeroCarousel = action.payload;
    },
    setCreateNewCarousel: (state, action) => {
      state.createNewCarousel = action.payload;
    },
    setEditSideBox: (state, action) => {
      state.editSideBox = action.payload;
    },
  },
});

export const { setSelectedHeroCarousel, setCreateNewCarousel, setEditSideBox } =
  AdminLandingPageEdit.actions;

export default AdminLandingPageEdit.reducer;
