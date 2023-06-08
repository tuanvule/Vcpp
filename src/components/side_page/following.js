import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AppContext } from '../../context/appContext'
import FollowingCreator from '../primary/followingCreator'

export default function Following() {
  const { user: { followed }, user } = useContext(AppContext)
  const [followeds, setFolloweds] = useState([])
  const [suggestCreators, setSuggestCreators] = useState([])

  useEffect(() => {
    if(user && user.followed) {
      fetch(`http://localhost:4000/creator/getCreator/${user.followed}`, {
        method: "GET",
        headers: {
          'Content-type': 'application/json'
        },
      })
        .then(res => res.json())
        .then(data => {
          setFolloweds(data)
        })
        .catch(err => console.log(err))
    }
  }, [user])

  useEffect(() => {
    fetch(`http://localhost:4000/creator/getCreator?type=SC`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => {
        setSuggestCreators(data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="flex-1 scrollbar h-full overflow-y-auto pr-[7.5rem]">
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
  )
}
