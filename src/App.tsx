import { BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import SignInUp from './components/SignInUp';
import UserProfile from './components/UserProfile';
import Post from './components/Post';
import FriendRequest from './components/FriendRequest';
import UserPost from './components/UserPost';


function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Post />} />
        <Route path="/friend" element={<FriendRequest />} />
        <Route path="/post/:userpostId" element={<UserPost />} />
      </Route>
      <Route path='sign-in' element={<SignInUp />} />
      <Route path='profile/:profileId' element={<UserProfile />} />
    </Routes>
  );
}

export default App;
