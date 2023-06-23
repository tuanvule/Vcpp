import React, { useEffect, useRef, useState, useContext } from 'react'
import CommentsModal from '../modal/comments'
import { AppContext } from '../../context/appContext'
import PostsModal from '../modal/posts'
import LoginRequest from '../primary/loginRequest'
import VideoControl from '../modal/videoControl'
import { comment } from 'postcss'

export default function Post(props) { 
    // const [isHideText, setIsHideText] = useState(true)
    const [isOpenComment, setIsOpenComment] = useState(false)
    const [isLike, setIslike] = useState(false)
    const [isFollow, setIsFollow] = useState(false)
    const [isRequestLogin, setIsRequestLogin] = useState(false)
    
    const { user } = useContext(AppContext)

    const { creatorName, creatorAvata, rank, caption, videoUrl, postId, Cid, Uid, like } = props

    const [newLike, setNewLike] = useState(like.length)

    const postRef = useRef()

    function handleLike() {
        if(user) {
            fetch(`https://vccp-be.vercel.app/action/like/${postId}`, {
                method: "POST",
                body: JSON.stringify({ Uid: Uid})
            })
    
            setNewLike(prev => prev+=1)
    
            setIslike(true)
        } else {
            setIsRequestLogin(true)
        }
    }

    function handleDisLike() {
        if(!Uid) return

        fetch(`https://vccp-be.vercel.app/action/dislike/${postId}`, {
            method: "POST",
            body: JSON.stringify({ Uid: Uid})
        })  
            .then(res => res.json())
            .then(data => console.log(data))


        setNewLike(prev => prev-=1)

        setIslike(false)
    }

    function handleFollow() {
        if(user) {
            fetch(`https://vccp-be.vercel.app/action/follow/${Cid}`, {
                method: "POST",
                body: JSON.stringify({ Uid: Uid})
            })
                .then(res => res.json())
                .then(data => console.log(data))

            fetch(`https://vccp-be.vercel.app/action/followed/${Cid}`, {
                method: "POST",
                body: JSON.stringify({ Uid: Uid})
            })
                .then(res => res.json())
                .then(data => console.log(data))
    
            setIsFollow(true)
        } else {
            setIsRequestLogin(true)
        }

    }

    function handleUnFollow() {
        if(!Uid) return

        fetch(`https://vccp-be.vercel.app/action/unfollow/${Cid}`, {
            method: "POST",
            body: JSON.stringify({ Uid: Uid})
        })
            .then(res => res.json())
            .then(data => console.log(data))
        
        fetch(`https://vccp-be.vercel.app/action/unfollowed/${Cid}`, {
            method: "POST",
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

        fetch(`https://vccp-be.vercel.app/creator/isFollow/${Cid}`,{            
            method: "POST",
            body: JSON.stringify({ Uid: Uid})
        })
            .then(res => res.json())
            .then(isFollow => {
                setIsFollow(isFollow)
            })
            .catch(RequestLogin => console.log(RequestLogin))

    }, [Uid, Cid, like])

    useEffect(() => {
        postRef.current.parentElement.onscroll = () => {
            setIsOpenComment(false)
        }
    }, [isOpenComment])

  return (
    <li ref={postRef} className=" relative flex">
      {isRequestLogin && <LoginRequest setIsRequestLogin={setIsRequestLogin} title="bạn cần phải đăng nhập để thực hiện điều này"/>}

        <div className="flex-1">
            <div className="flex justify-between items-center px-2 py-2 mr-10">
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
                    {/* <div className="w-12 h-12 mr-2 bg-center bg-cover rounded-full" style={{backgroundImage: 'url(https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat_800x450.jpg)'}}/> */}
                    <div className="dark:text-white">
                        <p className=" text-lg leading-none font-medium">{creatorName}</p>
                        <p className="text-gray-400">{rank}</p>
                    </div>
                </div>
                <div className="dark:text-white">
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
            </div>
            <div  className={` px-2 pb-2 dark:text-white `}>
                
                <td className=" w-full break-all" dangerouslySetInnerHTML={{__html: caption}} />

            </div>
            <div className="flex relative mr-12">

                <div className=" w-full h-96 bg-black rounded-lg overflow-hidden">
                    <VideoControl {...props} caption={caption} postId={postId} videoUrl={videoUrl}/>
                </div>

                <div className=" absolute -right-12 h-full flex flex-col justify-around w-12 dark:text-white">
                    <div className="z-10">
                        {isLike ? 
                            <i onClick={handleDisLike} class="fa-regular fa-thumbs-up text-3xl text-[#8C52FF] cursor-pointer ml-2 dark:text-white"></i>
                        : 
                            <i onClick={handleLike} class="fa-regular fa-thumbs-up text-3xl text-black hover:text-[#8C52FF] cursor-pointer ml-2 dark:text-white"></i>
                        }
                        <p className="text-center mr-2">{newLike}</p>
                    </div>
                    <div className="z-10">
                        <i onClick={() => setIsOpenComment(!isOpenComment)} class={`fa-solid fa-comment-dots text-3xl text-black hover:text-[#8C52FF] dark:text-white hover:dark:text-[#8C52FF] ${isOpenComment && 'text-[#8C52FF] dark:text-[#8C52FF]'} cursor-pointer ml-2`}></i>
                        {/* <p className="text-center mr-2">{}</p> */}
                    </div>
                </div>
            </div>
            <div className=" w-[89%] mx-auto h-[1px] bg-[#8C52FF] mt-4 mb-2 mr-16"></div>
        </div>

        {isOpenComment && <CommentsModal setIsRequestLogin={setIsRequestLogin} postId={postId} setIsOpenComment={setIsOpenComment}/>}
    </li>
  )
}
