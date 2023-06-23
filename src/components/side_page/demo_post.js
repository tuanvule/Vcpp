import React, { useContext, useEffect, useRef, useState } from 'react'
import CommentsModal from '../modal/comments'
import PostsModal from '../modal/posts'
import '../../style/list.css'
import { AppContext } from '../../context/appContext'

export default function DemoPost(props) { 

    const { user: { name } } = useContext(AppContext)

    // var stringToHTML = function (str) {
    //     var parser = new DOMParser();
    //     var doc = parser.parseFromString(str, 'text/html');
    //     return doc.body;
    // };

  return (
    <li className=" h-full overflow-hidden flex scale-x-[0.9] scale-y-[0.9]">
        <div className="flex-1">
            <div className="flex justify-between items-center px-2 py-2">
                <div className="flex ">
                    <div className="w-12 h-12 mr-2 bg-center bg-cover rounded-full" style={{backgroundImage: 'url(https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg)'}}/>
                    <div>
                        <p className=" text-lg leading-none font-medium">{name}</p>
                        <p className="text-gray-400">gold</p>
                    </div>
                </div>
                <div className="px-5 py-1 border border-[#8950FA] rounded-md font-medium transition-all duration-75 hover:bg-[#8950FA] hover:text-white cursor-pointer">
                    follow
                </div>
            </div>
            <div  className={` max-w-[300px] px-2 pb-2 `}>
                
                <td className=" w-full break-all" dangerouslySetInnerHTML={{__html: props.caption}} />

            </div>
            <iframe className=" w-full h-96 " src={props.videoDemoUrl} title='video'/>
            <div className=" w-11/12 mx-auto h-[1px] bg-[#8C52FF] mt-4 mb-2"></div>
        </div>
        {/* <div className=" relative flex flex-col justify-around pl-2 w-12 mt-24 mb-6 bg-slate-100">
            <div className=" absolute top-0 border-t-[100px] border-t-white border-l-[100px] border-l-transparent"></div>
            <div className=" absolute bottom-0 border-t-[100px] border-t-white border-l-[100px] border-l-transparent rotate-90"></div>
            <i onClick={handleLike} class="fa-regular fa-thumbs-up z-10 text-3xl text-black hover:text-[#8C52FF] cursor-pointer"></i>
            <i onClick={() => setIsOpenComment(!isOpenComment)} class={`fa-solid fa-comment-dots z-10 text-3xl text-black hover:text-[#8C52FF] ${isOpenComment && 'text-[#8C52FF]'} cursor-pointer`}></i>
        </div> */}
    </li>
  )
}
