import { useState } from 'react';
import Articles from './components/Articles'
import Home from './components/Home';
import React from 'react';
import Nav from './components/Nav';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SingleArticle from './components/SingleArticle';

function App() {
 
  return (
   <main>
    <Nav/>
    <Routes>
      <Route path='/' element={ <Home/> }></Route>
      <Route path='/articles' element={<Articles/>}></Route>
      <Route path="/articles/:article_id" element={<SingleArticle />} />
    </Routes>
    
   </main>
  )
}

export default App
