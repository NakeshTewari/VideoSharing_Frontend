# 📽️ Video Sharing Platform  

The Video Sharing Platform is a full-stack web application that enables users to upload, watch, and interact with videos in real-time. It provides a seamless video streaming experience with optimized delivery and caching mechanisms. Users can create accounts, manage their videos, engage in real-time discussions through comments, and build personalized playlists.  

The project is built using Node.js, Express, MongoDB, React.js, and WebSockets, integrating cloud-based solutions for storage and real-time features.

---

## 🚀 Features  
✅ Upload, and manage videos  
✅ Secure authentication (JWT)  
✅ Video streaming in chunks for smooth playback  
✅ Real-time comments using Socket.IO  
✅ Optimized video delivery via Amazon S3 + CDN  
✅ Redis caching for faster content loading  

---

## 📸 Screenshots  

### **SignUp Page**  
<img src="https://github.com/NakeshTewari/VideoSharing_Frontend/blob/main/src/pictures/signup.png?raw=true" alt="SignUp Page" width="600">

### **Home Page**  
<img src="https://github.com/NakeshTewari/VideoSharing_Frontend/blob/main/src/pictures/home.png?raw=true" alt="Home Page" width="600">

### **Upload Video**  
<img src="https://github.com/NakeshTewari/VideoSharing_Frontend/blob/main/src/pictures/upload.png?raw=true" alt="Upload Video" width="600">

### **Comment Section**  
<img src="https://github.com/NakeshTewari/VideoSharing_Frontend/blob/main/src/pictures/comments.png?raw=true" alt="Comment Section" width="600">

### **Playlist**  
<img src="https://github.com/NakeshTewari/VideoSharing_Frontend/blob/main/src/pictures/playlist.png?raw=true" alt="Playlist" width="600">

---

## 🛠 Tech Stack  
| **Category**  | **Technologies** |
|--------------|------------------|
| **Backend**  | Node.js, Express, MongoDB, Socket.IO, JWT |
| **Frontend** | React.js |
| **Storage**  | Cloudinary  |
| **Caching**  | LocalStorage |
| **Real-time** | WebSockets (Socket.IO) |

---
## 🛠 API Endpoints  
| **Category**  | **Endpoints** | **Description** |
|--------------|------------------|---------------|
| **POST**  | /api/auth/register |  Register a new user |
| **POST** | /api/auth/login | Login user |
| **POST**  | /api/videos/upload  | Upload a video |
| **GET**  | /api/videos/:id | Fetch video details |
| **DELETE** | 	/api/videos/:id | Delete a video |
| **POST** | 	/api/comments | 	Add a comment (real-time) |




---

## ⚙️ Installation & Setup 
 npm install
 npm start

### 1️⃣ Clone the repository  
```sh
git clone https://github.com/NakeshTewari/VideoSharing_Frontend.git
```
```sh
git clone https://github.com/NakeshTewari/VideoSharing_Platform_Backend.git
```


