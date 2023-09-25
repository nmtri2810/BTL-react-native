import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Users from "./components/pages/Users/Users";
import Reservations from "./components/pages/Reservations/Reservations";
import Deals from "./components/pages/Deals/Deals";
import Unauthorized from "./components/pages/Unauthorized";
import NotFound from "./components/pages/NotFound";

import PrivateRoutes from "./routes/PrivateRoutes";
import PersistLogin from "./routes/PersistLogin";
import NavBarLayout from "./routes/NavBarLayout";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<PersistLogin />}>
                    <Route element={<PrivateRoutes allowedRoles={"AD"} />}>
                        <Route element={<NavBarLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/users" element={<Users />} />
                            <Route
                                path="/reservations"
                                element={<Reservations />}
                            />
                            <Route path="/deals" element={<Deals />} />
                        </Route>
                    </Route>

                    {/* small bug with refresh token to delete user*/}
                    <Route element={<PrivateRoutes allowedRoles={"US"} />}>
                        <Route
                            path="/unauthorized"
                            element={<Unauthorized />}
                        />
                    </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
