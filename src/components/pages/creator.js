import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/appContext'
import EditProfile from '../modal/editProfile'
import FullScreenVD from '../modal/fullScreenVD'
import VideoList from '../modal/videoList'
import LoginRequest from '../primary/loginRequest'
import Navbar from '../primary/navbar'
import SideBar from '../primary/sidebar'

export default function Creator() {
    const { profile, setProfile, user } = useContext(AppContext)
    const [videos, setVideos] = useState()
    const [isEditProfile, setIsEditProfile] = useState(false)
    const [isFollow, setIsFollow] = useState(false)
    // const [isErr, setIsErr] = useState(false)
    const [isRequestLogin, setIsRequestLogin] = useState(false)
    const [openVideoList, setOpenVideoList] = useState({})

    function handleFollow() {
        if(user) {
            fetch(`https://vccp-be.vercel.app/creator/action/follow/${profile[0]._id}`, {
                method: "POST",
                body: JSON.stringify({ Uid: user._id})
            })
                .then(() => setIsFollow(true))
        } else {
            setIsRequestLogin(true)
        }
    }

    function handleUnFollow() {
        if(user) {
            fetch(`https://vccp-be.vercel.app/creator/action/unfollow/${profile[0]._id}`, {
                method: "POST",
                body: JSON.stringify({ Uid: user._id})
            })
                .then(res => setIsFollow(false))
        } else {
            setIsRequestLogin(true)
        }
    }

    useEffect(() => {
        if(profile) {
            fetch(`https://vccp-be.vercel.app/getVDByCreator/${profile[0]._id}`, {
                method: "GET",
            })
            .then(res => res.json())
            .then(data => setVideos(data))
            .catch(err => console.log(err))
        }
    }, [profile])

    useEffect(() => {
        if(profile) {
            fetch(`https://vccp-be.vercel.app/creator/isFollow/${profile[0]._id}`, {
                method: "POST",
                body: JSON.stringify({ Uid: user._id})
            })
            .then(res => res.json())
            .then(isFollow => setIsFollow(isFollow))
            .catch(err => console.log(err))
        }
    }, [])

  return (
    <div className="dark:text-white">
        {profile ? <div className="flex-1 lg:pr-[8rem] pr-11 lg:pl-4">
            <div className="flex items-center">
                {profile[0].avata.length <= 1 ? 
                    <div className="
                    w-28 h-28 min-w-[7rem] rounded-full
                    bg-[#8C52FF] text-white
                    text-center text-5xl
                    leading-[220%] z-20
                    mr-4 cursor-pointer
                    "
                    >{profile[0].avata}</div>
                : 
                    <div className="cursor-pointer w-10 h-10 bg-center bg-cover" style={{backgroundImage: `url(${profile[0].img})`}}/>
                }
                {/* <div style={{backgroundImage: 'url(https://bloganchoi.com/wp-content/uploads/2022/02/anime-ga-la-xy.jpg)'}} className=" bg-cover bg-center rounded-full w-28 h-28 mr-4"/> */}
                <div className="">
                    <h1 className="font-bold transform translate-y-2">{profile[0].name}</h1>
                    {user._id !== profile[0]._id && 
                        <div className="mb-3">
                            <p className=" text-lg font-medium mb-1">{`@${profile[0].name}`}</p>
                            <span><span className=" font-bold text-lg my-4">{videos ? videos.length : '0'}</span> video</span>
                        </div>
                    }
                    
                    { user._id === profile[0]._id &&
                        <div onClick={() => setIsEditProfile(true)} className="text-center px-4 py-1 rounded-md border text-lg font-medium hover:brightness-95 cursor-pointer my-5 bg-white dark:bg-[#1e1926] dark:border-[#8C52FF] dark:hover:bg-[#8C52FF] transition"><i class="fa-solid fa-book mr-3"></i>Edit profile</div>
                        // isFollow ? 
                        //     <div onClick={handleUnFollow} className="text-center px-8 py-1 rounded-md border bg-[#8C52FF] text-white text-lg font-medium hover:brightness-95 cursor-pointer mt-3 transition-all duration-75">
                        //         follow
                        //     </div>
                        // :
                        // <div onClick={handleFollow} className="text-center px-8 py-1 rounded-md border border-[#8C52FF] hover:bg-[#8C52FF] hover:text-white text-lg font-medium hover:brightness-95 cursor-pointer mt-3 transition-all duration-75">
                        //     follow
                        // </div>
                        // <img src="/diamond-rank.png" alt="" className=" transform -translate-x-16 translate-y-[6.5px] w-72 h-16" />
                        // <div style={{background: 'url(/gold-rank.png)'}} className=" w-20 h-10">

                        // </div>
                        // <div></div>
                        // <div className=" text-center px-8 py-1 rounded-md border border-[#8C52FF] hover:bg-[#8C52FF] hover:text-white text-lg font-medium hover:brightness-95 cursor-pointer mt-3 transition-all duration-75">Follow</div>
                    }
                </div>
                <div className="ml-auto">
                    {isFollow ?                     
                        <div onClick={handleUnFollow} className="follow-btn relative mt-4 ml-auto h-28 w-48 rounded-md shadow-lg text-center border border-gray-200 bg-[#8C52FF] cursor-pointer">
                            <h3 className="ml-1 mt-4 font-semibold text-white">
                                Follower 
                            </h3>
                            <h3 className="text-white">{profile[0].follower.length}</h3>``
                            {user._id !== profile[0]._id &&                         
                                <div className="follow-hover absolute top-0 rounded-md flex opacity-0 w-full h-full border border-[#8C52FF] bg-white transition">
                                    <h3 className="m-auto text-black font-medium ">click to unfollow</h3>
                                </div>
                            }
                        </div>
                        :
                        <div onClick={handleFollow} className="follow-btn relative mt-4 ml-auto h-28 w-48 rounded-md shadow-lg text-center border border-[#8C52FF] cursor-pointer">
                            <h3 className="ml-1 mt-4 font-semibold">
                                Follower 
                            </h3>
                            <h3 className="text-[#8C52FF]">{profile[0].follower.length}</h3>
                            {user && user._id !== profile[0]._id &&                         
                                <div className="follow-hover absolute top-0 rounded-md flex opacity-0 w-full h-full bg-[#8C52FF] transition">
                                    <h3 className="m-auto text-white font-medium ">click to follow</h3>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>


            <div className="ml-1 mt-4">
                <p className=" text-xl">{profile[0].story === ' ' ? profile[0].story : 'không có mô tả'}</p>
            </div>

            <ul className="list-none grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 ml-1 mt-4 relative">
                {videos && videos.map((video, index) => 
                    <li onClick={() => setOpenVideoList({isOpen:true, index})} className="video bg-black rounded-lg relative hover:brightness-90 transform hover:-translate-y-1 transition-all duration-75 cursor-pointer">
                        <video src={video.videoUrl} className=" h-80"></video>
                        <h3 className="view hidden absolute bottom-2 left-2 text-white"><i class="fa-solid fa-thumbs-up"></i> {video.like.length} </h3>
                    </li>
                )}
                {/* <li className="video bg-black rounded-lg relative hover:brightness-90 transform hover:-translate-y-1 transition-all duration-75">
                    <video src="/test.mp4" className=" h-80"></video>
                    <h3 className="view hidden absolute bottom-2 left-2 text-white"><i class="fa-solid fa-eye"></i> 100K</h3>
                </li> */}
            </ul>
            
        </div>
        :
        <div className="flex-1 flex items-center justify-center text-3xl text-[#8C52FF]"><i class="fa-solid fa-face-dizzy mr-4"></i> No creators found</div>
        } 

        {isEditProfile && 
            <EditProfile profile={profile} setProfile={setProfile} setIsEditProfile={setIsEditProfile}/>
        }
        {isRequestLogin &&         
            <LoginRequest setIsRequestLogin={setIsRequestLogin} title="bạn cần phải đăng nhập để đăng nội dung"/>
        }

        {openVideoList.isOpen && <VideoList setOpenVideoList={setOpenVideoList} videos={videos} index={openVideoList.index}/>}

    </div>
  )
}
