import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { AppContext } from '../../context/appContext'
import LoginRequest from '../primary/loginRequest'
import ZoomedComment from './zoomedComment'

export default function FullScreenVD(props) {
  const [isErr, setIsRequestLogin] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progressValue, setProgressValue] = useState(0)
  const [isOpenCloseBtn, setIsOpenCloseBtn] = useState(false)

  // const progress = useRef()
  const { postId, videoUrl, setIsOpenFullScreen, caption,  creatorName, creatorAvata, rank, Cid, Uid, like, videoCurrentTime} = props
  const ref = useRef(null)
  const progressLocationRef = useRef()

  function handleRewind(e) {
    const progressLocation = progressLocationRef.current.getBoundingClientRect()

    const progress = Math.floor((e.clientX - progressLocation.x) / progressLocation.width * 100)
    const currentTime = ref.current.duration * (progress/100)

    ref.current.currentTime = currentTime
  }

  useEffect(() => {
    ref.current.currentTime = videoCurrentTime
  }, [videoUrl])

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // khi tiến độ bài hát thay đổi
    ref.current.ontimeupdate = function() {
      const progessPercent = Math.floor((ref.current.currentTime / ref.current.duration * 100))
      setProgressValue(progessPercent)
    }

    ref.current.onended = function() {
      ref.current.pause();
      ref.current.currentTime = 0;
      ref.current.play();
    }

  }, [isPlaying])

  useEffect(() => {
    window.onmousemove = (e) => {
      if(e.clientY < 65 && (e.clientX / window.innerWidth * 100) < 69) {
        setIsOpenCloseBtn(true)
      } else {
        setIsOpenCloseBtn(false)
      }
    }
  }, [isOpenCloseBtn])

  return (
    <div className=" z-[200] fixed top-0 bottom-0 right-0 left-0 py-4 px-6 flex bg-black bg-opacity-30">
      <div className={`absolute z-20 left-0 top-0 w-full ${isOpenCloseBtn ? 'h-20': 'h-0'} overflow-hidden bg-gradient-to-b from-[#333] transition-all`}>
        <i onClick={() => setIsOpenFullScreen(false)} class="fa-solid fa-xmark mx-8 my-5 absolute text-white text-4xl cursor-pointer"></i>
      </div>

        {isErr && <LoginRequest setIsRequestLogin={setIsRequestLogin} title="bạn cần phải đăng nhập để thực hiện điều này"/>}
        <div className="bg-[#161C2D] flex-1 flex items-center rounded-2xl">
          <div className="follow-btn relative ">

            <video ref={ref} className="" src={videoUrl} title='video'/>

            <div className="follow-hover absolute opacity-0 bottom-0 flex items-end pb-3 px-3 z-20 bg-gradient-to-t from-slate-800 text-[#8C52FF] h-32 w-full transition-all">
              <div className="flex items-center h-fit w-full mx-2">
                <div onClick={() => setIsPlaying(!isPlaying)} className="hover:brightness-90 cursor-pointer text-xl mr-3">
                  {!isPlaying ? <i class="fa-solid fa-play"></i> : <i class="fa-sharp fa-solid fa-diamond"></i>}
                </div>
                <div ref={progressLocationRef} onClick={(e) => handleRewind(e)} className="w-full h-[.35rem] bg-slate-400 cursor-pointer">
                  <div style={{width: `${progressValue}%`}} className={`h-[.4rem] bg-[#8C52FF]`}/>
                </div>
              </div>  
              <i class="fa-solid fa-expand hover:brightness-90 cursor-pointer text-xl mx-2"></i>
            </div>
          {/* <FullScreenVD postId={props.postId}/> */}
          </div>
        </div>
        <ZoomedComment creatorAvata={creatorAvata} postId={postId} creatorName={creatorName} caption={caption} setIsRequestLogin={setIsRequestLogin} Cid={Cid} Uid={Uid} like={like}/>
    </div>
  )
}
