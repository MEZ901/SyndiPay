import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext } from "./context/ColorModeContext";
import useMode from "./hooks/useMode";
import TopBar from "./components/TopBar";

const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <TopBar />
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
