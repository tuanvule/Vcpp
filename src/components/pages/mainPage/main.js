import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../../../context/appContext'
import Navbar from '../../primary/navbar'
import Sidebar from '../../primary/sidebar'
import Following from '../../side_page/following'
import Creator from '../creator'
import HomePage from './home'
import HotPage from './hot'

export default function MainPage() {
    const {page} = useContext(AppContext)

  return (
    <div className=" h-screen dark:bg-[#161C2D]">
        <Navbar/>
        <div className="lg:pl-[8rem] pl-11 pt-16 h-full flex">
            <Sidebar />
            {page === 'home' && <HomePage/>}
            {page === 'following' && <Following/>}
            {page === 'hot' && <HotPage/>}
            {page === 'creator' && <Creator/>}
        </div>
    </div>
  )
}
