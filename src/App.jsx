import { useState, useEffect } from 'react';
import Articles from './components/Articles'
import Home from './components/Home';
import React from 'react';
import Nav from './components/Nav';
import Login from './components/Login';
import Topics from './components/Topics';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SingleArticle from './components/SingleArticle';

function App() {
 
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
   <main>
    <Nav user={user} setUser={setUser}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login setUser={setUser}/>}/>
      <Route path='/articles' element={<Articles/>}/>
      <Route path="/articles/:article_id" element={<SingleArticle user={user}/>} />
      <Route path="/topics" element={<Topics />} />
      <Route path="/topics/:topic_slug" element={<Articles />} />
    </Routes>
    
   </main>
  )
}

export default App
