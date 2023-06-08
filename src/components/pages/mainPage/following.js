import React from 'react'
import Navbar from '../../primary/navbar'
import SideBar from '../../primary/sidebar'
import Following from '../../side_page/following'

export default function FlowingPage() {
  return (
    <div className="">
        <div className=" h-screen dark:bg-[#161C2D]">
            <Navbar/>
            <div className="lg:pl-[8rem] pl-11 pt-16 h-full flex">
              <SideBar state="following"/>
              <Following/>
            </div>
        </div>
    </div>
  )
}