import { MantineProvider, ColorSchemeProvider, ColorScheme, Text } from "@mantine/core";
import { useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import {BrowserRouter,Routes, Route} from "react-router-dom";
import { AuthenticationImage } from "./Login";
import { AuthProvider } from "./context/AuthContext";
export default function App() {
   const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
     key: "mantine-color-scheme",
     defaultValue: "light",
     getInitialValueInEffect: true,
   });

   const toggleColorScheme = (value?: ColorScheme) =>
     setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<AuthenticationImage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
