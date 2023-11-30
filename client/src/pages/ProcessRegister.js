import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { registerUser } from '../services/user.service';

function ProcessRegister() {
    let [searchParams] = useSearchParams();
    let [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
    let navigate = useNavigate();

    let username = searchParams.get('username');
    let password = searchParams.get('password');
    let repeatPassword = searchParams.get('repeat-password');

    useEffect(() => {
        (async () => {
            try {
                if (password !== repeatPassword) {
                    console.log('password is not same with repeat password.')
                    navigate('/register');
                }

                let newUser = await registerUser(username, password);
                console.log(newUser);
                setIsRegisterSuccess(true);
            } catch (error) {
                alert(error.response.data);
                navigate('/register');
            }
        })()  
    }, [navigate, password, repeatPassword, username]);

    return (
        <>
            { isRegisterSuccess ? (
                <>
                    <p>Register success</p>
                    <Link to='/login'>Login</Link>
                    <Link to='/'>Home</Link>
                </>
            ) : ( '' )
            }
        </>
    )
}

export default ProcessRegister;