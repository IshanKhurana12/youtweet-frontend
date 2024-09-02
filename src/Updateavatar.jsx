import React, { useState } from 'react'
import { authState } from '../Recoil/login.atom'
import {useRecoilState } from 'recoil'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Updateavatar() {
    const [auth]=useRecoilState(authState);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };
const navigate=useNavigate();

 async function update(e){
  e.preventDefault();

  const formData = new FormData();
  formData.append('avatar', file);

  setLoading(true);
try {
    const result=await axios.patch("http://localhost:3000/api/v1/users/updateavatar",formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${auth.accessToken}`
      }
    })
    if(result){
      navigate(-1);
    }
} catch (error) {
  return error;
}finally{
  setLoading(false);
}
 }
    




  return (
    <div>
    <form onSubmit={update}>
    <input
            type="file"
            onChange={handleFileChange}
            accept="image/*" // Adjust as needed
          />
            <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
    </form>
    
    
    
    </div>
  )
}
