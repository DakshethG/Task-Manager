import React from 'react';
import bgImage from '../assets/images/backg7.jpeg';

const AuthLayout = ({ children }) => {
    return (
        <div
            className="flex min-h-screen items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {children}
        </div>
    );
};

export default AuthLayout;