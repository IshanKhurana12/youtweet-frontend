import React from 'react'
import { useState,useEffect } from 'react'
import styles from "../Styles/editVideo.module.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { authState } from '../Recoil/login.atom';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';



export default function EditVideo() {


    const navigate=useNavigate();
const [title,settitle]=useState("");
const [description,setdesc]=useState("");

const {videoid}=useParams();
const [auth]=useRecoilState(authState);

 async function handlesubmit(e){
    e.preventDefault();
    try {
        const result=await axios.patch(`http://localhost:3000/api/v1/video/edit/${videoid}`,
        {
            title:title,
            description:description
        },
            {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`
                  }
            }
           )
    
    if(result)
    {
        navigate(-1);
    }
    } catch (error) {
        console.log(error);
    }
 
    }


  return (
  
    <div className={styles.formContainer}>
  <form onSubmit={handlesubmit}>
    <label htmlFor='title'>Edit Title</label>
    <input type='text' id='title' value={title} onChange={(e)=>settitle(e.target.value)} className={styles.input} />
    <label htmlFor='description'>Edit Description</label>
    <textarea id='description'onChange={(e)=>setdesc(e.target.value)}  value={description} className={styles.textarea} />
    <button type='submit' className={styles.button} >Update</button>
  </form>
</div>
  
  )
}
