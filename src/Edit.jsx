import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '../Recoil/login.atom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "../Styles/edit.module.css";

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
    if (!file) return;

    const formData = new FormData();
    formData.append('coverImage', file);

    setLoading(true);
    setError(null);

    try {
      const result = await axios.patch(`${baseUrl}/api/v1/users/updatecoverimage`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${auth.accessToken}`,
        },
      });

      if (result.status === 200) {
        navigate(-1);
      }
    } catch (error) {
      setError('Failed to upload image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDetailsUpdate = async (e) => {
    e.preventDefault();
    if (!email || !fullName) return;

    setLoading(true);
    setError(null);

    try {
      const result = await axios.patch(
        `${baseUrl}/api/v1/users/updatedetails`,
        {
          email,
          fullName,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        }
      );

      if (result.status === 200) {
        navigate(-1);
      }
    } catch (error) {
      setError('Failed to update details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h2>Update Cover Image</h2>
        <form onSubmit={updateCoverImage}>
          <label htmlFor="cover" className={styles.label}>Upload New Cover Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            id="cover"
            className={styles.fileInput}
          />
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>

      <div className={styles.formSection}>
        <h2>Update Personal Details</h2>
        <form onSubmit={handleDetailsUpdate}>
          <label htmlFor="fullName" className={styles.label}>Full Name</label>
          <input
            type="text"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={styles.input}
            id="fullName"
          />

          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Update Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            id="email"
          />

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
