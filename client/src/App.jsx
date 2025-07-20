import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Landing from './pages/Landing';
import Feed from './pages/Feed';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NewPost from './pages/NewPost';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Landing />}/>
          <Route path='/feed' element={<Feed />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<SignUp />}/>
          <Route path='/newpost' element={<NewPost />}/>
          <Route path='/profile' element={<Profile />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;