import React, { useContext, useId, useRef, useState } from 'react'
import { AppContext } from '../../context/appContext'

export default function Signup(props) {
    const { setUser } = useContext(AppContext)

    const {setSignupVisible, setSigninVisible} = props

    const [errorLineVisible, setErrorLineVisible] = useState({
        name: 'hidden',
        password: 'hidden',
        confirmPassword: 'hidden',
    })

    const [value, setValue] = useState({
        name: '',
        password: '',
        confirmPassword: '',
    })

    const [isError, setIsError] = useState(true)
    const [userNames, setUserNames] = useState()
    const [isDataChange, setIsDataChange] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const inputNameRef = useRef()
    const inputPasswordRef = useRef()
    const inputConfirmPasswordRef = useRef()

    const formRef = useRef()

    // const inputAvataRef = useRef()
    // const fileUpload = useRef()

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    // function handleDubbing(value) {
    //     if(value.current.name === 'name') {
    //         const errorLine = getParent(value.current, '.form-group').children[2]
    //         userNames && userNames.map((userName) => {
    //             if(userName.displayName === value.current.value) {
    //                 setErrorLineVisible((prev) => ({
    //                     ...prev,
    //                     [value.current.name]: '',
    //                 }))
    //                 errorLine.innerHTML = 'this name has been use!'
    //                 setIsError(true)
    //             }
    //         })
    //     }
    // }

    function require(value, type, ref, min = 8) {
        const errorLine = getParent(ref.current, '.form-group').children[2]
        if(value.trim().length >= min) {
            setErrorLineVisible((prev) => ({
                ...prev,
                [type]: 'hidden',
            }))
            
            setIsError(false)

            // handleDubbing(inputNameRef)

            return true
        } else {
            setErrorLineVisible((prev) => ({
                ...prev,
                [type]: '',
            }))
            if(value.trim().length < min && value.trim().length > 0) {
                errorLine.innerHTML = `this field need more than ${min} word`
            } else if(value.trim().length === 0) {
                errorLine.innerHTML = `you need to fill this field or remove all the space`
            }

            console.log('abc')
        }
        // handleDubbing(inputNameRef)
    }

    function confirmPasswordRequire(value, ref) {
        const errorLine = getParent(ref.current, '.form-group').children[2]
        const errorNameLine = getParent(inputNameRef.current, '.form-group').children[2]
        if(value !== ref.current.value) {
            console.log(value !== ref.current.value)
            setErrorLineVisible((prev) => ({
                ...prev,
                confirmPassword: '',
            }))
            errorLine.innerHTML = 'passwords must be same'
        } else {
            setErrorLineVisible((prev) => ({
                ...prev,
                confirmPassword: 'hidden',
            }))

            if(errorNameLine.classList.contains('hidden')) {
                setIsError(false)
            }

            return true
        }
    }

    function handleSignup(e) {
        e.preventDefault() 

        const isNameErr = require(value.name, 'name', inputNameRef)
        const isPasswordErr = require(value.password, 'password', inputPasswordRef)
        const isConfirmPasswordErr = confirmPasswordRequire(value.password, inputConfirmPasswordRef)

        console.log(isNameErr)
        if(isNameErr && isPasswordErr && isConfirmPasswordErr) {
            
            console.log(performance.now())
            fetch('http://localhost:4000/login/signup', {
                method: "POST",
                headers: {
                  'Content-type': 'application/json'
                },
                body: JSON.stringify(value)
              })
              .then((response) => response.json())
              .then((result) => {
                setUser(result)
                console.log(result)
              })
            console.log(performance.now())

        }
    }

    const handleChangeInput = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })

        console.log(e.target.name)
        setErrorLineVisible({
            ...errorLineVisible,
            [e.target.name]: 'hidden'
        })
    }

  return (
    <form ref={formRef} method="GET" action="http://localhost:4000/login/signup" className="card-white animate-[moveSignupModalToLeft_.6s_ease-in-out] flex flex-col items-center w-[40%] h-[90%] my-auto ml-auto mr-20 text-white">
      <h1 className=" mb-8 mt-8">Đăng ký</h1>
      <div className="form-group">
          <h3 className=" text-xl">Name</h3>
          <div className="relative">
              <i class="fa-solid fa-circle-user absolute top-1/2 transform -translate-y-1/2 text-xl"></i>
              <input ref={inputNameRef} onChange={handleChangeInput} name="name" placeholder="Enter your account's name" className=" w-[330px] bg-transparent pl-8 pr-2 py-2 border-b border-white outline-none" type="text" />
          </div>
            <p className={` ${errorLineVisible.name} text-red-600`}></p>
      </div>
      <div className="mt-4 form-group">
          <h3 className=" text-xl">Password</h3>
          <div className="relative">
              <i class="fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 text-xl"></i>
              <input ref={inputPasswordRef} onChange={handleChangeInput} name="password" placeholder="Enter your account's password" className=" w-[330px] bg-transparent pl-8 pr-2 py-2 border-b border-white outline-none" type="text" />
          </div>
            <p className={` ${errorLineVisible.password} text-red-600`}></p>
      </div>
      <div className="mt-4 form-group">
          <h3 className=" text-xl">comfirm password</h3>
          <div className="relative">
              <i class="fa-solid fa-lock absolute top-1/2 transform -translate-y-1/2 text-xl"></i>
              <input ref={inputConfirmPasswordRef} onChange={handleChangeInput} name="confirmPassword" placeholder="Confirm password" className=" w-[330px] bg-transparent pl-8 pr-2 py-2 border-b border-white outline-none" type="text" />
          </div>
          <p className={` ${errorLineVisible.confirmPassword} text-red-600`}></p>
      </div>

      <div onClick={handleSignup} className=" px-8 py-1 rounded-md border border-[#fff] hover:bg-[#fff] hover:text-black text-xl font-medium cursor-pointer mt-8 mb-4 transition-all duration-75">Sign up</div>
      <p>Already have an account? <span onClick={() => {setSignupVisible(false); setSigninVisible(true)}} className=" font-medium underline hover:brightness-90 cursor-pointer" href="">Signin here</span></p>
    </form>
  )
}
