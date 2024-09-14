// src/providers/ThemeProvider.tsx
import React, { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext, useMode } from "../theme/theme"; // Adjust path as needed
import FilterSidebar from "@/core/features/customer/search-page/components/FilterSidebar";
import CartDrawer from "@/core/features/customer/search-page/components/CartDrawer";
import SearchDialog from "@/components/layout/SearchDialog";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />{" "}
        {/* Ensures consistent baseline styling across browsers */}
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProvider;
