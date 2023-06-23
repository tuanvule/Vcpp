import React from 'react'
import Creator from '../primary/creator'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/appContext'

export default function SearchHistory(props) {
    const { setIsOpenSearch } = props

    const { theme } = useContext(AppContext)
    
    function handleMouseLeave() {
        props.setIsOutOfSearch(true)
    }
    function handleMouseEnter() {
        props.setIsOutOfSearch(false)
    }
    // function handleSearchVideo(_id) {
        
    // }
  return (
    <div>
        {props.searchData && 
            <ul onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter} className={`${theme === 'dark' ? 'scrollbar_dark' : 'scrollbar'} bg-white dark:bg-[#332e3a]  absolute z-50 left-2 top-full transform translate-y-2 py-2 shadow-lg rounded-md w-[80%] max-h-96 min-w-[350px] overflow-auto`}>
                {/* {props.searchData.videoResult && props.searchData.videoResult.map(data =>         
                    <li onClick={() => handleSearchVideo(data._id)} className="px-4 py-2 font-medium hover:bg-gray-50 dark:hover:bg-[#1e1926] dark:text-white cursor-pointer">
                        <i class="fa-solid fa-right-long mr-3"></i>
                        {data.caption}
                    </li>)
                } */}
                <p className=" text-gray-500 font-semibold ml-3 mb-3">creators</p>

                {props.searchData.userResult && props.searchData.userResult.map((data) => <Creator isSearching={true} setIsOpenSearch={setIsOpenSearch} isHover={true} {...data}/>)}
            </ul>
        }
    </div>
  )
}
