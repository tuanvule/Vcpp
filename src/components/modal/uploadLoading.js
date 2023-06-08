import React from 'react'
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';


export default function UploadLoading(props) {
    const { progress } = props

  return (
    <div className="z-[110] fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-black bg-opacity-40 text-white">
        <div className="w-28 h-28 text-center">
            <CircularProgressbar value={progress} text={`${progress}%`} styles={buildStyles({
                pathColor: '#8C52FF',
                textColor: '#8C52FF'
            })} />
            <div className="flex justify-center font-medium text-xl">
                <span className="block animate-bounce">u</span>
                <span style={{animationDelay: '.1s'}} className="block animate-bounce">p</span>
                <span style={{animationDelay: '.3s'}} className="block animate-bounce">l</span>
                <span style={{animationDelay: '.5s'}} className="block animate-bounce">o</span>
                <span style={{animationDelay: '.7s'}} className="block animate-bounce">a</span>
                <span style={{animationDelay: '.9s'}} className="block animate-bounce">d</span>
                <span style={{animationDelay: '.11s'}} className="block animate-bounce">i</span>
                <span style={{animationDelay: '.13s'}} className="block animate-bounce">n</span>
                <span style={{animationDelay: '.15s'}} className="block animate-bounce">g</span>
                <span style={{animationDelay: '.17s'}} className="block animate-bounce">.</span>
                <span style={{animationDelay: '.19s'}} className="block animate-bounce">.</span>
                <span style={{animationDelay: '.21s'}} className="block animate-bounce">.</span>
            </div>
        </div>
    </div>
  )
}
