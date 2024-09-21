import { ItemInterface } from "@/core/features/customer/landing/interfaces/items-interface";
import { createSlice } from "@reduxjs/toolkit";
import { CarouselProp } from "../components/hero-edit/dialogs/edit-carousel/HeroAdminEditCarousel";
import {
  advertisementSection,
  sideBoxInterface,
} from "@/core/features/customer/landing/interfaces/link-interface";

const initialState: {
  selectedHeroCarousel: (CarouselProp & { carouselItemIndex: number }) | null;
  createNewCarousel: boolean;
  editSideBox: (sideBoxInterface & { bgImage: string }) | null;
  advertismentSection: (advertisementSection & { sectionId: string }) | null;
  allAdvertisementSections: advertisementSection[];
  selectedDeleteAd: (advertisementSection & { sectionId: string }) | null;
  createNewAd: string | null;
  addItemsDialog: boolean;
  alreadySelectedItems: string[];
} = {
  selectedHeroCarousel: null,
  createNewCarousel: false,
  editSideBox: null,
  advertismentSection: null,
  allAdvertisementSections: [],
  selectedDeleteAd: null,
  createNewAd: null,
  addItemsDialog: false,
  alreadySelectedItems: [],
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
    setAdvertismentSection: (state, action) => {
      state.advertismentSection = action.payload;
    },
    setAllAdvertisementSections: (state, action) => {
      state.allAdvertisementSections = action.payload;
    },
    setSelectedDeleteAd: (state, action) => {
      state.selectedDeleteAd = action.payload;
    },
    setCreateNewAd: (state, action) => {
      state.createNewAd = action.payload;
    },
    setAddItemsDialog: (state, action) => {
      state.addItemsDialog = action.payload;
    },
    setAlreadySelectedItems: (state, action) => {
      state.alreadySelectedItems = action.payload;
    },
  },
});

export const {
  setSelectedHeroCarousel,
  setCreateNewCarousel,
  setEditSideBox,
  setAdvertismentSection,
  setAllAdvertisementSections,
  setSelectedDeleteAd,
  setCreateNewAd,
  setAddItemsDialog,
  setAlreadySelectedItems,
} = AdminLandingPageEdit.actions;

export default AdminLandingPageEdit.reducer;
