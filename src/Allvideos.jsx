import React from 'react'
import { authState } from '../Recoil/login.atom'
import {  Link, useNavigate } from 'react-router-dom'
import { deleteatom, videoState } from '../Recoil/video.atom'
import { deleteSelector, getvideoselector } from '../Recoil/video.selector'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import { useState } from 'react'
import styles from "../Styles/allvideos.module.css";
import { useEffect } from 'react'



export default function Allvideos() {

  const [videos, setVideos] = useRecoilState(videoState);

  const videosLoadable = useRecoilValueLoadable(getvideoselector);
const [checker,setchecker]=useState(false);

const [del,setdel]=useRecoilState(deleteatom);
const deleteloadble=useRecoilValueLoadable(deleteSelector);
function deletevideo(id){
  setdel({
    deleted:true,
    videoId:id
  })

   if(deleteloadble.state==='hasValue'){
    const updatedvideos=videos.filter((video)=>{
      return video._id!==id
    })
    setVideos(updatedvideos)
   }
}



const navigate=useNavigate();



  useEffect(() => {
    if(checker){
      return;
    }

    if (videosLoadable.state === 'hasValue') {
      setVideos(videosLoadable.contents.data);
    
      setchecker(true);
    }
    // Handle error or loading states if necessary
  }, [checker,videosLoadable, setVideos]); // Dependencies include videosLoadable and setVideos


  //on unmount cleanup
  useEffect(() => {
    console.log(videos);
    setchecker(false);
  
  }, []);

  function editvideo(videoid){
    navigate(`/editvideo/${videoid}`);
  }
  function watchvideo(id){
    navigate(`/watch/${id}`);
  }


  return (
  <>
     <div className={styles.container}>
     {videos.length===0? <h1>upload a video</h1> : <h1>my videos</h1> }
      {videos.map((video) => (
        <div key={video._id} className={styles.videoCard}>
          <img src={video.thumbnail} alt={video.title} className={styles.thumbnail} />
          <div className={styles.info}>
            <h2 className={styles.title}>{video.title}</h2>
            <p className={styles.description}>description: {video.description}</p>
            <p className={styles.description}> {video.views} views</p>
            <button className={styles.watchButton} onClick={()=>watchvideo(video._id)}>Watch video</button>
        
            <button className={styles.watchButton} onClick={()=>editvideo(video._id)}>edit</button>
            <button className={styles.watchButton} onClick={()=>deletevideo(video._id)}>delete</button>
          </div>
        </div>
      ))}
    </div>
  </>
  )
}
