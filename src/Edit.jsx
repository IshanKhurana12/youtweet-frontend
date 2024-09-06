import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '../Recoil/login.atom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "../Styles/edit.module.css"
export default function Edit() {
  const [auth] = useRecoilState(authState);
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const baseUrl = 'https://youtweet.onrender.com';
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const updateCoverImage = async (e) => {
    e.preventDefault();
    if (!file) return; // Do nothing if no file is selected

    const formData = new FormData();
    formData.append('coverImage', file);

    setLoading(true);
    setError(null); // Reset error before starting the request

    try {
      const result = await axios.patch(`${baseUrl}/api/v1/users/updatecoverimage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${auth.accessToken}`
        }
      });

      if (result.status === 200) {
        navigate(-1); // Navigate back on success
      }
    } catch (error) {
      setError('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsUpdate = async (e) => {
    e.preventDefault();
    if (!email || !fullName) return; // Do nothing if inputs are empty

    setLoading(true);
    setError(null); // Reset error before starting the request

    try {
      const result = await axios.patch(`${baseUrl}/api/v1/users/updatedetails`, {
        email: email,
        fullName: fullName
      }, {
        headers: {
          'Authorization': `Bearer ${auth.accessToken}`
        }
      });

      if (result.status === 200) {
        navigate(-1); // Navigate back on success
      }
    } catch (error) {
      setError('Failed to update details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
    <form onSubmit={updateCoverImage}>
      <label htmlFor="cover">Update/Add Cover Image</label>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        id='cover'
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  
    <form onSubmit={handleDetailsUpdate}>
      <input
        type="text"
        placeholder='Enter Full Name'
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="email"
        placeholder='Update Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type='submit' disabled={loading}>
        {loading ? 'Updating...' : 'Update'}
      </button>
    </form>
  
    {error && <p className={styles.error}>{error}</p>}
  </div>
  
  );
}
