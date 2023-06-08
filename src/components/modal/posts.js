import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/appContext'
import Post from '../side_page/post'

export default function PostsModal(props) {
    const { user } = useContext(AppContext)

    const [posts, setPosts] = useState([])

    useEffect(() => {
      if(props.isGetHotVD) {
        fetch(`http://localhost:4000?isGetHotVD=true`, {
            method: "GET",
            headers: {
              'Content-type': 'application/json'
            },
          })
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.log(err))
      } else {
          fetch(`http://localhost:4000/`, {
            method: "GET",
            headers: {
              'Content-type': 'application/json'
            },
          })
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.log(err))
        }
    }, [props])
  return (
        <ul className="post-list flex-1 scrollbar h-full overflow-y-auto overflow-x-hidden pl-10 pr-[7.5rem]">
          {posts && posts.map((post, index) => 
            <Post creatorName={post.creatorName} rank="gold" creatorAvata={post.avata} caption={post.caption} videoUrl={post.videoUrl} like={post.like} postId={post._id} Cid={post.Cid} Uid={user && user._id}/>
          )}
        </ul>
  )
}
