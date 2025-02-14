import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { setup } from '../../../game/setup';

export default function Game() {
  let { gameId } = useParams();

  useEffect(() => {
    const game = setup('game');
    return () => {
      game.destroy(true);
    };
  }, [gameId]);

  return (
    <div>
      <div id="game"></div>
    </div>
  );
}
