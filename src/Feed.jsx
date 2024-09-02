import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../Styles/Feed.module.css";
import { useRecoilState } from 'recoil';
import { authState } from '../Recoil/login.atom';
import { useNavigate } from 'react-router-dom';

export default function Feed() {
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
const [auth]=useRecoilState(authState);
const navigate=useNavigate();
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const result = await axios.get(`http://localhost:3000/api/v1/video/getfeed?page=${page}&limit=10`, {
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`
          }
        });
      
        setVideos(result.data.data.data);
        setTotalPages(result.data.data.pagination.pages);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };
function handleclick(id){
    navigate(`/watch/${id}`);
}
  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.videoList}>
          {videos.map(video => (
            <div key={video._id} onClick={()=>handleclick(video._id)} className={styles.videoCard}>
              <img src={video.thumbnail} alt={video.title} className={styles.thumbnail} />
              <h2>{video.title}</h2>
              <p>{video.description}</p>
            </div>
          ))}
        </div>
      )}

      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}
