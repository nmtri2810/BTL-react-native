import React from "react";

const Button = ({ textColor, bgColor, icon, title, otherClass, onclick }) => {
    return (
        <button
            onClick={onclick}
            className={`text-${textColor} bg-${bgColor}-600 hover:bg-${bgColor}-700 focus:ring-4 focus:outline-none focus:ring-${bgColor}-300 font-medium rounded-lg text-base px-4 py-2 text-center ${otherClass}`}
        >
            {icon ? icon : null}
            {title}
        </button>
    );
};

export default Button;
