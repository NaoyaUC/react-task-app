
import { BrowserRouter, Routes } from "react-router-dom";
import { PrivateRoute } from "components/Route/PrivateRoute";
import { PublicRoute } from "components/Route/PublicRoute";
import { Footer } from "components/Layout/Footer";
import { Header } from "components/Layout/Header";

import { Home } from "components/pages/Home";
import { SignUp } from "components/Auth/SignUp";
import { AuthProvider } from "components/Auth/AuthContext";
import { Login } from "components/Auth/Login";
import { MemoList } from "components/pages/Memo/MemoList";
import { MemoCreate } from "components/pages/Memo/MemoCreate";

import { ThemeProvider,createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    light: "#757ce8",
    main: "#3f50b5",
    dark: "#002884",
    contrastText: "#fff",
  },
});

// import 
function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Header />

          <Routes>
            <PrivateRoute path="/" element={<Home />} />
            <PublicRoute path="/signup" element={<SignUp />} />
            <PublicRoute path="/login" element={<Login />} />
            <PrivateRoute path="/memo" element={<MemoList />} />
            <PrivateRoute path="/memo/create" element={<MemoCreate />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
