import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '../Recoil/login.atom';
import axios from 'axios';
import styles from "../Styles/UserChannelReport.module.css";


import { Link, useNavigate } from 'react-router-dom';



export default function UserChannelReport() {
  const navigate=useNavigate();

  function getallvideos(){
    navigate('/allvideos');
  }

  const [auth] = useRecoilState(authState); // Use the auth state from Recoil
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Ensure auth.user and auth.user.username are defined before making the API call
    if (auth.isAuthenticated && auth.user && auth.user.username) {
      const fetchReportData = async () => {
        try {
         
          const result = await axios.get(`http://localhost:3000/api/v1/users/channel/${auth.user.username}`, {
            headers: {
              'Authorization': `Bearer ${auth.accessToken}`
            }
          });
        
          setReportData(result.data.data);
    
        } catch (err) {
          setError(err.message);
        }finally{
          setLoading(false);
        }
      };

      fetchReportData();
    }
  }, [auth]); // Dependency array to re-fetch if auth changes


  console.log(typeof(reportData));
  // Conditional rendering based on the state
  if (!auth.isAuthenticated) {
    return <div><h2>Please log in to view the report.</h2></div>;
  }

  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

      <div className={styles.container}>
        <div className={styles.coverImageContainer}>
          {reportData.coverImage && (
            <img src={reportData.coverImage} alt={`${reportData.username}'s cover`} className={styles.coverImage} />
          )}
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.avatarContainer}>
            {reportData.avatar && (
              <img src={reportData.avatar} alt={`${reportData.username}'s avatar`} className={styles.avatar} />
            )}
          </div>
          <div className={styles.infoContainer}>
            <h1 className={styles.username}>{reportData.username}</h1>
            <h2 className={styles.fullName}>{reportData.fullName}</h2>
            <p className={styles.stats}><strong>Subscribers Count:</strong> {reportData.subscribersCount}</p>
            <p className={styles.stats}><strong>Channels Subscribed:</strong> {reportData.channelsSubscribedToCount}</p>
            <p className={styles.stats}><strong>Email:</strong> {reportData.email}</p>
          </div>
        </div>
        <div>
         <Link  to={'/allvideos'}><strong>Get all videos</strong> </Link>
        </div>
      </div>
  );
}
