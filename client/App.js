import React from "react";

import Navigation from "./src/navigation/Navigation";
import { AuthProvider } from "./src/store/authProvider";
import { StatusBar } from "expo-status-bar";

const App = () => {
    return (
        <AuthProvider>
            <StatusBar backgroundColor="white" />
            <Navigation />
        </AuthProvider>
    );
};

export default App;
