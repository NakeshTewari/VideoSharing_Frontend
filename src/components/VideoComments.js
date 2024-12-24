import React from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react';
import { io } from "socket.io-client";

const VideoComments = ({video,currentUser,socket,ownerName, subscriberCount}) => {
  const [comment, setComment] = useState("");
  const [commentArray, setCommentArray] = useState([]);
  const [oldCommentArray, setOldCommentArray]= useState([]);

  const accessToken = localStorage.getItem("accessToken");
  const username=localStorage.getItem("username");

  const date=new Date(video.createdAt);
  const formattedDate = date.toLocaleDateString('en-US'); 
  const formattedTime = date.toLocaleTimeString('en-US')

  useEffect(() => {
    if (video) {
      axios.post(`https://videosharing-platform-backend.onrender.com/comment/api/getComments`, {
        videoId: video._id,
      }).then((res) => {
        if (res.data.msg) {
          setCommentArray(res.data.msg); // Directly set the fetched comments
        }
      });
    }
  }, [video]);
  


  async function handleComment(e) {
    e.preventDefault();

    
     if(socket && video && currentUser && comment.trim()){
      socket.emit("send-comment", {
        videoId:video._id,
        userId: currentUser._id,
        content: comment,
        fullName: currentUser.fullName,
      })

      //making call for every new comment
      //  axios.post("http://localhost:4000/comment/api/addComment",{
      //   videoId:video._id,
      //   userId: currentUser._id,
      //   text: comment,
      // }).then((res)=> console.log(JSON.stringify(res),".........................................."));
     

      // console.log(video, currentUser.fullName, socket);
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
      "https://videosharing-platform-backend.onrender.com/subscription/api/subscription",
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
            <h1>{video.title}</h1>
            <div class="video-info">
              <div class="avatar">V</div>
              <div class="channel-info">
                <div class="channel-name">{ownerName}</div>
                <div class="subscribers">{subscriberCount} subscribers</div>
              </div>
              <button class="subscribe-button" onClick={handleSubscription}>
                Subscribe
              </button>
            </div>
            <div class="video-details">
              <div class="views">Description</div>
              <div class="description">
                {video.description}
              </div>
              <div class="discord-info">
                <i class="fab fa-discord"></i>
                <span>more</span>
                <span class="views-date">12,793 views • {formattedDate}</span>
              </div>
            </div>
            <div class="video-actions">
  
              <div class="action">
                <i class="fas fa-share"></i> Share
              </div>
            </div>
            <div class="comments-section">
              <div class="comments-header">{commentArray.length} Comments</div>
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
                          {msg.fullName} {msg.timeStamp}
                        </div>
                        <div class="comment-text">{msg.content} {msg.text}</div>
                        <div class="comment-actions">
                          <i class="fas fa-thumbs-up"></i> Likes 0
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
