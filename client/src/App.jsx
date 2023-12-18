import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext } from "./context/ColorModeContext";
import { Routes, Route } from "react-router-dom";
import useMode from "./hooks/useMode";
import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Apartments from "./features/apartments/pages/Apartments";
import Residents from "./features/residents/pages/Residents";

const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/apartments" element={<Apartments />} />
              <Route path="/residents" element={<Residents />} />
              <Route path="/payments" element={<h1>Payments</h1>} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
