import React from 'react'
import axios from 'axios';
import { useEffect,useState } from 'react';
import { io } from "socket.io-client";
import { CgAddR } from "react-icons/cg";
import { AiTwotoneLike } from "react-icons/ai";

const VideoComments = ({video,currentUser,socket,ownerName, subscriberCount}) => {
  const [comment, setComment] = useState("");
  const [commentArray, setCommentArray] = useState([]);
  const [oldCommentArray, setOldCommentArray]= useState([]);
  const [count,setCount]=useState(subscriberCount);
  const [isAddedToPlaylist,setIsAddedToPlaylist]=useState(false);
  
  const accessToken = localStorage.getItem("accessToken");
  const username=localStorage.getItem("username");

  const date=new Date(video.createdAt);
  const formattedDate = date.toLocaleDateString('en-US'); 
  const formattedTime = date.toLocaleTimeString('en-US');

  // setCount(subscriberCount);

  useEffect(() => {
    if (video) {
      axios.post(`http://localhost:4000/comment/api/getComments`, {
        videoId: video._id,
      }).then((res) => {
        if (res.data.msg) {
          setCommentArray(res.data.msg); // Directly set the fetched comments
          console.log(JSON.stringify(res.data.msg))
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

      socket.on("add-subscription-count", ()=>{
        setCount(prevCount=> prevCount+1);
      })
    }
    
    // Clean up the listener on component unmount
    
  }, [socket]);

  async function handleSubscription(e) {
    e.preventDefault();

    if(socket && video && currentUser){

      socket.emit("send-subscription",{
        video_owner_id: video.owner,
        user_id: currentUser._id,
        video_id: video._id
      })

    }
  }

  async function handleLike(e){
    e.preventDefault();

    
  }

  async function handlePlaylist(){
   try {
    const addtoPlaylist= await axios.post(`http://localhost:4000/playlist/api/addVideoToPlaylist`,{videoId: video._id},
     {
       headers: {
         Authorization: `token ${accessToken}`,
       },
     }
    )
   // if(addtoPlaylist.status===404) alert("Create a playlist first");
    if(addtoPlaylist.status===200) 
     setIsAddedToPlaylist(true);
  
   } catch (error) {
    if(error.status===404)
      alert("Create a playlist first");
   
     
   }
    
  }

  return (
    <div className="container">
      <h1>{video.title}</h1>
      <div className="video-info">
        <div className="avatar">{ownerName}</div>
        <div className="channel-info">
          <div className="channel-name">{ownerName}</div>
          <div className="subscribers">{count} subscribers</div>
        </div>
        <button className="subscribe-button" onClick={(e) => handleSubscription(e)}>
          Subscribe
        </button>
      </div>
      <div className="video-details">
        <div className="views">Description</div>
        <div className="description">{video.description}</div>
        <div className="discord-info">
          <i className="fab fa-discord"></i>
          <span>more</span>
          <span className="views-date">12,793 views • {formattedDate}</span>
        </div>
      </div>
      <div className="video-actions">
        <div className="action" >
          <i className={`fas fa-thumbs-up `}>Like <button onClick={(e)=>handleLike(e)}><AiTwotoneLike /></button></i>  
        </div>
        <div className="action">
          <i> Add to Playlist</i>
          <button onClick={handlePlaylist}>
         <CgAddR /> 
          </button>
          {isAddedToPlaylist? (<div>Added Successfully</div>):(<div></div>)}
        </div>
      </div>
      <div className="comments-section">
        <div className="comments-header">{commentArray.length} Comments</div>
        <div className="add-comment">
          <div className="avatar">N</div>
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
              <div className="comment" key={index}>
                <div className="avatar">{msg.userId.username}</div>
                <div className="comment-content">
                  <div className="comment-info">
                    {msg.fullName} {msg.timeStamp}
                  </div>
                  <div className="comment-text">
                    {msg.content} {msg.text}
                  </div>
                  <div className="comment-actions">
                    <i className="fas fa-thumbs-up"></i> Likes 0
                    <i className="fas fa-thumbs-down"></i>
                    <span>Reply</span>
                  </div>
                </div>
                <div className="comment-options">
                  <i className="fas fa-ellipsis-h"></i>
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
