import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/appContext'
import Creator from '../primary/creator'
import LoginRequest from '../primary/loginRequest'
import Comment from './comment'
import Title from './title'

export default function CommentsModal(props) {
  const [isShowEmojiList, setIsShowEmojiList] = useState(false)
  const [value, setValue] = useState()
  const [comments, setComment] = useState([])
  const [newComments, setNewComment] = useState({})
  const [respondent, setRespondent] = useState()
  // const [isErr, setIsRequestLogin] = useState(false)

  const { postId, setIsOpenComment, setIsRequestLogin } = props

  const { user: { name, avata, _id }, user, theme } = useContext(AppContext)

  // const { name, avata, _id } = user

  const CommentRef = useRef()
  const inputRef = useRef()

  function handleAddEmoji(emoji) {
    setValue(`${value} ${emoji}`)
  }

  function handleSendComment(commentId) {
    if(user && !respondent) {
      const data = {
        comment: value, 
        avata,
        name,
        Cid: _id,
        postId
      }
  
      fetch(`https://vccp-be.vercel.app/comment/create/${postId}`, {
        method: "POST",
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => setNewComment(data))
      .catch(err => console.log(err))
  
      inputRef.current.focus = false
      setValue('')
    } else if(user && respondent) {
      // const comment = value

      const data = {
        comment: value, 
        avata,
        respondentName: respondent.name,
        Cid: _id,
        name
      }
  
      fetch(`https://vccp-be.vercel.app/comment/createReply/${respondent.commentId}`, {
        method: "POST",
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => setNewComment(data))
      .catch(err => console.log(err))
  
      inputRef.current.focus = false
      setValue('')
      setRespondent(null)
    } else {
      setIsRequestLogin(true)
    }
  }

  function handleInputChange(e) {
    setValue(e.target.value)
  }

  // useEffect(() => {
  //   const timeOutId = setTimeout(() => handleSetState(), 9000);
  //   return () => clearTimeout(timeOutId)
  // }, [mouseenter])

  // useEffect(() => {
  //   CommentRef.current.onmouseenter = () => {
  //     setonmouseenter(prev => prev+=1)
  //   }
  // }, [])

  function SetNewSize(textarea) {
    textarea.style.height = "0px";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  useEffect(() => SetNewSize(inputRef.current), [value])

  useEffect(() => {
    fetch(`https://vccp-be.vercel.app/comment/${postId}`, {
      method: "GET",
    })
      .then(res => res.json())
      .then(data => setComment(data))
      
  }, [postId, newComments])

  // useEffect(() => {
  //   if(respondent) {
  //     inputRef.current.value += `@${respondent.name}`
  //   }
  // }, [respondent])

  
  return (
    <div tabindex="0" ref={CommentRef} className={`${theme == 'light' ? 'card' : 'dark_card'} absolute z-30 bg-white animate-[moveIn_0.5s_ease-in-out] w-4/5 right-14 bottom-8 rounded-lg select-none outline-none`}>
      <ul className={`${theme === 'dark' ? 'scrollbar_dark' : 'scrollbar'} h-[23rem] ml-0 px-2 pt-2 pb-20 rounded-lg overflow-y-auto`}>
        {comments && comments.map((data, index) => (
          <Comment newComments={newComments} inputele={inputRef} setRespondent={setRespondent} {...data}/>
          ))}
      </ul>

        <div className="flex items-center absolute bottom-4 right-1/2 transform translate-x-1/2 w-[88%] py-1 px-4 bg-[#F1F1F2] dark:bg-[#332e3a] dark:border-[#615c67] border rounded-lg">
          
          <div className="relative flex-1 mr-4">
            {/* <textarea placeholder={respondent ? `trả lời ${respondent.name}: ` : 'viết bình luận của bạn'} maxLength="150" ref={inputRef} value={value} onChange={(e) => handleInputChange(e)} type="text" className={`dark:text-white dark:bg-[#494450] ${respondent && respondent.isReply && 'placeholder:bg-[#F1F1F2] placeholder:text-[#a073fb] placeholder:w-fit placeholder:rounded placeholder:px-1'} resize-none w-full h-[38px] pl-2 pr-8 py-1 mt-2 text-lg outline-none border border-gray-300 focus:border-[#8C52FF] rounded-md overflow-y-hidden`}/> */}
            {/* <input ref={inputRef} value={value} onChange={(e) => handleInputChange(e)} type="text" className="w-full px-2 py-1 outline-none border border-gray-300 focus:border-[#8C52FF] rounded-md"/> */}
            <textarea placeholder={respondent ? `trả lời ${respondent.name}: ` : 'viết bình luận của bạn'} maxLength="150" ref={inputRef} value={value} onChange={(e) => handleInputChange(e)} type="text" className={` ${respondent && respondent.isReply && 'placeholder:bg-[#F1F1F2] dark:placeholder:bg-[#494450] placeholder:text-[#a073fb] placeholder:w-fit placeholder:rounded placeholder:px-1'} dark:text-white dark:bg-[#494450] resize-none w-full h-[38px] pl-2 pr-8 py-1 mt-2 text-lg outline-none border border-gray-300 focus:border-[#8C52FF] rounded-md overflow-y-hidden`}/>

            <i onClick={() => setIsShowEmojiList(!isShowEmojiList)} class="emoji hasTitle fa-regular fa-face-smile-beam absolute top-1/2 transform -translate-y-1/2 right-3 text-xl hover:text-[#8950FA] dark:hover:text-[#8950FA] dark:text-white cursor-pointer">
              {!isShowEmojiList && <Title title="emoji" />}
            </i>

            {isShowEmojiList &&
              <div className="emoji-list z-20 absolute flex -top-14 -right-16 transform px-2 py-1 text-2xl rounded-full border-2 border-[#8C52FF]">
                <div onClick={() => handleAddEmoji('🤣')} className=" cursor-pointer hover:brightness-90">🤣</div>
                <div onClick={() => handleAddEmoji('😢')} className=" cursor-pointer hover:brightness-90">😢</div>
                <div onClick={() => handleAddEmoji('😠')} className=" cursor-pointer hover:brightness-90">😠</div>
                <div onClick={() => handleAddEmoji('😭')} className=" cursor-pointer hover:brightness-90">😭</div>
                <div onClick={() => handleAddEmoji('🙂')} className=" cursor-pointer hover:brightness-90">🙂</div>
                <div onClick={() => handleAddEmoji('🤔')} className=" cursor-pointer hover:brightness-90">🤔</div>
                <div onClick={() => handleAddEmoji('😑')} className=" cursor-pointer hover:brightness-90">😑</div>
              </div>
            }
          </div>

          <div onClick={handleSendComment}><i class={`fa-solid fa-paper-plane text-2xl ${value ? 'text-[#8950FA] hover:brightness-90' : 'text-slate-400'}  cursor-pointer`}></i></div>
        </div>
    </div>
  )
}
