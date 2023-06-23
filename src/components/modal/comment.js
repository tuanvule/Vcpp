import React, { useEffect } from 'react'
import { useState } from 'react'
import Creator from '../primary/creator'
import ReplyComment from './replyComment'

export default function Comment(props) {
  const [isOpenReplyCM, setIsOpenReplyCM] = useState(false)
  const [replyComment, setReplyComment] = useState()

  // console.log(props)
  const {commentId, newComments, name, _id, setRespondent, timeAgo} = props
  function handleAnswer() {
    setRespondent({
        isReply: true,
        name,
        commentId
    })
  }

  useEffect(() => {
    console.log(_id)
    fetch(`https://vccp-be.vercel.app/comment/getReply/${_id}`, {
        method: "GET",
    })
      .then(res => res.json())
      .then(data => setReplyComment(data))
      .catch(err => console.log(err))
      
}, [_id, newComments])
// (replyComment !== [] || typeof replyComment !== 'undefined')
  console.log(replyComment)
  
  return (
        <li className=" mb-2">
            
            <Creator {...props} isComment={true} isHasBG={true} isWarp={true}/>

            <div className=" text-sm flex ml-4 text-[#8C52FF]">
                <p className="cursor-pointer">like</p>
                <p onClick={handleAnswer} className="cursor-pointer mx-3">answer</p>
                <p className="text-gray-500">{timeAgo}</p>
            </div>

            {replyComment && replyComment.length > 0 && <p onClick={() => setIsOpenReplyCM(!isOpenReplyCM)} className="ml-4 font-semibold text-[#8C52FF] hover:text-[#5720c4] cursor-pointer"><i class="fa-solid fa-caret-down"></i> xem {replyComment.length} câu trả lời</p>}

            {isOpenReplyCM && <ReplyComment replyComment={replyComment} isOpenReplyCM={isOpenReplyCM} newComments={newComments} name={name} commentId={_id} setRespondent={setRespondent} />}
        </li>
  )
}


