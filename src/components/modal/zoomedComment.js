import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import ZoomedCommentsModal from './zoomed-comments'

export default function ZoomedComment(props) {
  const [isFollow, setIsFollow] = useState(false)
  const [isLike, setIslike] = useState(false)

  const {creatorAvata, postId, creatorName, caption, setIsErr, Cid, Uid, like} = props

  function handleFollow() {
    if(Uid) {
        fetch(`http://localhost:4000/action/follow/${Cid}`, {
            method: "POST",
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({ Uid: Uid})
        })
            .then(res => res.json())
            .then(data => console.log(data))

        setIsFollow(true)
    } else {
        setIsErr(true)
    }

}

function handleUnFollow() {
    if(!Uid) return

    fetch(`http://localhost:4000/action/unfollow/${Cid}`, {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ Uid: Uid})
    })
        .then(res => res.json())
        .then(data => console.log(data))

    setIsFollow(false)
}

useEffect(() => {
    if(like) {
        const wasLike = like.find((id) => {
            return id === Uid
        })

        setIslike(Boolean(wasLike))
    }

    console.log(Cid)

    fetch(`http://localhost:4000/creator/isFollow/${Cid}`,{            
        method: "POST",
        headers: {
        'Content-type': 'application/json'
        },
        body: JSON.stringify({ Uid: Uid})
    })
        .then(res => res.json())
        .then(isFollow => {
            console.log(isFollow)
            setIsFollow(isFollow)
        })
        .catch(err => console.log(err))

}, [like])

  return (
     <div className="relative w-[30%] h-full ml-6">
          <div className="scrollbar w-full h-full bg-white rounded-2xl overflow-hidden overflow-y-scroll">
              <div className="w-full h-full flex flex-col px-2">
                <div className="w-full flex justify-between items-center px-2 py-2 mr-10 mt-2">
                    <div className="flex ">
                        {creatorAvata.length <= 2 ? 
                            <div className="
                            w-12 h-12 rounded-full
                            bg-[#8C52FF] text-white
                            text-center text-2xl
                            leading-[48px]
                            mr-4 cursor-pointer
                            "
                            >{creatorAvata}</div>
                        : 
                            <div className="cursor-pointer w-10 h-10 bg-center bg-cover" style={{backgroundImage: `url(${creatorAvata})`}}/>
                        }
                        
                        <div>
                            <p className=" text-lg leading-none font-medium">{creatorName}</p>
                            {/* <p className="text-gray-400">{rank}</p> */}
                        </div>
                    </div>
                    {isFollow ? 
                        <div onClick={handleUnFollow} className="px-5 py-1 border rounded-md font-medium transition-all duration-75 bg-[#8950FA] text-white cursor-pointer">
                            follow
                        </div>
                    :
                        <div onClick={handleFollow} className="px-5 py-1 border border-[#8950FA] rounded-md font-medium transition-all duration-75 hover:bg-[#8950FA] hover:text-white cursor-pointer">
                            follow
                        </div>
                    }
                </div>
                <div className={`px-2 pb-2 bg-white`}>
                    <td className=" w-full break-all" dangerouslySetInnerHTML={{__html: caption}} />
                </div>
                <hr className=" border-[#8C52FF] ml-2 mt-4"/>
                <ZoomedCommentsModal setIsErr={setIsErr} postId={postId}/>
              </div>
          </div>
        </div>
  )
}
