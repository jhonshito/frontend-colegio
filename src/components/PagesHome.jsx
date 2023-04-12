
import React from 'react'
import "../css/home.css"
import { Outlet } from "react-router-dom";

const PagesHome = () => {
  return (
    <div className='home'>
        <Outlet />
    </div>
  )
}

export default PagesHome
