import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../Styles/Verify.module.css'; // Import CSS Module
import { authState } from '../Recoil/login.atom';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
const baseUrl = 'https://youtweet.onrender.com';
export default function Verify() {
  const [email, setEmail] = useState(''); // State to store user's email
  const [otp, setOtp] = useState(''); // State to store OTP
  const [message, setMessage] = useState(''); // State to store response messages
  const [loading, setLoading] = useState(false); // State to manage loading
 const [auth]=useRecoilState(authState);
 const navigate=useNavigate();
 

 useEffect(()=>{
    if(auth.user.verify==true){
        navigate('/feed');
         }
 },[])

    
  // Function to send the email with OTP
  const sendMail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/api/v1/users/sendmail`, {
        headers: {
          'Authorization': `Bearer ${auth.accessToken}`, // Use auth.accessToken in header
        },
      });

      setLoading(false);

      if (response.status === 200) {
        setEmail(response.data.email); // Assuming email is returned from the backend
        setMessage('OTP sent to your email. Please check your inbox.');
      } else {
        setMessage(`Error: ${response.data.message}`);
      }
    } catch (error) {
      setLoading(false);
      setMessage('Error sending OTP.');
    }
  };

  // Function to verify the OTP
  const verifyOtp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/api/v1/users/verify`, 
        { email, otp }, // Send email and OTP in the body
        {
          headers: {
            'Authorization': `Bearer ${auth.accessToken}`, // Use auth.accessToken in header
          },
        }
      );

      setLoading(false);

      if (response.status === 200) {
        setMessage('OTP verified successfully! You are now verified.');
      } else {
        setMessage(`Verification failed: ${response.data.message}`);
      }
    } catch (error) {
      setLoading(false);
      setMessage('Error verifying OTP.');
    }
  };

  function update(){
    navigate('/editdata');
  }

  return (
    <div className={styles.container}>
      <h2>Verify Email</h2>
      <h5>You need to verify to use most features</h5>

      <button onClick={sendMail} className={styles.button}>
        Send OTP to Email
      </button>

      <button onClick={update} className={styles.button}>
        Update Email
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p>{message}</p>

          <form onSubmit={verifyOtp} className={styles.form}>
            <label htmlFor="otp">Enter OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className={styles.input}
            />

            <button type="submit" className={styles.button}>
              Verify OTP
            </button>
          </form>
        </>
      )}
    </div>
  );
}
