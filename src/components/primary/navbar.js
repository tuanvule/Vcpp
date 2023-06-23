import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { AppContext } from '../../context/appContext'
import SearchHistory from '../modal/search_history'
import LoginRequest from './loginRequest'

export default React.memo(function Navbar({isOutSide}) {
  const { history, user, setUser, setProfile, setPage, setTheme, theme, setSearchInfo } = useContext(AppContext)

  const [value, setValue] = useState('')
  const [isRequestLogin, setIsRequestLogin] = useState(false)
  const [searchData, setSearchData] = useState()
  const [isOpenSearch, setIsOpenSearch] = useState(false)
  const [isOutOfSearch, setIsOutOfSearch] = useState(true)


  // let cancelToken = useRef()
  // let intervalId

  function handleSearchInput(e) {
    setValue(e.target.value)
  }

  useEffect(() => {
    if(value) {
      let delay = 500

      let timeoutId = setTimeout(async () => {
        const userResult = await axios.get(`https://vccp-be.vercel.app/creator/getCreator?name=${value}`)

        const result = {userResult: userResult.data}

        setSearchData(result)
        setIsOpenSearch(true)
      }, delay);
  
      return () => clearTimeout(timeoutId)
    }
  }, [value])

  function resetInputValue() {
    setValue('')
  }

  function handleSearch() {
    // setSearchInfo()
    setIsOutOfSearch(false)
    setPage({route: 'following', info: searchData.userResult})
    console.log(searchData)
  }

  function handleEnter(e) {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  function handleUpload(path) {
    if(user) history(path)
    setIsRequestLogin(true)    
  }

  function viewProfile(id) {
    fetch(`https://vccp-be.vercel.app/creator/getCreator/${id}`, {
      method: "POST",
      body: JSON.stringify({ Uid: user._id})
  })
      .then(res => res.json())
      .then(data => {
        setProfile(data)
        history('/')
        setPage({route: 'creator'})
      })
  }

  function handleBlur(e) {
    // setIsOpenSearch(false)
    isOutOfSearch && setIsOpenSearch(false)
    isOutOfSearch && e.target.blur()
  }

  function handleMoveToHome(isOutSide) {
    if(!isOutSide) {
      setPage({route: 'home'})
      return
    }
    history('/')
  }

  return (
    <div className="dark:bg-[#332e3a] fixed top-0 left-0 right-0 z-40 lg:px-20 h-16 flex items-center justify-between border-b bg-white dark:border-[#8c52ff]">
      <div onClick={() => handleMoveToHome(isOutSide)} className=" relative w-56 h-14 overflow-hidden">
        {theme === 'dark' ? (
        <img className=" absolute top-1/2 transform -translate-y-1/2" src="/Congrats!_darkmode.png" alt="" />)
        :
        (<img className=" absolute top-1/2 transform -translate-y-1/2" src="/Congrats!.png" alt="" />)
        }
      </div>
      <div className=" lg:block hidden relative flex-1 focus:border">
        <input value={value} onKeyUp={handleEnter} onChange={handleSearchInput} onBlur={handleBlur} className=" bg-[#F1F1F2] dark:bg-[#1e1926] dark:text-white outline-none w-full px-4 py-2 rounded-full focus:border dark:focus:border-[#9c66ff] border-gray-300" type="text" />
        <div className=" bg-[#F1F1F2] dark:bg-[#1e1926] dark:border-[#332e3a] dark:text-white text-center absolute top-1/2 right-10 transform -translate-y-1/2 h-7 w-8 border-r border-gray-200 z-10">{value && <i onClick={resetInputValue} class="fa-solid fa-xmark mt-[7px]"></i>}</div>
        <i onClick={handleSearch} class="fa-solid fa-magnifying-glass text-center bg-[#F1F1F2] dark:text-white dark:bg-[#1e1926] leading-[240%] absolute h-[90%] w-10 top-1/2 right-0 transform -translate-y-1/2 rounded-r-full cursor-pointer hover:brightness-75"></i>
        {isOpenSearch && <SearchHistory setIsOpenSearch={setIsOpenSearch} searchData={searchData} setIsOutOfSearch={setIsOutOfSearch}/>}
      </div>
      <div className="flex ml-20 mr-10">
        {theme === 'dark' ? (
          <div onClick={() => setTheme('light')} className="h-8 w-8 mr-4 mt-1 hover:brightness-75 cursor-pointer bg-[#8c52ff] rounded-full flex items-center justify-center"><i class="fa-solid fa-circle fa-lg text-white"></i></div>
        )
        :
        (
          <div onClick={() => setTheme('dark')} className="h-8 w-8 mr-4 mt-1 hover:brightness-75 cursor-pointer bg-[#1e1926] rounded-full flex items-center justify-center"><i class="fa-solid fa-moon fa-xl text-[#d2b2ff]"></i></div> 
        )
        }
        <div onClick={() => handleUpload('/upload')} className=" text-base font-medium px-5 py-[7px] cursor-pointer bg-white dark:bg-[#332e3a] border dark:border-[#8c52ff] dark:text-white hover:brightness-[.96] dark:hover:bg-[#8c52ff] transition">
          <i class="fa-solid fa-upload mr-2"></i>
          upload
        </div>
        { user ? (
          <div className="relative user after-box bg-white dark:bg-[#332E3A]">
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
            <ul className="setting hidden absolute right-4 top-12 list-none bg-white dark:bg-[#332e3a] text-lg w-[17rem] my-2 rounded-lg shadow-lg dark:shadow dark:shadow-[#8C52FF] overflow-hidden">
              <li onClick={() => viewProfile(user._id)} className="px-3 py-2 hover:brightness-95 bg-white dark:bg-[#332e3a] dark:text-white cursor-pointer"><i class="fa-solid fa-user mr-3"></i>Xem hồ sơ</li>
              {/* <li onClick={() => setTheme(`${theme === 'dark'? 'light' : 'dark'}`)} className="px-3 py-2 hover:brightness-95 bg-white dark:bg-[#332e3a] dark:text-white cursor-pointer"><i class="fa-solid fa-lightbulb mr-3"></i>Theme</li> */}
              <li onClick={() => setUser(null)} className="px-3 py-2 border-t dark:border-[#8C52FF] hover:brightness-95 bg-white dark:bg-[#332e3a] dark:text-white cursor-pointer"><i class="fa-solid fa-arrow-right-from-bracket mr-3"></i>Logout</li>
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
