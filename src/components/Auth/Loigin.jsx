import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submithandler = (e) => {
        e.preventDefault();
        // console.log("Email:", email);
        // console.log("Password:", password);
        handleLogin(email, password);
        setEmail('');
        setPassword('');
    };

    return (
        <div className='flex items-center justify-center h-screen w-screen'>
            <div className='border-2 p-20 border-emerald-600 rounded-xl'>
                <form onSubmit={submithandler} className="flex flex-col items-center justify-center">
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='outline-none bg-transparent border-2 border-emerald-600 font-medium py-2 px-6 text-lg rounded-full placeholder:text-gray-400'
                        type="email"
                        placeholder='Enter Your Email'
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='outline-none bg-transparent border-2 border-emerald-600 font-medium py-2 px-6 text-lg rounded-full placeholder:text-gray-400 mt-3'
                        type="password"
                        placeholder='Enter Your Password'
                    />
                    <button className='text-white outline-none font-semibold border-none hover:bg-emerald-700 bg-emerald-600 py-2 px-8 text-lg rounded-full w-full mt-7'>
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
