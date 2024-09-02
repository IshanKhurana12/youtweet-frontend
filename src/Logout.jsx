import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { authState, logout } from '../Recoil/login.atom';
import { logoutSelector } from '../Recoil/login.selector';
import { useNavigate } from 'react-router-dom';
import styles from "../Styles/Logout.module.css";
import { useRef } from 'react';
import { videoState } from '../Recoil/video.atom';
export default function Logout() {
  const [auth, setAuth] = useRecoilState(authState);
  const [logot, setLogout] = useRecoilState(logout);
  const logoutLoadable = useRecoilValueLoadable(logoutSelector);
  const [videos,setvideos]=useRecoilState(videoState);
  const navigate = useNavigate();
  const [hasLoggedOut, setHasLoggedOut] = useState(false); // Flag to track logout
    const checker=useRef(false);
  useEffect(() => {
    if (hasLoggedOut) return; // Prevent re-running if already logged out
    if(checker.current) return;
    const performLogout = async () => {
      try {
        setLogout({ loggedout: true });

    
        // Update auth state
        setAuth({
          isAuthenticated: false,
          accessToken: '',
          refreshToken: '',
          user: null
        });

        setvideos([]);

      
        checker.current=true;
        // Redirect to login page
        navigate('/');
      } catch (error) {
        console.error('Error during logout:', error);
      }

      // Set the flag to true to prevent re-running
      setHasLoggedOut(true);
    };

    performLogout();
  }, []);

  return (
    <div className={styles.container}>
      <p>Logging you out...</p>
    </div>
  );
}
