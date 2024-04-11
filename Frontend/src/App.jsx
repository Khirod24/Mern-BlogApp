import './App.css'
import { useState,useEffect } from 'react'
import axios from 'axios';

export default function App() {
  
  const[posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({title:'', content:''});

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
            </li>
          ))}
        </ul>
        </div>
      </div>
  )
}


