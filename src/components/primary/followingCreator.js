import React, { useContext } from 'react'
import handleGetInfo from '../../util/getInfo'
import { AppContext } from '../../context/appContext'

export default function FollowingCreator(props) {
    const { name, avata, follower, like} = props
    const { setProfile, setPage } = useContext(AppContext)
    const { comment, isComment, Cid, respondentName, isReply, _id } = props
    
    function handleAccess() {
      handleGetInfo(_id, setProfile, setPage)
    }

  return (
    <li onClick={handleAccess} className="  px-2 flex flex-col items-center h-64 bg-black bg-opacity-[2%] dark:bg-[#332e3a] dark:border-[#8C52FF] border rounded-xl">
    {/* <div style={{backgroundImage: 'url(https://thuthuatnhanh.com/wp-content/uploads/2019/11/hinh-nen-dien-thoai-dep-585x390.jpg)'}} 
        className="bg-cover bg-center w-20 h-20 min-h-[5rem] rounded-full mt-8"
    /> */}
    {avata.length <= 2 ? 
                <div className="
                mt-6
                w-20 min-w-[5rem] h-20 rounded-full
                bg-[#8C52FF] text-white
                text-center text-5xl
                leading-[80px]
                cursor-pointer
                
                "
                >{avata}</div>
              : 
                <div className="mb-auto mt-2 cursor-pointer w-10 min-w-[2.5rem] h-10 bg-center bg-cover" style={{backgroundImage: `url(${avata})`}}/>
              
              }
    <p className="text-xl font-medium text-center whitespace-nowrap text-ellipsis overflow-hidden max-w-[150px]">{name || 'name'}</p>
    {/* <p className="text-center break-all">description</p> */}
    <div className="flex mt-2">
        {/* <div className="flex flex-col mx-2 items-center">
            <i class="fa-solid fa-heart text-red-600"></i>
            {like || 0}
        </div> */}
        <div className="flex flex-col mx-2 items-center ">
            <i class="fa-solid fa-camera text-[#8C52FF]"></i>
            {follower.length || 0}
        </div>
    </div>
    <div className=" px-8 py-1 rounded-md border border-[#8C52FF] hover:bg-[#8C52FF] hover:text-white text-lg font-medium hover:brightness-95 cursor-pointer mt-3 transition-all duration-75">{props.followed ? 'Truy cập' : 'Follow'}</div>
</li>
  )
}
