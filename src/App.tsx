import { MantineProvider, ColorSchemeProvider, ColorScheme, Text } from "@mantine/core";
import { useContext, useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import {BrowserRouter,Routes, Route} from "react-router-dom";
import { AuthenticationImage } from "./Login";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import ProtectedRoute, { ProtectedRouteProps } from "./utils/PrivateRoute";
import { NavbarNested } from "./Dashboard";

export default function App() {
   const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
     key: "mantine-color-scheme",
     defaultValue: "light",
     getInitialValueInEffect: true,
   });
    //  const { user} = useContext(AuthContext);

     const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
       isAuthenticated: useContext(AuthContext)!== null,
       authenticationPath: "/login",
     };

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
              <Route
                path="/"
                element={
                  <ProtectedRoute
                    {...defaultProtectedRouteProps}
                    outlet={< NavbarNested />}
                  />
                }
              />

              <Route path="/login" element={<AuthenticationImage />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
