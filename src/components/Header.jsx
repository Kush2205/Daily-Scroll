import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import service from '../appwrite/config';
import { Navigate } from 'react-router-dom';
export default function Header() {
  const [name, setName] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const status = useSelector(state => state.auth.status);
  const handleLogout = async () => {
    try {
      await authService.LogOut();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  };
  async function getCurrentUser() {
    try {
      const user = await authService.getCurrentUser();
      setName(user.name);
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: error", error);
    }
  }

const handlePress = () => {
 
  navigate("/addpost");
}
if(status){getCurrentUser();
   return (
  <header className=" p-4  bg-slate-300 flex justify-between items-center">
    <h1 className="text-xl font-bold">{`${name}'s Blogs`}</h1>
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
);}


 
}