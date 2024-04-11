import './App.css'
import { useState,useEffect } from 'react'
import axios from 'axios';

export default function App() {
  
  const[posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({title:'', content:''});
  const [selectedPost, setSelectedPost] = useState(null);
  const [updatedPostData,setUpdatedPostData] = useState({title:'',content:''});

  useEffect(()=>{
    axios.get('http://localhost:3000/api/posts')
    .then((res)=>{setPosts(res.data)})
    .catch((e)=>{console.error("error is:",e)});
  });

  const handleInputChange =(event)=>{
    const{name,value}=event.target;
    setNewPost({...newPost,[name]:value});
  }

  const handleSubmit = (event)=>{
    event.preventDefault();
    axios.post('http://localhost:3000/api/posts',newPost)
    .then((res)=>{setPosts([...posts,res.data]);
      setNewPost({title:'', content:''});
    })
    .catch((e)=>{console.error("error is: ",e)});
  }

  const handleGetPostById =(postId)=>{
    axios.get(`http://localhost:3000/api/posts/${postId}`)
    .then((res)=>{
      setSelectedPost(res.data);
      setUpdatedPostData({title:res.data.title, content:res.data.content})
    }).catch((err)=>{console.log("ERROR FETCHING POST IS : ",err)});
  };

  const handleUpdatePostById =(postId) =>{
    axios.put(`http://localhost:3000/api/posts/${postId}`, updatedPostData)
    .then((res)=>{
      const updatedPosts = posts.map(post=>{
        if(post._id===postId){return res.data};
        return post;
      })
      setPosts(updatedPosts);
      setSelectedPost(null);
      setUpdatedPostData({title:'', content:''});
    }).catch((err)=>{console.log("ERROR UPDATING POST: ",err)});
  }
  
  const handleDeletePost =(postId)=>{
    axios.delete(`http://localhost:3000/api/posts/${postId}`)
    .then(()=>{
      const updatedPosts = posts.filter(post=>{post._id!==postId});
      setPosts(updatedPosts);
      setSelectedPost(null);
    }).catch((err)=>{console.log('Error deleting post: ',err)})
  };

  return(
      <div className='container'>
        <div><h2>MERN BLOG APP</h2></div>
        <div>
        <h4>Create New Post...</h4>
        <form onSubmit={handleSubmit}>
          <input type='title' name='title' value={newPost.title} onChange={handleInputChange} required placeholder='TITLE'/>
          <textarea name='content' value={newPost.content} required placeholder='CONTENT' onChange={handleInputChange}/>
          <button type='submit'>$Create Post$</button>
        </form>
        </div>
        <div>
        <h2 className='allPost'> & ALL POSTS & </h2>
        <ul>
          {posts.map(post=>(
            <li key={post._id}>
            <h3 className='title'>{post.title}</h3>
            <p className='content'>{post.content}</p>
             
            <button onClick={() => handleGetPostById(post._id)} className='btn1'>View</button>
                     
         {/* Display selected post details */}
        {selectedPost && selectedPost._id === post._id && (
           <div>
          <h2>Selected Post</h2>
          <input
            type="text"
            name="title"
            value={updatedPostData.title}
            onChange={e => setUpdatedPostData({ ...updatedPostData, title: e.target.value })}
          />
          <textarea
            name="content"
            value={updatedPostData.content}
            onChange={e => setUpdatedPostData({ ...updatedPostData, content: e.target.value })}
          />
          <button onClick={() => handleUpdatePostById(post._id)} className='btn1'>Update</button>
          <button onClick={() => handleDeletePost(post._id)} className='btn1'>Delete</button>
      </div> 
      )} 
      </li>
      ))}
      </ul>
    </div>
  </div>
  )
}


