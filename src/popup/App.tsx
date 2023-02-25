import { RouterProvider } from "react-router-dom";
import AppRouter from "./components/AppNavigator/AppNavigator";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo } from "react";

const App = () => {
  const prefersLightMode = useMediaQuery("(prefers-color-scheme: light)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersLightMode ? "light" : "dark",
        },
      }),
    [prefersLightMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={AppRouter} />
    </ThemeProvider>
  );
};

export default App;
