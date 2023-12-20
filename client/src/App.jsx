import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext } from "./context/ColorModeContext";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import useMode from "./hooks/useMode";
import Dashboard from "./features/dashboard/pages/Dashboard";
import Apartments from "./features/apartments/pages/Apartments";
import Residents from "./features/residents/pages/Residents";
import Payments from "./features/payments/pages/Payments";
import Calendar from "./features/calendar/pages/Calendar";
import SignIn from "./features/auth/pages/SignIn";
import AdminLayout from "./layouts/AdminLayout";
import GuestLayout from "./layouts/GuestLayout";
import SignUp from "./features/auth/pages/SignUp";
import SingleApartment from "./features/apartments/pages/SingleApartment";

const App = () => {
  const [theme, colorMode] = useMode();
  const user = useSelector((state) => state.auth.user);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          {user ? (
            <Route path="/" element={<AdminLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/apartments" element={<Apartments />} />
              <Route path="/apartments/:id" element={<SingleApartment />} />
              <Route path="/residents" element={<Residents />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/profile" element={<h1>Profile</h1>} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/bar" element={<h1>Bar</h1>} />
              <Route path="/pie" element={<h1>Pie</h1>} />
              <Route path="/line" element={<h1>Line</h1>} />
              <Route path="/faq" element={<h1>FAQ</h1>} />
            </Route>
          ) : (
            <Route path="/" element={<GuestLayout />}>
              <Route path="/" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
          )}
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
