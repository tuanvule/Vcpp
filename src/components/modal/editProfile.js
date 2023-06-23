import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/appContext'
import EditAvata from './editAvata'

export default function EditProfile(props) {
    const { setProfile } = useContext(AppContext)

    const [profileValue, setProfileValue] = useState({
        avata: '',
        story: '',
        // job:'',
        // relationship: '',
        // education: '',
    })

    function handleEditProfile(_id) {
        // const { story, job, relationship, education } = profileValue
        const { story } = profileValue
        const value = {
            story,
            // introduce: {
            //     job, relationship, education
            // }
        }

        fetch(`https://vccp-be.vercel.app/creator/updateProfile/${_id}`, {
            method: "POST",
            body: JSON.stringify(value)
          })
          .then(response => response.json())
          .then(result => {
            setProfile(result)
            props.setIsEditProfile(false)
          })
    }

    function handleChangeProfileValue(e) {
        setProfileValue({
            ...profileValue,
            [e.target.name]: e.target.value
        })
    }

  return (
    <div className="z-[110] fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-white bg-opacity-50">
        <div onClick={(e) => e.stopPropagation()} className="scrollbar bg-white px-4 py-2 rounded-lg shadow-lg w-[50%] max-h-[80%] overflow-y-auto">
            <div className="flex items-center justify-between text-2xl font-bold border-b -mx-4 px-4 py-2">
                <span className="text-[#8C52FF]">Sửa hồ sơ</span>
                <i onClick={() => props.setIsEditProfile(false)} class="fa-solid fa-xmark hover:text-gray-400 cursor-pointer"></i>
            </div>
            <div className="relative flex justify-center mt-4 mb-6">
                {props.profile[0].avata.length <= 2 ? 
                    <div className="
                    w-28 h-28 rounded-full
                    bg-[#8C52FF] text-white
                    text-center text-5xl
                    leading-[7rem]
                    mx-4 cursor-pointer
                    "
                    >{props.profile[0].avata}</div>
                    : 
                    <div className="cursor-pointer w-10 h-10 bg-center bg-cover" style={{backgroundImage: `url(${props.profile[0].avata})`}}/>
                }
                <label htmlFor="avata" className=" absolute -bottom-3 right-[40%] text-xl text-center text-gray-500 leading-[2.5rem] rounded-ful w-10 h-10 rounded-full border border-gray-500 bg-white hover:brightness-95 cursor-pointer"><i class="fa-solid fa-image"></i></label>
                <input name="avata" onChange={e => handleChangeProfileValue(e)} type="file" id="avata" hidden />
            </div>
            <div className="my-3">
                <h2 className=" font-medium text-[#8C52FF]">Tiểu sử</h2>
                <textarea name="story" onChange={e => handleChangeProfileValue(e)} maxLength={255} className=" scrollbar outline-none mt-4 px-2 py-2 border w-full rounded-lg min-h-[150px] font-medium text-lg"></textarea>
            </div>
            {/* <div>
                <h2 className=" font-medium text-[#8C52FF]">Giới thiệu</h2>
                <ul className="list-none text-lg font-medium ml-0">
                    <li className="flex items-center my-2 ">- Nghề nghiệp: <input name="job" onChange={e => handleChangeProfileValue(e)}  className="flex-1 min-h-[40px] ml-6 px-2 py-1 outline-none border rounded-lg font-normal" type="text" /></li>
                    <li className="flex items-center my-2 ">- Tình trạng mối quan hệ: <input name="relationship" onChange={e => handleChangeProfileValue(e)}  className="flex-1 min-h-[40px] ml-6 px-2 py-1 outline-none border rounded-lg font-normal" type="text" /></li>
                    <li className="flex items-center ">- Học vấn: <input name="education" onChange={e => handleChangeProfileValue(e)}  className="flex-1 min-h-[40px] ml-6 px-2 py-1 outline-none border rounded-lg font-normal" type="text" /></li>
                </ul>
            </div> */}
            <div className="flex mt-4 mb-3">
                <div onClick={() => props.setIsEditProfile(false)} className=" w-fit text-center px-8 py-1 rounded-md border text-lg font-medium bg-slate-200 hover:brightness-95 cursor-pointer mt-3">Hủy</div>
                <div onClick={() => handleEditProfile(props.profile[0]._id)} className=" w-fit text-center px-8 py-1 ml-3 rounded-md bg-[#8C52FF] text-white text-lg font-medium hover:brightness-95 cursor-pointer mt-3 transition-all duration-75">Lưu</div>
            </div> 
        </div>
        <EditAvata {...props}/>
    </div>
  )
}
