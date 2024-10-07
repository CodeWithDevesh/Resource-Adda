import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import Resources from "./pages/Resources";
import Fileexplorer from "./fileexplorer";
import Backdrop from "./components/Backdrop";
import Navbar from "./components/Navbar";
import "./App.css";
import Grouops from "./groups";
import SuperAdmin from "./pages/SuperAdmin";
import Page404 from "./pages/Page404";
import AdminPannel from "./pages/AdminPannel";
import About from "./pages/About";
import Contribute from "./pages/Contribute";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "rgba(0, 0, 0, .5)",
            light: "#42a5f5",
            dark: "#000000",
            contrastText: "#fff",
        },
    },
});

function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Backdrop />
                <BrowserRouter>
                    <Layout />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route
                            path="/resources/:branch/:sem"
                            element={<Fileexplorer />}
                        />
                        <Route path="/aboutus" element={<About />} />
                        <Route path="/groups" element={<Grouops />} />
                        <Route path="/addAdmin" element={<SuperAdmin />} />
                        <Route path="/admin" element={<AdminPannel />} />
                        <Route path="/contribute" element={<Contribute />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

function Layout() {
    const location = useLocation();

    return (
        <>
            <Backdrop />
            {location.pathname !== "/admin" && <Navbar />}
        </>
    );
}

export default App;
