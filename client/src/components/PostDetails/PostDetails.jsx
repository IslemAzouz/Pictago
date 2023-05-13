import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PostDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';

const PostDetails = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [comments, setComments] = useState([]);
  const[commentBody,setCommentBody]=useState("")


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pins/${props.post.ID_post}/comments`);
        setComments(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [props.post.ID_post],comments);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

 

  const handleDeleteClick = async (ID_post) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/deletePost/${props.post.ID_post}`);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

    const handleCommentPost = async () => {
      try {
        const response = await axios.post(`http://localhost:5000/posts/${props.post.ID_post}/comments`, { body: commentBody });
        setComments([...comments, response.data]);
        setCommentBody("");
        
      } catch (error) {
        console.error(error);
      }
    };

    const handleCommentDelete = async (ID_comment) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
       if (confirmDelete) {
      try{
        await axios.delete(`http://localhost:5000/deleteComment/${ID_comment}/comments`);
      } catch(error){
        console.error(error);
      }
    }
  }

  return (
    <div className="post-details-container">
      <div className="post-actions">
        <button className="dropdown-btn" onClick={handleMenuClick}>
          <img src="/assets/images/dots.png" alt="menu" />
        </button>
        {showMenu && (
         <div className="dropdown-menu">
         <Link to={`/update/${props.post.ID_post}`} className="dropdown-menu-button">Edit</Link>
         <button onClick={handleDeleteClick} className="dropdown-btn">Delete</button>
       </div>
       
        )}
      </div>
      <div className="post-image">
        <img src={props.post.image_url} alt={props.post.title} />
      </div>
      <div className="post-content">
        <div className="post-header">
          <h2>{props.post.title}</h2>
        </div>
        <div className="post-date">
          Posted on {new Date(props.post.created_at).toLocaleDateString()}
        </div>
        <div className="post-category">
      Category: {props.post.category}
    </div>
        <p>{props.post.description}</p>
        <h1>Comments</h1>

        <div className="comments">
        {comments.map((comment, i) => (
  <div key={i} className="comment">
    <div className="user">user:</div>
    <div className="comment-text styled-comment">{comment.body}</div>
    <div className="icons">
      <button onClick={() => handleCommentDelete(comment.ID_comment)}> 
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <div className="icon-space"></div>
      <button > 
        <FontAwesomeIcon icon={faPen} />
      </button>
    </div>
  </div>
))}
</div>
<div className="comment-input">
  <input type="text" placeholder="Add a comment" onChange={(event) => setCommentBody(event.target.value)} />
  <button onClick={handleCommentPost}>Post</button>
</div>
      </div>
    </div>
  );
};

export default PostDetails;