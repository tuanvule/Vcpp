import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/appContext'
import Creator from './creator'

function SideBar(props) {
  const { history, user, setPage, page } = useContext(AppContext)
  const [creators, setCreators] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/creator/getCreator?type=SC', {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => setCreators(data))
      .catch(err => console.log(err))
  }, [user])

  return (
    <div className="scrollbar w-80 h-full overflow-y-auto lg:min-w-[300px]">
      <ul className=" mt-4">
        <li onClick={() => setPage('home')} className={`px-3 py-3 rounded-lg ${page === 'home' ? 'text-[#8C52FF]' : null} hover:brightness-90 text-xl font-medium`}>
          <i class="mr-3 fa-solid fa-house"></i>
          Trang chủ
        </li>
        <li onClick={() => setPage('following')} className={`px-3 py-3 rounded-lg ${page === 'following' ? 'text-[#8C52FF]' : null} hover:brightness-90 text-xl font-medium`}>
          <i class="mr-3 fa-solid fa-face-kiss-wink-heart"></i>
          Đang follow
        </li>
        <li onClick={() => setPage('hot')} className={`px-3 py-3 rounded-lg ${page === 'hot' ? 'text-[#8C52FF]' : null} hover:brightness-90 text-xl font-medium`}>
          <i class="mr-3 fa-solid fa-fire-flame-curved"></i>
          Hot
        </li>
      </ul>
      <p className=" text-gray-500 font-semibold ml-3 mb-3"></p>
      {creators && creators.map(creator => <Creator {...creator} isHover={true}/>)}
    </div>
  )
}

export default memo(SideBar)
