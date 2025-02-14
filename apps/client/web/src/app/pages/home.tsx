import { useEffect } from 'react';
import { socket } from '../../socket';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  let navigate = useNavigate();

  useEffect(() => {
    socket.on('createGame', ({ id }) => {
      navigate('/game/' + id);
    });
    return () => {
      socket.off('createGame');
    };
  }, []);

  function createGame() {
    socket.emit('createGame');
  }
  return (
    <div>
      <h1>Welcome to client-web!</h1>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">Join</div>
        <div className="flex-1">
          <button onClick={() => createGame()}>Create Game</button>
        </div>
      </div>
    </div>
  );
}
