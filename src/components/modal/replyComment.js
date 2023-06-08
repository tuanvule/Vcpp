import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/appContext'
import Creator from '../primary/creator'
import Comment from './comment'
import Title from './title'

export default function ReplyComment(props) {
    

    // const { newComments } = props

    // const creator = {
    //     avata: 'T', name: 'ádafsafa', comment: 'ádasdasdasd', timeAgo: '10 days', Cid: 123123123
    // }

    const { name } = props
    // console.log(replyComment)

  return (
    <ul className="list-none ml-8 my-2 rounded-lg border-l-2 border-[#8C52FF]">
        {props.replyComment && props.replyComment.map((data, index) => 
            <li key={index} className=" mb-2">
                
                <Creator isReply={true} respondentName={name} {...data} isComment={true} isHasBG={true} isWarp={true}/>

                <div className=" text-sm flex ml-4 text-[#8C52FF]">
                    <p className="cursor-pointer">like</p>
                    <p className="ml-3 text-gray-500">{data.timeAgo}</p>
                </div>
            </li>
        )}

        {/* <li className=" mb-2">
            
            <Creator {...creator} isComment={true} isHasBG={true} isWarp={true}/>

            <div className=" text-sm flex ml-4 text-[#8C52FF]">
                <p className="cursor-pointer">like</p>
                <p className="ml-3 text-gray-500">{creator.timeAgo}</p>
            </div>
        </li>
        <li className=" mb-2">
            
            <Creator {...creator} isComment={true} isHasBG={true} isWarp={true}/>

            <div className=" text-sm flex ml-4 text-[#8C52FF]">
                <p className="cursor-pointer">like</p>
                <p className="ml-3 text-gray-500">{creator.timeAgo}</p>
            </div>
        </li> */}
    </ul>
  )
}
