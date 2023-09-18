import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Users from "./components/pages/Users/Users";
import Roles from "./components/pages/Roles";
import Reservations from "./components/pages/Reservations";
import Deals from "./components/pages/Deals";
import News from "./components/pages/News";
import Notifications from "./components/pages/Notifications";
import Unauthorized from "./components/pages/Unauthorized";
import NotFound from "./components/pages/NotFound";

import PrivateRoutes from "./routes/PrivateRoutes";
import PersistLogin from "./routes/PersistLogin";
import NavBar from "./components/UI/NavBar";
import useAuth from "./hooks/useAuth";

function App() {
    const { auth } = useAuth();

    return (
        <Router>
            {auth?.role === "AD" ? <NavBar /> : null}
            <Routes>
                <Route path="/login" element={<Login />} />

                <Route element={<PersistLogin />}>
                    <Route element={<PrivateRoutes allowedRoles={"AD"} />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/roles" element={<Roles />} />
                        <Route
                            path="/reservations"
                            element={<Reservations />}
                        />
                        <Route path="/deals" element={<Deals />} />
                        <Route path="/news" element={<News />} />
                        <Route
                            path="/notifications"
                            element={<Notifications />}
                        />
                    </Route>

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
