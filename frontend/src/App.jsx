import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home"
import Resources from "./resources";
import Fileexplorer from "./fileexplorer";
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Fileexplorer/>} />
                    <Route path="/resources/:branch/:sem" element={<Resources/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
