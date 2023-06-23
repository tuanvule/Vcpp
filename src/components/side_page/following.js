import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AppContext } from '../../context/appContext'
import FollowingCreator from '../primary/followingCreator'

export default function Following() {
  const { user, page} = useContext(AppContext)
  const [followeds, setFolloweds] = useState([])
  const [suggestCreators, setSuggestCreators] = useState([])

  useEffect(() => {
    if(user && user.followed ) {
      fetch(`https://vccp-be.vercel.app/creator/getCreator/${user.followed}`, {
        method: "GET",
      })
        .then(res => res.json())
        .then(data => {
          setFolloweds(data)
        })
        .catch(err => console.log(err))
    }
  }, [user])

  useEffect(() => {
    if(!page.info) {
      fetch(`https://vccp-be.vercel.app/creator/getCreator?type=SC`, {
        method: "GET",
      })
        .then(res => res.json())
        .then(data => {
          setSuggestCreators(data)
        })
        .catch(err => err)
    }
  }, [])

  return (
    <div className="flex-1 scrollbar h-full overflow-y-auto pr-[7.5rem] dark:text-white">
      {page.info && page.info ? (
        <div>
          <h2 className=" font-medium ml-[6%] text-[#8C52FF] my-2">Nội dung tìm kiếm</h2>
          <hr className="ml-[6%] border-[#8C52FF]"/>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-7 pl-6 mt-4">
              {page.info && page.info.map((follower,index) => <FollowingCreator key={index} followed={true} {...follower}/>)}
            </ul>
        </div>
      ) : (
        <div>
          {user !== '' &&
            <div>
              <h2 className=" font-medium ml-[6%] text-[#8C52FF] my-2">Đã follow</h2>
              <hr className="ml-[6%] border-[#8C52FF]"/>
                <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-7 pl-6 mt-4">
                  {followeds && followeds.map((follower,index) => <FollowingCreator key={index} followed={true} {...follower}/>)}
                </ul>
            </div>
          }
          <div>
            <h2 className=" font-medium ml-[6%] text-[#8C52FF] my-2">Creator được đề xuất</h2>
            <hr className="ml-[6%] border-[#8C52FF]"/>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-7 pl-6 mt-4">
            {suggestCreators && suggestCreators.map((suggestCreator,index) => <FollowingCreator key={index} followed={true} {...suggestCreator}/>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
