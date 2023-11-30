import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { deleteBasicAuthInCookie } from "../services/authService";

function Logout({ setCurrentUser }) {
    const navigate = useNavigate();

    useEffect(() => {
        deleteBasicAuthInCookie();
        setCurrentUser('');
        navigate('/');    
    }, []);

    return (<></>)
}

export default Logout;