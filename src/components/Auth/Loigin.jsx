import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import myImage from './login11.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const submithandler = (e) => {
        e.preventDefault();
        const loginResult = loginUser(email, password);
        if (loginResult === 'admin') {
            navigate('/admin-dashboard');
        } else if (loginResult === 'employee') {
            navigate('/employee-dashboard');
        } else {
            alert('Invalid credentials');
        }
        setEmail('');
        setPassword('');
    };

    return (
        <div className='flex items-center justify-center h-screen w-screen border-white-500 bg-[#86bfba]'>
          <div className='flex w-[60%] h-[60%] rounded-3xl overflow-hidden'>
            <div className='w-[50%] '>
              <img src={myImage} className='object-cover h-full w-full' alt='' />
            </div>
            <div className=' p-20  w-[50%] flex items-center justify-center bg-[#1c4f4a] h-full'>
            <form 
            onSubmit={(e)=>{
              submithandler(e);
            }}
            className="flex flex-col items-center justify-center">
              <h1 className='font-bold text-[35px] mb-10 font-arial'>Login </h1>
              <input 
              value={email}
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
              required 
              className='outline-none bg-transparent border-2 font-medium py-2 px-6 text-lg rounded-full placeholder:text-gray-400' type="email" placeholder='Enter Your Email' 
              />
              <input 
              value={password}
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
              required 
              className='outline-none bg-transparent border-2 font-medium py-2 px-6 text-lg rounded-full placeholder:text-gray-400 mt-3' type="password" placeholder='Enter Your Password' />
              <button className='text-white outline-none font-semibold border-none hover:bg-emerald-700 bg-emerald-600 py-2 px-8 text-lg rounded-full w-[270px] mt-7'>Log in</button>
            </form>
            </div>
          </div>
        </div>
      )
    }
    
    export default Login
    