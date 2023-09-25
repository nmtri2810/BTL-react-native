import React from "react";

import axios from "../../api/customAxios";

const Unauthorized = () => {
    const handleLogout = () => {
        axios.post("logout");
        window.location.reload();
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Unauthorized</h1>
            <p className="text-xl mb-4">
                You do not have access to the admin page
            </p>
            <button
                onClick={handleLogout}
                className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-4 py-2 text-center mr-2"
            >
                Go back
            </button>
        </div>
    );
};

export default Unauthorized;
