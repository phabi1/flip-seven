import { setup } from '@flip-seven/libs-client-game';
import { Game } from 'phaser';
import { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../../../socket';

export default function GamePlay() {
  let { gameId } = useParams();
  let game: Game | null = null;

  useLayoutEffect(() => {
    if (!gameId) {
      return;
    }

    if (game) {
      game.destroy(true);
    }
    game = setup(gameId, socket, 'game');
    if (!game) {
      return;
    }
    return () => {
      if (game) {
        game.destroy(true);
      }
    };
  }, [gameId]);

  return (
    <div>
      <div id="game"></div>
    </div>
  );
}
