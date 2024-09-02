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


  const [watch,setwatch]=useState([]);
useEffect(()=>{
 async function getwatchhistory(){
  const result = await axios.get(`http://localhost:3000/api/v1/users/getwatchhistory`, {
    headers: {
      'Authorization': `Bearer ${auth.accessToken}`
    }
  });
    

  if(result){
   
    setwatch(result.data.data);
    
  }

  }
 getwatchhistory()
},[]);


console.log(watch);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
<>
      <div className={styles.container}>
        <div className={styles.coverImageContainer}>
          {reportData.coverImage && (
            <img src={reportData.coverImage} alt={`${reportData.username}'s cover`} className={styles.coverImage} />
          )}
        </div>
        <div className={styles.profileContainer}>
          <div className={styles.avatarContainer}>
            {reportData.avatar && (
              <Link to={'/updateAvatar'} className={styles.l}>
              <img src={reportData.avatar} alt={`${reportData.username}'s avatar`} className={styles.avatar} />
              </Link>
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
         <Link  to={'/allvideos'} className={styles.link}><strong>My videos</strong> </Link>
         <Link  to={'/upload'} className={styles.link}><strong>Upload videos</strong> </Link>
        <Link to={'/manage'} className={styles.link}><strong>Manage videos</strong></Link>
        </div>

        </div>



        <div>

        </div>
        <div className={styles.dw}>
        <h2 className={styles.watch}>Watch History</h2>
        </div>
        <div className={styles.container}>
       
        {watch.length > 1 ? (
        watch.map((item,id) => (
        <Link to={`/watch/${item.watchHistoryDetails._id}`} > <div key={id} className={styles.watchItem}>
            <img
              src={item.watchHistoryDetails.thumbnail}
              alt={item.watchHistoryDetails.title}
              className={styles.thumbnail}
            />
            <h3 className={styles.title}>{item.watchHistoryDetails.title}</h3>
          </div>
          </Link>
        ))
      ) : (
        <p className={styles.noData}>No watch history found.</p>
      )}
      </div>
    </>
  );
}
