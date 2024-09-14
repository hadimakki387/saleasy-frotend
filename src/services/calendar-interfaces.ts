import { EventColor } from "@/services/constants";
import { ActionCreatorWithPayload, Dispatch } from "@reduxjs/toolkit";
import { ImageType } from "digital-dojo-sidebar/dist/components/global/Image/types";


export type ModifiedEventType = {
    image: string | undefined;
    id: string;
    url: string;
    title: string;
    allDays: boolean;
    end: Date;
    start: Date;
    extendedProps: {
      color: EventColor;
      images: ImageType[];
    };
  };
  


  
export type EventType = {
    image: string | undefined;
    id: string;
    url: string;
    title: string;
    date:{
    allDays: boolean;
    endDate: Date;
    startDate: Date;
    }
    extendedProps: {
      color: EventColor;
      images: ImageType[];
    };
  };
  
export type CalendarStoreType = {
    selectedEvent: null | EventType;
    leftSidebarOpen: boolean;
  };
export type SidebarLeftType = {
    dispatch: Dispatch<any>;
    events: ModifiedEventType[];
    leftSidebarWidth:
      | number
      | string
      | {
          xs?: number | string;
          sm?: number | string;
          md?: number | string;
          lg?: number | string;
          xl?: number | string;
        };
    store: CalendarStoreType;
    handleLeftSidebarToggle: ActionCreatorWithPayload<void>;
    handleAddEventSidebarToggle: () => void;
    handleSelectEvent: (event: ModifiedEventType) => void;
    height: number | undefined;
  };

  export type CalendarType = {
    calendarApi: any;
    dispatch: Dispatch<any>;
    store: CalendarStoreType;
    direction: "ltr" | "rtl";
    setCalendarApi: (val: any) => void;
    handleLeftSidebarToggle: ActionCreatorWithPayload<void>;
    updateEvent: (event: ModifiedEventType) => void;
    handleAddEventSidebarToggle: () => void;
    handleSelectEvent: (event: ModifiedEventType) => void;
    hasSidebar: boolean;
    events: ModifiedEventType[];
  };