import { BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import SignInUp from './components/SignInUp';
import UserProfile from './components/UserProfile';
import Post from './components/Post';
import FriendRequest from './components/FriendRequest';
import UserPost from './components/UserPost';
import { useWebSocket } from './components/WebSocketProvider';
import { useEffect } from 'react';
import { useAppSelector } from './store/hooks';
import Photos from './components/Photos';
import SearchView from './components/SearchView';

interface WaitSocket {
  socket: WebSocket | null | undefined,
  callback: () => void
}

function App() {
  const { ws, wsMessage, wsNoti, wsOnlineUser } = useWebSocket() || {};
  const { authUser } = useAppSelector((state) => state.auth)

  const waitForSocketConnection = ({ socket, callback }: WaitSocket) => {
    setTimeout(
      function () {
        if (socket && socket.readyState === 1) {
          if (callback != null) {
            callback();
          }
        } else {
          waitForSocketConnection({ socket, callback });
        }

      }, 5);
  }

  useEffect(() => {
    const online = () => {
      console.log('you are online');
      waitForSocketConnection({
        socket: ws, callback: function () {
          if (ws) {
            ws.send(JSON.stringify({
              type: 'login',
              userId: authUser?.id
            }))
            // console.log('send online status')
          }
        }
      })
    }
    const offline = () => {
      console.log('you are offline');
      waitForSocketConnection({
        socket: ws, callback: function () {
          if (ws) {
            ws.send(JSON.stringify({
              type: 'login',
              userId: authUser?.id
            }))
            // console.log('send offline status')
          }
        }
      })
    }
    const clear = () => { }

    window.addEventListener('focus', online)
    window.addEventListener('blur', offline);
    return () => {
      window.removeEventListener('focus', clear);
      window.removeEventListener('blur', clear);
    };
  }, [wsOnlineUser])

  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<Post />} />
        <Route path="/friend" element={<FriendRequest />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/post/:userpostId" element={<UserPost />} />
        <Route path="/search" element={<SearchView />} />
      </Route>
      <Route path='sign-in' element={<SignInUp />} />
      <Route path='profile/:profileId' element={<UserProfile />} />
    </Routes>
  );
}

export default App;
