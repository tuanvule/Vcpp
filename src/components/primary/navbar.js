import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { AppContext } from '../../context/appContext'
import SearchHistory from '../modal/search_history'
import LoginRequest from './loginRequest'

export default React.memo(function Navbar({isOutSide}) {
  const { history, user, setUser, setProfile, setPage } = useContext(AppContext)

  const [value, setValue] = useState('')
  const [isRequestLogin, setIsRequestLogin] = useState(false)
  const [searchData, setSearchData] = useState()
  const [isOpenSearch, setIsOpenSearch] = useState(false)

  let cancelToken = useRef()
  let intervalId

  async function handleSearchInput(e) {
    setValue(e.target.value)
  }

  useEffect(() => {
    if(value) {
      let delay = 500

      let timeoutId = setTimeout(async () => {
        const result = await axios.get(`http://localhost:4000/creator/getCreator?name=${value}`)
        setSearchData(result.data)
        setIsOpenSearch(true)
      }, delay);
  
      return () => clearTimeout(timeoutId)
    }
  }, [value])

  function resetInputValue() {
    setValue('')
  }

  function handleSearch() {
    // fetch('http://abc')

    
  }

  function handleUpload(path) {
    if(user) history(path)
    setIsRequestLogin(true)    
  }

  function viewProfile(id) {
    fetch(`http://localhost:4000/creator/getCreator/${id}`)
      .then(res => res.json())
      .then(data => {
        setProfile(data)
        history('/')
        setPage('creator')
      })
  }

  function handleBlur() {
    setIsOpenSearch(false)
  }

  function handleMoveToHome(isOutSide) {
    if(!isOutSide) {
      setPage('home')
      return
    }
    history('/')

  }

  return (
    <div className=" fixed top-0 left-0 right-0 z-40 lg:px-20 h-16 flex items-center justify-between border-b bg-white">
      <div onClick={() => handleMoveToHome(isOutSide)} className=" relative w-56 h-14 overflow-hidden">
        <img className=" absolute top-1/2 transform -translate-y-1/2" src="/Congrats!.png" alt="" />
      </div>
      <div className=" lg:block hidden relative flex-1 focus:border">
        <input value={value} onChange={handleSearchInput} onBlur={handleBlur} className=" bg-[#F1F1F2] outline-none w-full px-4 py-2 rounded-full focus:border border-gray-300" type="text" />
        <div className=" bg-[#F1F1F2] text-center absolute top-1/2 right-10 transform -translate-y-1/2 h-7 w-8 border-r border-gray-200 z-10">{value && <i onClick={resetInputValue} class="fa-solid fa-xmark mt-[7px]"></i>}</div>
        <i onClick={handleSearch} class="fa-solid fa-magnifying-glass text-center bg-[#F1F1F2] leading-[220%] absolute h-[90%] w-10 top-1/2 right-0 transform -translate-y-1/2 rounded-r-full cursor-pointer hover:bg-gray-200"></i>
        {isOpenSearch && <SearchHistory searchData={searchData}/>}
      </div>
      <div className="flex ml-20 mr-10">
        <div onClick={() => handleUpload('/upload')} className=" text-base font-medium px-5 py-[6px] border cursor-pointer bg-white hover:brightness-[.98]">
          <i class="fa-solid fa-upload mr-2"></i>
          upload
        </div>
        { user ? (
          <div className="relative user after-box bg-white">
            {user.avata?.length <= 2 ? 
            <div className="avata
              w-10 h-10 rounded-full
            bg-[#8C52FF] text-white
              text-center text-3xl
              leading-[2.5rem]
              mx-4 cursor-pointer
              "
            >{user.avata}</div>
            : 
            <div className="cursor-pointer w-10 h-10 bg-center bg-cover" style={{backgroundImage: `url(${user.avata})`}}/>
            }
            <ul className="setting hidden absolute right-4 top-12 list-none bg-white text-lg w-[17rem] my-2 rounded-lg shadow-lg overflow-hidden">
              <li onClick={() => viewProfile(user._id)} className="px-3 py-2 hover:brightness-95 bg-white cursor-pointer"><i class="fa-solid fa-user mr-3"></i>Xem hồ sơ</li>
              <li className="px-3 py-2 hover:brightness-95 bg-white cursor-pointer"><i class="fa-solid fa-lightbulb mr-3"></i>Theme</li>
              <li onClick={() => setUser(null)} className="px-3 py-2 border-t hover:brightness-95 bg-white cursor-pointer"><i class="fa-solid fa-arrow-right-from-bracket mr-3"></i>Logout</li>
            </ul>
          </div>
        )

        :

        (
          <div onClick={() => history('/signin')} className=" text-base font-medium text-white bg-[#8C52FF] px-5 py-[6px] mx-4 rounded cursor-pointer hover:brightness-[.98]">     
            Đăng nhập
          </div>
        )
      }
      </div>

      {isRequestLogin &&         
        <LoginRequest setIsRequestLogin={setIsRequestLogin} title="bạn cần phải đăng nhập để đăng nội dung"/>
      }

    </div>
  )
})
