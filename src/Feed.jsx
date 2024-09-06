import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../Styles/Feed.module.css";
import { useRecoilState } from 'recoil';
import { authState } from '../Recoil/login.atom';
import { useNavigate } from 'react-router-dom';


export default function Feed() {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1); // State to track the current page
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [auth] = useRecoilState(authState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const result = await axios.get(`http://localhost:3000/api/v1/video/getfeed?page=${page}&limit=25`, {
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`
          }
        });

        setVideos(result.data.data.data);
        setTotalPages(result.data.data.pagination.pages);
        setFilteredVideos(result.data.data.data); // Initialize filteredVideos
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [page, auth.accessToken]);

  useEffect(() => {
    const searchVideos = () => {
      if (searchTerm.trim() === '') {
        setFilteredVideos(videos); // Show all videos if no search term
      } else {
        setFilteredVideos(
          videos.filter(video =>
            video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            video.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
    };

    searchVideos();
  }, [searchTerm, videos]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); 
  };

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

  const handleclick = (id) => {
    navigate(`/watch/${id}`);
  };


    const [searchQuery, setSearchQuery] = useState('');
  
    // Check for browser support
    const isSpeechRecognitionSupported = 'webkitSpeechRecognition' in window;
  
    // Initialize Web Speech API
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false; // Stop after a single result
    recognition.interimResults = false; // Do not show intermediate results
    recognition.lang = 'en-US'; // Set language
  
    // Handle results
    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
    
      performSearch(result); // Call your search function
   
    };
  
 
    // Handle errors
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };
  
    const handleVoiceSearch = () => {
      if (isSpeechRecognitionSupported) {
        recognition.start();
      } else {
        alert('Sorry, your browser does not support speech recognition.');
      }
    };
  
    const performSearch = (command) => {
      if (command.startsWith('open ')) {
        const commandWithoutOpen = command.slice(5); 
          if(filteredVideos.length<videos.length){
            console.log(filteredVideos)
            handleclick(filteredVideos[0]._id);
          }
    }else{
      setSearchTerm(command);
    }
    };
  return (
    <div className={styles.container}>
   
       <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className={styles.search}
          />
          <button className={styles.voicesearch} onClick={handleVoiceSearch}>
            🎙️
          </button>
        </div>
  
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.videoList}>
          {filteredVideos.map(video => (
            <div key={video._id} onClick={() => handleclick(video._id)} className={styles.videoCard}>
              <img src={video.thumbnail} alt={video.title} className={styles.thumbnail} />
              <img src={video.owner.avatar} alt={video.title} className={styles.avatar} />
              <h2>{video.title}</h2>
              <p>Description: {video.description}</p>
              <p>{video.views} views</p>
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
