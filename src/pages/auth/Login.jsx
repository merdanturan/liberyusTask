import React, { useState } from 'react';
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import Button from '../../components/basic/Button';
import Input from '../../components/basic/Input';
import DefaultLayout from '../../layout/DefaultLayout';
import { setUser } from "../../app/store/auth";


const Login = () => {
    ///States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    ///Submit function for login
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            dispatch(setUser(user))
            navigate('/');
        } catch (error) {
            setError(error.message)
        }
    };

    return (
        <DefaultLayout login header>
            <div className='FormHeader'>
                Welcome
            </div>
            <form onSubmit={handleSubmit}>
                {error && <div className='Alert'>{error}</div>}
                <Input onChange={v => setEmail(v)} value={email} placeholder={'Username'} required />
                <Input onChange={v => setPassword(v)} value={password} placeholder={'Password'} type={"password"} required />
                <div>
                    <Button full submit>Login</Button>
                </div>
            </form>
        </DefaultLayout>
    );
};

export default Login;
