import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoutes allowedRoles={"AD"} />}>
                    <Route path="/admin" element={<Admin />} />
                </Route>
                <Route element={<PrivateRoutes allowedRoles={"US"} />}>
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
