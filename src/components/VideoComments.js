import React from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react';
import { io } from "socket.io-client";

const VideoComments = ({video,currentUser,socket}) => {
  const [comment, setComment] = useState("");
  const [commentArray, setCommentArray] = useState([]);

  const accessToken = localStorage.getItem("accessToken");
  const username=localStorage.getItem("username");


  async function handleComment(e) {
    e.preventDefault();

    
     if(socket && video && currentUser && comment.trim()){
      socket.emit("send-comment", {
        videoId:video._id,
        userId: currentUser._id,
        content: comment,
      })

      console.log(video, currentUser, socket);
     }
   
    setComment("");

  }

  useEffect(() => {
    if (socket) {
      // Listen for 'receive-comment' event
      
      
      socket.on("receive-comment", (newComment) => {
        console.log(newComment);
        // Update the commentArray state with the new comment
        setCommentArray((prevComments) => [...prevComments, newComment]);
      });
    }
    
    // Clean up the listener on component unmount
    
  }, [socket]);

  async function handleSubscription(e) {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:4000/subscription/api/subscription",
      {
        channel: video.owner,
      },
      {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      }
    );

    if (response.status === 200) alert(JSON.stringify(response.data.message));
  }

  return (
    <div class="container">
            <h1>How are videos streamed live on Youtube ?</h1>
            <div class="video-info">
              <div class="avatar">V</div>
              <div class="channel-info">
                <div class="channel-name">Nakesh Tewari</div>
                <div class="subscribers">12M subscribers</div>
              </div>
              <button class="subscribe-button" onClick={handleSubscription}>
                Subscribe
              </button>
            </div>
            <div class="video-details">
              <div class="views">12K views 2 years ago</div>
              <div class="description">
                Join the discord community to share more learnings on system
                design and distributed systems:
              </div>
              <div class="discord-info">
                <i class="fab fa-discord"></i>
                <span>/ discord</span>
                <span class="views-date">12,793 views • Jun 19, 2022</span>
              </div>
            </div>
            <div class="video-actions">
              <div class="action">
                <i class="fas fa-thumbs-up"></i> 357
              </div>
              <div class="action">
                <i class="fas fa-thumbs-down"></i>
              </div>
              <div class="action">
                <i class="fas fa-share"></i> Share
              </div>
              <div class="action">
                <i class="fas fa-ellipsis-h"></i>
              </div>
            </div>
            <div class="comments-section">
              <div class="comments-header">33 Comments</div>
              <div class="add-comment">
                <div class="avatar">N</div>
                <form action="" onSubmit={handleComment}>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button type="submit">Send-&gt;</button>
                </form>
              </div>

              <div>
                {commentArray.map((msg, index) => {
                  return (
                    <div class="comment" key={index}>
                      <div class="avatar">S</div>
                      <div class="comment-content">
                        <div class="comment-info">
                          {msg.userId} {msg.timeStamp}
                        </div>
                        <div class="comment-text">{msg.content}</div>
                        <div class="comment-actions">
                          <i class="fas fa-thumbs-up"></i> 0
                          <i class="fas fa-thumbs-down"></i>
                          <span>Reply</span>
                        </div>
                      </div>
                      <div class="comment-options">
                        <i class="fas fa-ellipsis-h"></i>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
  )
}

export default VideoComments
