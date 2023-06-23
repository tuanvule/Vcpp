import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import FullScreenVD from './fullScreenVD';

export default function VideoControl(props) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progressValue, setProgressValue] = useState(0)
  const [isOpenFullScreen, setIsOpenFullScreen] = useState(false)
  const { creatorName, creatorAvata, rank, caption, postId, Cid, Uid, like } = props

  const ref = useRef()
  const progressLocationRef = useRef()

  function isElementOutViewport (el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top + rect.height <= 0 ||
        rect.bottom - rect.height >= window.innerHeight
    );
  }

  function handleRewind(e) {
    const progressLocation = progressLocationRef.current.getBoundingClientRect()

    const progress = Math.floor((e.clientX - progressLocation.x) / progressLocation.width * 100)
    const videoCurrentTime = ref.current.duration * (progress/100)

    ref.current.currentTime = videoCurrentTime
  }


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
      if(isElementOutViewport(ref.current)) {
        ref.current.pause()
        setIsPlaying(false)
      }
      setProgressValue(progessPercent)
    }

    ref.current.onended = function() {
      ref.current.pause();
      ref.current.currentTime = 0;
      ref.current.play();
    }

  }, [isPlaying])

  useEffect(() => {
    if(isOpenFullScreen) ref.current.pause()
  }, [isOpenFullScreen])

  const { videoUrl } = props

  return (
      <div className={`follow-btn relative`}>

        <video ref={ref} className={` video w-full h-96 `} src={videoUrl} title='video'/>
        {/* <Video isPlaying={isPlaying} videoUrl={videoUrl}/> */}
        <div className="follow-hover absolute opacity-0 bottom-0 flex items-end pb-3 px-3 z-20 bg-gradient-to-t from-slate-800 text-[#8C52FF] h-32 w-full transition-all">
          <div className="flex items-center h-fit w-full mx-2">
            <div onClick={() => setIsPlaying(!isPlaying)} className="hover:brightness-90 cursor-pointer text-xl mr-3">
              {!isPlaying ? <i class="fa-solid fa-play"></i> : <i class="fa-sharp fa-solid fa-diamond"></i>}
            </div>
            <div ref={progressLocationRef} onClick={(e) => handleRewind(e)} className="w-full h-[.35rem] bg-slate-400 cursor-pointer">
              <div style={{width: `${progressValue}%`}} className={`h-[.4rem] bg-[#8C52FF]`}/>
            </div>
          </div>
          <i onClick={() => setIsOpenFullScreen(true)} class="fa-solid fa-expand hover:brightness-90 cursor-pointer text-xl mx-2"></i>
        </div>
        {isOpenFullScreen && <FullScreenVD videoCurrentTime ={ ref.current.currentTime } {...props} setIsOpenFullScreen={setIsOpenFullScreen} videoUrl={videoUrl}/>}
      </div>
  )
}
