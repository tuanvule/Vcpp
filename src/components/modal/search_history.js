import React from 'react'
import Creator from '../primary/creator'

export default function SearchHistory(props) {
    console.log(props.searchData)
  return (
    <ul className="scrollbar bg-white absolute z-50 left-2 top-full transform translate-y-2 py-2 shadow-lg rounded-md w-[80%] max-h-96 min-w-[350px] overflow-auto">
        {/* <li className="px-4 py-2 font-medium hover:bg-gray-50 cursor-pointer">
            <i class="fa-solid fa-right-long mr-3"></i>
            hello word
        </li>
        <li className="px-4 py-2 font-medium hover:bg-gray-50 cursor-pointer">
            <i class="fa-solid fa-right-long mr-3"></i>
            hello
        </li>

        <li className="px-4 py-2 font-medium hover:bg-gray-50 cursor-pointer">
            <i class="fa-solid fa-right-long mr-3"></i>
             word
        </li>

        <li className="px-4 py-2 font-medium hover:bg-gray-50 cursor-pointer">
            <i class="fa-solid fa-right-long mr-3"></i>
            hellod
        </li>

        <li className="px-4 py-2 font-medium hover:bg-gray-50 cursor-pointer">
            <i class="fa-solid fa-right-long mr-3"></i>
            herd
        </li>
        <li className="px-4 py-2 font-medium hover:bg-gray-50 cursor-pointer">
            <i class="fa-solid fa-right-long mr-3"></i>
            helword
        </li>

        <li className="px-4 py-2 font-medium hover:bg-gray-50 cursor-pointer">
            <i class="fa-solid fa-right-long mr-3"></i>
            hell
        </li> */}

        <p className=" text-gray-500 font-semibold ml-3 mb-3">creators</p>

        {props.searchData && props.searchData.map((data) => <Creator isHover={true} {...data}/>)}

    </ul>
  )
}
