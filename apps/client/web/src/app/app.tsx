import { useEffect, useState } from 'react';
import { socket } from '../socket';
import ConnectionState from './components/socket/connection-state';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import GameCreate from './pages/game/create';
import GamePlay from './pages/game/play';

export default function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/create" element={<GameCreate />} />
          <Route path="/game/:gameId" element={<GamePlay />} />
        </Routes>
      </BrowserRouter>
      <ConnectionState isConnected={isConnected} />
    </div>
  );
}
