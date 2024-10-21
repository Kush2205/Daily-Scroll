import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import service from '../appwrite/config';
import { Navigate } from 'react-router-dom';
export default function Header() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    await authService.LogOut();
    dispatch(logout({status:false , userData:null}));
    navigate("/login");
   
  };

const handlePress = () => {
 
  navigate("/addpost");
}
  return (
    <header className=" p-4 text-white bg-slate-300 flex justify-between items-center">
      <h1 className="text-xl font-bold">My Blog</h1>
      <nav>
        <ul className="flex space-x-4">
          <li className='bg-blue-500 text-lg  hover:bg-blue-600 transition-all text-white rounded-full px-4 py-2'>
           <button onClick={handlePress}> Add Post</button>
          
          </li>
          <li className='bg-blue-500 text-lg hover:bg-blue-600 transition-all text-white rounded-full px-4 py-2'>
            <button onClick={handleLogout} >Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}