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
  const [menuOpen, setMenuOpen] = React.useState(false);
  const status = useSelector(state => state.auth.status);
  const handleLogout = async () => {
    try {
      await authService.LogOut();
      dispatch(logout());
      setMenuOpen(!menuOpen)
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
  setMenuOpen(!menuOpen)
}

const handleAllPosts = () => {
   navigate("/allposts")
   setMenuOpen(!menuOpen)
}

const handleMyPosts = () => {
  navigate("/dashboard")
  setMenuOpen(!menuOpen)
}

if(status){getCurrentUser();
  return (
    <header className="p-4 bg-slate-300 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">{`${name}'s Blogs`}</h1>
      <nav className="hidden md:flex space-x-4">
        <ul className="flex space-x-4">
          <li className='bg-blue-500 text-lg hover:bg-blue-600 transition-all text-white rounded-full px-4 py-2'>
            <button onClick={handleAllPosts}>All Posts</button>
          </li>
          <li className='bg-blue-500 text-lg hover:bg-blue-600 transition-all text-white rounded-full px-4 py-2'>
            <button onClick={handleMyPosts}>My Posts</button>
          </li>
          <li className='bg-blue-500 text-lg hover:bg-blue-600 transition-all text-white rounded-full px-4 py-2'>
            <button onClick={handlePress}>Add Post</button>
          </li>
          <li className='bg-blue-500 text-lg hover:bg-blue-600 transition-all text-white rounded-full px-4 py-2'>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <button
        className="md:hidden text-2xl text-gray-800"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        &#9776;
      </button>
      {menuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-slate-300 flex flex-col items-center md:hidden shadow-lg z-50">
          <ul className="flex flex-col space-y-4 p-4 w-full">
            <li className='bg-blue-500 text-lg hover:bg-blue-600 transition-all text-white rounded-full px-4 py-2 w-full text-center'>
              <button onClick={handleAllPosts}>All Posts</button>
            </li>
            <li className='bg-blue-500 text-lg hover:bg-blue-600 transition-all text-white rounded-full px-4 py-2 w-full text-center'>
              <button onClick={handleMyPosts}>My Posts</button>
            </li>
            <li className='bg-blue-500 text-lg hover:bg-blue-600 transition-all text-white rounded-full px-4 py-2 w-full text-center'>
              <button onClick={handlePress}>Add Post</button>
            </li>
            <li className='bg-blue-500 text-lg hover:bg-blue-600 transition-all text-white rounded-full px-4 py-2 w-full text-center'>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};}


 
