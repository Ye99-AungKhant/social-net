import { BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import SignInUp from './components/SignInUp';
import UserProfile from './components/UserProfile';


function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />} />
      <Route path='sign-in' element={<SignInUp />} />
      <Route path='profile/:profileId' element={<UserProfile />} />
    </Routes>
  );
}

export default App;
