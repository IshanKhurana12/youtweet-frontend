import React, { useState, useEffect } from 'react';
import ReactPlayer from "react-player";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { authState } from '../Recoil/login.atom';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import styles from "../Styles/VideoPlayer.module.css";
import { issubscribed } from '../Recoil/subscribe.atom';
import { unsubscribed } from '../Recoil/unsubscribe.atom';
import { subSelector } from '../Recoil/subscribe.selector';
import { unsubSelector } from '../Recoil/unsubscribe.selector';

export default function Videoplayer() {
    const [video, setVideo] = useState(null);
    const [auth] = useRecoilState(authState);
    const [comments, setComments] = useState([]);
    const [subscribe, setSubscribe] = useRecoilState(issubscribed);
    const [localSub, setLocalSub] = useState(false);
    const [unsub, setUnsub] = useRecoilState(unsubscribed);
    const [add, setAdd] = useState("");
    const { id } = useParams();

    // Fetch video data
    useEffect(() => {
        async function fetchVideo() {
            try {
                const result = await axios.get(`http://localhost:3000/api/v1/video/getsinglevideo/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${auth.accessToken}`
                    }
                });
                if (result) {
                    setVideo(result.data);
                }
            } catch (error) {
                console.error("Error fetching video data:", error);
            }
        }

        fetchVideo();
    }, [id, auth.accessToken]);

    // Add comment
    const addComment = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(`http://localhost:3000/api/v1/comments/add/${id}`, {
                comment: add
            }, {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`
                }
            });
            if (result) {
                setAdd("");
                fetchComments(); // Fetch comments again to include the new comment
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    // Fetch comments
    const fetchComments = async () => {
        try {
            const result = await axios.get(`http://localhost:3000/api/v1/video/getallcomments/${id}`, {
                headers: {
                    'Authorization': `Bearer ${auth.accessToken}`
                }
            });
            if (result) {
                setComments(result.data.data);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    // Fetch subscription status
    useEffect(() => {
        if (video) {
            const getStatus = async () => {
                try {
                    const result = await axios.post("http://localhost:3000/api/v1/sub/getstatus", {
                        channelId: video.data.owner._id
                    }, {
                        headers: {
                            'Authorization': `Bearer ${auth.accessToken}`
                        }
                    });
                    if (result) {
                     
                        setLocalSub(result.data.data.isSubscribed);
                    }
                } catch (error) {
                    console.error("Error fetching subscription status:", error);
                }
            };

            getStatus();
            fetchComments();
        }
    }, [video]);

    // Subscribe logic
    const subLoadable = useRecoilValueLoadable(subSelector);
    const subscribeTo = async (channelId) => {
        try {
            await setSubscribe({
                issubscribed: true,
                channelId: channelId
            });
            if (subLoadable) {
                setLocalSub(true);
            }
        } catch (error) {
            console.error("Error subscribing:", error);
        }
    };

    // Unsubscribe logic
    const unsubLoadable = useRecoilValueLoadable(unsubSelector);
    const unsubscribeTo = async (channelId) => {
        try {
            await setUnsub({
                issubscribed: false,
                channelId: channelId
            });
            if (unsubLoadable) {
                setLocalSub(false);
            }
        } catch (error) {
            console.error("Error unsubscribing:", error);
        }
    };

    return (
        <div className={styles.container}>
            {video && (
                <div className={styles.playerWrapper}>
                    <ReactPlayer 
                        url={video.data.videoFile} 
                        className={styles.reactPlayer}
                        controls 
                    />
                    <div className={styles.detailsWrapper}>
                        <h1 className={styles.title}>{video.data.title}</h1>
                        <p className={styles.description}>{video.data.description}</p>
                        <div className={styles.userInfo}>
                            <img src={video.data.owner.avatar} alt={video.data.owner.username} className={styles.avatar} />
                            <h2 className={styles.username}>{video.data.owner.username}</h2>
                            {!localSub ? (
                                <button className={styles.subscribe} onClick={() => subscribeTo(video.data.owner._id)}>Subscribe</button>
                            ) : (
                                <button className={styles.unsubscribe} onClick={() => unsubscribeTo(video.data.owner._id)}>Unsubscribe</button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div>
                <form onSubmit={addComment}>
                    <input 
                        value={add} 
                        onChange={(e) => setAdd(e.target.value)} 
                        placeholder='Add a comment' 
                        className={styles.comm}
                        required 
                    />
                    <button type='submit'>Add</button>
                </form>
            </div>

            {comments.length > 0 && (
                <div className={styles.commentsContainer}>
                    <h3 className={styles.commentsTitle}>Comments</h3>
                    {comments.map((commentObj, index) => (
                        <div key={index} className={styles.comment}>
                            <div className={styles.userAvatar}>
                                <img src={commentObj.alluser.avatar} alt={commentObj.alluser.username} />
                            </div>
                            <div className={styles.commentContent}>
                                <div className={styles.userDetails}>
                                    <span className={styles.username}>{commentObj.alluser.username}</span>
                                </div>
                                <p className={styles.commentText}>{commentObj.allcomments.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
