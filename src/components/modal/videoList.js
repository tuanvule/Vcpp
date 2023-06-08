import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import React, { useState } from 'react'
import ZoomedComment from './zoomedComment'

export default function VideoList(props) {
    const { videos, index, setOpenVideoList,  } = props
    
    const [currentVideo, setCurrentVideo] = useState(index)
    const [isErr, setIsErr] = useState(false)

//   const {creatorAvata, postId, creatorName, rank, caption, setIsErr, Cid, Uid, like} = props
    
    const {Cid, avata, caption, creatorName,_id} = videos[currentVideo]

    console.log(videos[currentVideo])

    function nextVideo() {
        if(videos && currentVideo + 1 < videos.length) setCurrentVideo(currentVideo + 1)
        console.log(currentVideo)
    }

    function prevVideo() {
        if(videos && currentVideo - 1 >= 0) setCurrentVideo(currentVideo - 1)
        console.log(currentVideo)

    }

    function handleClick(e) {

        if(e.target.className.includes('father')) {
            e.target.style.color = e.target.style.color = '#8C52FF' ? '#fff' : '#8C52FF'
            e.target.style.background = '#fdfdfda3'
            console.log(e.target.style.color == '#8C52FF' ? '#fff' : '#8C52FF')
        } else {
            e.target.parentElement.style.color = '#8C52FF'
            e.target.parentElement.style.background = '#fdfdfda3'
        }
        console.log(e.target.style)
    }

  return (
    <div className="z-[200] fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-60  ">
        {/* comment -> video */}
        <input type="checkbox" id="comment" hidden/>
        <div onClick={() => setOpenVideoList({isOpen: false})} className="absolute w-10 h-10 rounded-full top-4 left-6 text-white text-3xl hover:bg-white hover:bg-opacity-20 cursor-pointer text-center">
            &#x2715;
        </div>
        <div className="flex absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-[50%] h-[90%] mini__video">
            <div onClick={prevVideo} className={`my-auto mx-auto bg-white bg-opacity-20 text-2xl px-[18px] py-2 rounded-full cursor-pointer hover:brightness-90 ${videos && currentVideo === 0 && 'invisible'}`}>
                <i class="fa-solid fa-angle-left text-[#F1F1F1]"></i>
            </div>

            <div className="mx-auto w-[70%] h-full bg-slate-800 rounded-3xl overflow-hidden video" >
                <video controls className="w-full h-full" src={videos && videos[currentVideo].videoUrl}></video>
            </div>

            <div className="relative mt-[40%] mx-auto">
                <div onClick={nextVideo} className={`bg-white bg-opacity-20 text-2xl px-[18px] py-2  rounded-full cursor-pointer hover:brightness-90 ${videos && currentVideo === videos.length - 1 && 'invisible'}`}>
                    <i class="fa-solid fa-angle-right text-[#F1F1F1]"></i>
                </div>
                <label onClick={(e) => handleClick(e)} htmlFor="comment" className="father block bg-white bg-opacity-20 text-2xl px-[12.5px] py-2 mt-10 rounded-full cursor-pointer hover:brightness-90">
                    <i class="fa-solid fa-comment text-[#F1F1F1]"></i>
                </label>
                <div className="father bg-white bg-opacity-20 text-3xl px-[10px] py-2 mt-10 rounded-full cursor-pointer hover:brightness-90">
                    <i class="fa-regular fa-thumbs-up text-[#F1F1F1]"></i>
                </div>
            </div>
        </div>

        <div className="absolute left-[100%] top-1/2 -translate-y-1/2 w-[130%] h-[90%] transition-all duration-300 comment__model">
            <ZoomedComment creatorAvata={avata} postId={_id} creatorName={creatorName} caption={caption} setIsErr={setIsErr}/>
        </div>       
    </div>
  )
}
