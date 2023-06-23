import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../primary/navbar'
import DemoPost from '../side_page/demo_post'
import RichEditorExample from './myTextEditer/textEditor'
import {stateToHTML} from 'draft-js-export-html';
import { TextEditorContext } from '../../context/textEditorContext';
import Notification from '../primary/notification';
import { AppContext } from '../../context/appContext';
import uploadVideo from '../../util/upload';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import UploadLoading from './uploadLoading';


export default function UploadVDModal() {

  const { user, history } = useContext(AppContext)

  const [isHasFile, setIsHasFile] = useState(false)
  const [videoDemoUrl, setVideoDemoUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [caption, setCation] = useState('')
  const [isShowNotify, setIsShowNotify] = useState(false)
  const [file, setFile] = useState()
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const { editorState } = useContext(TextEditorContext)

  const inputFileRef = useRef()
  const percentage = 10


  async function handleInputChange(e) {
    const fileSize = e.target.files[0].size
    const fileSizeCondition = Math.round(fileSize * (9.537*(10**-7)))

    const demoUrl = window.URL.createObjectURL(e.target.files[0])

    const video = document.createElement('video')
    video.src = demoUrl

    video.onloadedmetadata = function () {
      if(demoUrl && (fileSizeCondition <= 90 || this.duration <= 120)) {
        setFile(e.target.files[0])
        setVideoDemoUrl(demoUrl)
        setIsHasFile(true)
      } else {  
        setIsShowNotify(true)
      }
    };

  }

  function upload() {
    const data = { caption, Cid: user._id, avata: user.avata, videoUrl, creatorName: user.name }

    fetch('https://vccp-be.vercel.app/createContent/', {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((result) => {
        // setUser(result)
      })
      .catch(err => console.log(err))
  }

  function handleUpload() {
    uploadVideo(file, setProgress, setVideoUrl)
    setIsLoading(true)
  }

  useEffect(() => {
    if(progress >= 100 && videoUrl) {
      upload()
      setIsLoading(false)
      setIsShowNotify(true)
    }
  }, [videoUrl])
    
  useEffect(() => {
    if(editorState && document.querySelector('.public-DraftEditor-content')) {
  
      let options = {
        inlineStyles: {
          BOLD: {element: 'b'},
          ITALIC: {
            attributes: {class: 'foo'},
          },
          CODE: {
            attributes: {class: 'monospace'},
          },
        },
      };
    
        const markup = stateToHTML(editorState, options)
        
        setCation(markup)
    }
  }, [editorState])


  return (
    <div className=" bg-gray-100 dark:bg-[#1e1926] dark:text-white flex justify-center">
        {isShowNotify && !videoUrl ? <Notification setIsShowNotify={setIsShowNotify} type="error"/> :  null}
        {progress >= 100 && videoUrl && isShowNotify ? <Notification setIsShowNotify={setIsShowNotify} type="success"/> :  null}
        <Navbar isOutSide={true}/>
        {isLoading && 
          <UploadLoading progress={progress}/>
        }
        <div className=" mt-28 bg-white dark:bg-[#332e3a] dark:border-2 dark:border-[#8C52FF] w-4/5 overflow-hidden rounded-lg">
            <div className="py-1 border-b text-center">
                <p className=" text-2xl font-bold text-[#8C52FF]">Upload content</p>
                <p className=" text-gray-400">Upload your content here</p>
            </div>
            <div className="flex px-4 py-2">

              <div className="  flex-1 py-2 pr-4">
                <div className=" w-full">
                  <p className=" text-2xl font-semibold my-3">Caption</p>
                  <RichEditorExample/>
                  <button className="px-4 py-1 mt-12 rounded text-xl font-semibold hover:text-white hover:bg-[#8C52FF] border border-[#8C52FF] transition-all duration-75 cursor-pointer" onClick={handleUpload}>Upload</button>
                </div>
              </div>

              {!isHasFile ? (
                <div className=" my-8 md:w-[300px] w-1 px-2 py-2 rounded-lg border-2 hover:border-[#8C52FF]">
                  <label htmlFor="file" className=" flex flex-col items-center ">
                    <i class="fa-solid fa-cloud-arrow-up text-3xl text-gray-500 my-6"></i>

                    <p className=" text-lg font-medium">Choose a file to upload content</p>
                    <p className=" my-2 font-medium">Rule!</p>
                    <ul className=" list-none text-base text-gray-500 text-center">
                      <li className=" my-2">MP4 or WebM</li>
                      <li className=" my-2">JPG or PNG</li>
                      <li className=" my-2">{`Time  < 120p or file size < 10mp`}</li>
                    </ul>

                    <div className=" px-4 py-1 mb-8 mt-4 rounded text-xl font-semibold hover:text-white hover:bg-[#8C52FF] border border-[#8C52FF] transition-all duration-75 cursor-pointer">
                      Choose file
                    </div>
                  </label>
                  <input ref={inputFileRef} className="file" onChange={e => handleInputChange(e)} id="file" type="file" hidden={true} />
                </div>
              ) : (
                <div className=" pt-5">
                  <p className="text-2xl font-semibold mb-2 text-[#8950FA] text-center">Demo</p>
                  <div className=" rounded-lg border border-[#8950FA]">
                    <DemoPost caption={caption} videoDemoUrl={videoDemoUrl}/>
                  </div>
                </div>
              )}

            </div>
        </div>
    </div>
  )
}
