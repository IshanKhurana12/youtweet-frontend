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
import Videoplayer from './Videoplayer';
import Feed from './Feed';
import Signin from './Signin';
import Upload from './Upload';
import Updateavatar from './Updateavatar';
import Manage from './Manage';
import Edit from './Edit';
import Verify from './Verify';

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
              <Link to="/feed" className={styles.navLink}>Feed</Link>
            </li>

            <li className={styles.navItem}>
              <Link to="/verify" className={styles.navLink}>Verify</Link>
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
         <Route path='/watch/:id' element={
         <AuthMiddleware>
          <Videoplayer />
         </AuthMiddleware>} />
       <Route path='/editvideo/:videoid' element={<AuthMiddleware><EditVideo /> </AuthMiddleware>}   />
       <Route path='/feed' element={<AuthMiddleware> <Feed /></AuthMiddleware>} />
       <Route path='/newuser' element={<Signin />} />
       <Route path='/upload' element={<AuthMiddleware><Upload /></AuthMiddleware>} />
       <Route path='/updateAvatar' element={<AuthMiddleware><Updateavatar /></AuthMiddleware>} />
       <Route path='/manage' element={<AuthMiddleware><Manage /></AuthMiddleware>} />
       <Route path='/editdata' element={<AuthMiddleware><Edit /></AuthMiddleware>} />
       <Route path='/verify' element={<AuthMiddleware><Verify /></AuthMiddleware>} />
        </Routes>
        
      </div>
    </Router>
  );
}
