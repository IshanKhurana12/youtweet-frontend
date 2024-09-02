import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { authState } from '../Recoil/login.atom';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Upload.module.css';

export default function VideoUpload() {
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [auth] = useRecoilState(authState);
  const navigate = useNavigate();

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('videoFile', videoFile);
    formData.append('thumbnail', thumbnail);
    formData.append('title', title);
    formData.append('description', description);

    try {
      const response = await axios.post('http://localhost:3000/api/v1/video/videoupload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${auth.accessToken}` 
        }
      });

      if (response) {
        navigate('/allvideos');
      }
      
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <p className={styles.loading}>Uploading...</p>
      ) : (
        <>
          <h1 className={styles.header}>Upload Video</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="videoFile" className={styles.label}>Video File</label>
              <input 
                type="file" 
                id="videoFile" 
                name="videoFile" 
                accept="video/*" 
                onChange={handleVideoChange} 
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="thumbnail" className={styles.label}>Thumbnail</label>
              <input 
                type="file" 
                id="thumbnail" 
                name="thumbnail" 
                accept="image/*" 
                onChange={handleThumbnailChange} 
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="title" className={styles.label}>Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>Description</label>
              <textarea 
                id="description" 
                name="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required
                className={styles.textarea}
              />
            </div>
            <button type="submit" className={styles.submitButton}>Upload</button>
          </form>
        </>
      )}
    </div>
  );
}
