import React from 'react'
import { authState } from '../Recoil/login.atom'
import {  useNavigate } from 'react-router-dom'
import { videoState } from '../Recoil/video.atom'
import { getvideoselector } from '../Recoil/video.selector'
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import { useState } from 'react'
import styles from "../Styles/allvideos.module.css";
import { useEffect } from 'react'



export default function Allvideos() {

  const [videos, setVideos] = useRecoilState(videoState);

  const videosLoadable = useRecoilValueLoadable(getvideoselector);
const [checker,setchecker]=useState(false);
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
    setchecker(false);
  
  }, []);

  function editvideo(videoid){
    navigate(`/editvideo/${videoid}`);
  }



  return (
  <>
     <div className={styles.container}>
      {videos.map((video) => (
        <div key={video._id} className={styles.videoCard}>
          <img src={video.thumbnail} alt={video.title} className={styles.thumbnail} />
          <div className={styles.info}>
            <h2 className={styles.title}>{video.title}</h2>
            <p className={styles.description}>{video.description}</p>
            <a href={video.videoFile} className={styles.watchButton} target="_blank" rel="noopener noreferrer">
              Watch Video
            </a>
            <button className={styles.watchButton} onClick={()=>editvideo(video._id)}>edit</button>
          </div>
        </div>
      ))}
    </div>
  </>
  )
}
