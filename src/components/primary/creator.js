import React, { useContext } from 'react'
import { AppContext } from '../../context/appContext'
import handleGetInfo from '../../util/getInfo'
import Title from '../modal/title'

export default function Creator(props) {
  const { setProfile, setPage } = useContext(AppContext)
  const { avata, name, comment, isComment, Cid, respondentName, isReply, _id } = props

  // function handleGetInfo() {
  //   fetch(`http://localhost:4000/creator/getCreator/${Cid || _id}`, {
  //     method: "GET",
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => setProfile(data))
  //     .then(() => history('/creator'))

  return (
    <li onClick={() => handleGetInfo(Cid || _id, setProfile, setPage)} className={`flex px-3 py-2 items-center ${props.isHover ? 'hover:bg-gray-100 rounded-md' : null} cursor-pointer ${!isComment && 'mb-2'}`}>

        {/* {!isComment && <div style={{backgroundImage: 'url(https://wall.vn/wp-content/uploads/2020/03/hinh-nen-dep-may-tinh-1.jpg)'}} className=" bg-cover bg-center mb-auto mt-2 rounded-full w-10 min-w-[2.5rem] h-10" />} */}

        {(isComment || Cid || _id) &&
              avata.length <= 1 ? 
                <div className="
                w-10 min-w-[2.5rem] h-10 rounded-full
                bg-[#8C52FF] text-white
                text-center text-2xl
                leading-[40px]
                cursor-pointer
                "
                >{avata}</div>
              : 
                <div className="mb-auto mt-2 cursor-pointer w-10 min-w-[2.5rem] h-10 bg-center bg-cover" style={{backgroundImage: `url(${avata})`}}/>
              
              }
        <div className={` ${props.isHasBG ? 'bg-[#F2F3F5] px-4 py-2 rounded-xl' : null} min-w-[40%] ml-2 overflow-hidden`}>
              <div className="flex text-lg leading-none font-semibold">
                <p onClick={() => handleGetInfo(Cid || _id, setProfile, setPage)} className=" whitespace-nowrap text-ellipsis overflow-hidden hover:text-[#8950FA]">
                  {name || 'user'}
                </p>
                {isReply && (<div className="whitespace-nowrap text-ellipsis overflow-hidden">
                  <i class="mx-2 fa fa-share text-gray-400 text-base leading-4"></i>
                  {respondentName || 'not found'}
                </div>)}
              </div>
            <p className={`text-gray-500 ${props.isWarp ? 'break-all' : 'whitespace-nowrap text-ellipsis overflow-hidden'}`}>{props.description || comment || `@${name}` }</p>
        </div>
    </li>
  )
}
