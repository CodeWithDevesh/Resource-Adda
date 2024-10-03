import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import Resources from "./pages/Resources";
import Fileexplorer from "./fileexplorer";
import Backdrop from "./components/Backdrop";
import Navbar from "./components/Navbar";
import "./App.css";
import Contacts from "./pages/Contacts";
import Grouops from "./groups";
import SuperAdmin from "./pages/SuperAdmin";
import Page404 from "./pages/Page404";
import AdminPannel from "./pages/AdminPannel";

function App() {
    return (
        <>
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
                    <Route path="/contact" element={<Contacts />} />
                    <Route path="/groups" element={<Grouops />} />
                    <Route path="/addAdmin" element={<SuperAdmin />} />
                    <Route path="/admin" element={<AdminPannel />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </BrowserRouter>
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
