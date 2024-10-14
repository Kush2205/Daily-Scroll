import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
    
  return (
    <header className=" p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">My Blog</h1>
      <nav>
        <ul className="flex space-x-4">
          <li className='bg-blue-500 text-lg  hover:bg-blue-600 transition-all text-white rounded-full px-4 py-2'>
           <button> Add Post</button>
          
          </li>
          <li className='bg-blue-500 text-lg hover:bg-blue-600 transition-all text-white rounded-full px-4 py-2'>
            <button >Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}