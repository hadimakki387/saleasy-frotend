import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme, Theme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

// Extend Material UI theme with custom properties
declare module "@mui/material/styles" {
  interface Palette {
    myColor: {
      main: string;
    };
    bg: {
      main: string;
    };
    neutral: {
      main: string;
    };
    favColor: {
      main: string;
    };
  }

  interface PaletteOptions {
    myColor?: {
      main: string;
    };
    bg?: {
      main: string;
    };
    neutral?: {
      main: string;
    };
    favColor?: {
      main: string;
    };
  }
}

// Define the type for the color mode context
interface ColorModeContextType {
  mode: "light" | "dark";
  toggleColorMode: () => void;
}

// Function to get design tokens based on the mode
export const getDesignTokens = (mode: "light" | "dark") => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          myColor: {
            main: "#FFFFFF", // Pure white for light mode
          },
          bg: {
            main: "#FFFFFF", // Pure white for background
          },
          neutral: {
            main: "#000000", // Black for contrast (text)
          },
          favColor: {
            main: grey[200], // Light grey for favorite color
          },
        }
      : {
          myColor: {
            main: "#FFFFFF", // Still white for dark mode to keep text readable
          },
          bg: {
            main: "#121212", // Dark grey background for dark mode
          },
          neutral: {
            main: "#FFFFFF", // White for contrast (text)
          },
          favColor: {
            main: grey[900], // Dark grey for favorite color
          },
        }),
  },
});

// Create context for color mode
export const ColorModeContext = createContext<ColorModeContextType>({
  mode: "light", // Default value
  toggleColorMode: () => {},
});

// Custom hook to manage color mode and theme
export const useMode = (): [Theme, ColorModeContextType] => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  useEffect(() => {
    const localMode = localStorage.getItem("mode") as "light" | "dark";
    setMode(localMode || "light");
  }, []);

  const colorMode = useMemo<ColorModeContextType>(
    () => ({
      mode,
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return [theme, colorMode];
};
