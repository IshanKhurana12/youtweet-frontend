import React, { useState } from 'react';
import { authState } from '../Recoil/login.atom';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "../Styles/Signin.module.css";
const baseUrl = 'https://youtweet.onrender.com';
export default function Signin() {
    const navigate = useNavigate();
    const [auth] = useRecoilState(authState);

    if (auth.isAuthenticated) {
        navigate('/');
    }

    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('fullName', fullName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('avatar', avatar);
        formData.append('coverImage', coverImage);

        try {
            const response = await axios.post(`${baseUrl}/api/v1/users/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            
             
              
               if(response.status===201){
                navigate('/')
               } 
            
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Sign In</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="username">Channel Name</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email enter correct email id for verification purpose</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="avatar">Avatar</label>
                    <input
                        type="file"
                        id="avatar"
                        onChange={(e) => setAvatar(e.target.files[0])}
                        required
                        className={styles.input}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="coverImage">Cover Image</label>
                    <input
                        type="file"
                        id="coverImage"
                        onChange={(e) => setCoverImage(e.target.files[0])}
                        required
                        className={styles.input}
                    />
                </div>

                <button type="submit" className={styles.submitButton}>Sign In</button>
            </form>
        </div>
    );
}
