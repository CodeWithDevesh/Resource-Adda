import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home"
import Resources from "./pages/Resources";
import Fileexplorer from "./fileexplorer";
import Backdrop from "./components/Backdrop";
import Navbar from "./components/Navbar";
function App() {
    return (
        <>
            <Backdrop/>
            <Navbar/>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/resources" element={<Resources/>}/>
                    <Route path="/resources/:branch/:sem" element={<Resources/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
