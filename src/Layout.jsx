import React from 'react'
import Header from './components/Header'
import Login from "./components/Login.jsx"
import { Outlet } from 'react-router'

export default function Layout(props) {
    

    return (
        <>
            <Header />
          
            <Outlet />
        </>
    )
}
