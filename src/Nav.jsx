import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import UserChannelReport from './UserChannelReport';
import Logout from './Logout';
import { authState } from '../Recoil/login.atom';
import { useRecoilState } from 'recoil';
import styles from '../Styles/Nav.module.css'; // Import the CSS module
import AuthMiddleware from './AuthMiddleware';
import Allvideos from './Allvideos';
import EditVideo from './EditVideo';

export default function Nav() {
  const [auth] = useRecoilState(authState);

  return (
    <Router>
      <div className={styles.nav}>
        <nav>
          <ul className={styles.navList}>
            {auth.isAuthenticated ? (
              <li className={styles.navItem}>
                <Link to="/signout" className={styles.navLink}>Logout</Link>
              </li>
            ) : (
              <li className={styles.navItem}>
                <Link to="/" className={styles.navLink}>Login</Link>
              </li>
            )}
            <li className={styles.navItem}>
              <Link to="/profile" className={styles.navLink}>My Profile</Link>
            </li>
            <li className={styles.navItem}>
              <Link to="/allvideos" className={styles.navLink}>All Videos</Link>
            </li>
          </ul>
        </nav>
   
        <Routes>
          <Route path="/" element={<Login />} />
         
          <Route path="/signout" element={<Logout />} />
          <Route path="/profile" element={
               <AuthMiddleware>
          <UserChannelReport />
          </AuthMiddleware>} />
         <Route path='/allvideos' element={<AuthMiddleware><Allvideos /></AuthMiddleware>} />
       <Route path='/editvideo/:videoid' element={<AuthMiddleware><EditVideo /> </AuthMiddleware>}   />
       
        </Routes>
        
      </div>
    </Router>
  );
}
