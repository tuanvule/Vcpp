import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AppContext } from '../../context/appContext'

export default function Signin(props) {
    const {setSignupVisible, setSigninVisible} = props

    const { setUser } = useContext(AppContext)

    // const {setUser, user, history, setLoginType} = useContext(AuthContext)
    // const { setSigninVisivle, signinVisivle, setLoginVisible, isLoginVisible } = useContext(AppContext)

    const [userDatas, setUserDatas] = useState()
    const [errorVisible, setErrorVisible] = useState('hidden')

    const inputNameRef = useRef()
    const inputPasswordRef = useRef()
    const errorRef = useRef()

    function handleCheckUser(userData) {

        let password = inputPasswordRef.current.value.toLowerCase()
        let name = inputNameRef.current.value.toLowerCase()

        if(userData.name === name && userData.password === password) {
            const { name, _id, avata, followed } = userData
            setUser({
                name, _id, avata, followed
            })


            setErrorVisible('hidden')

        } else {
            setErrorVisible('')
        }
    }

    function handleLogin() {

        let password = inputPasswordRef.current.value.toLowerCase()
        let name = inputNameRef.current.value.toLowerCase()

        fetch(`https://vccp-be.vercel.app/login/signin?name=${name}&password=${password}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(data => handleCheckUser(data))
            .catch(err => setErrorVisible('')) 
    }

    function inputChange() {
        if(!errorRef.current.classList.contains('hidden')) {
            setErrorVisible('hidden')
        }
    }

  return (
    <div className="card-purple animate-[moveSigninModalToLeft_.6s_ease-in-out] flex flex-col items-center w-[40%] h-[90%] my-auto mr-auto ml-20 bg-white text-white">
        <h1 className=" mb-8 mt-20">Đăng nhập</h1>
        <div className="">
            <h3>Name</h3>
            <div className="relative">
                <i class="fa-solid fa-circle-user absolute top-1/2 transform -translate-y-1/2 text-xl"></i>
                <input onChange={inputChange} ref={inputNameRef} placeholder="Enter your account's password" className=" w-[330px] bg-transparent pl-8 pr-2 py-2 border-b border-white outline-none" type="text" />
            </div>
        </div>
        <div className="mt-8">
            <h3>Password</h3>
            <div className="relative">
                <i class="fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 text-xl"></i>
                <input onChange={inputChange} ref={inputPasswordRef} placeholder="Enter your account's name" className=" w-[330px] bg-transparent pl-8 pr-2 py-2 border-b border-white outline-none" type="text" />
            </div>
        </div>

        <h1 ref={errorRef} className={` ${errorVisible} mt-6 text-lg text-center text-red-600`}>wrong name or password</h1>

        <div onClick={handleLogin} className=" px-8 py-1 rounded-md border border-[#fff] hover:bg-[#fff] hover:text-black text-xl font-medium cursor-pointer mt-8 mb-4 transition-all duration-75">Sign in</div>
        <p>Don't have an account? <span onClick={() => {setSignupVisible(true); setSigninVisible(false)}} className=" font-medium underline hover:brightness-90 cursor-pointer" href="">Signup here</span></p>
    </div>
  )
}
