import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home"
import Resources from "./resources";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/resources/:branch/:sem" element={<Resources/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
