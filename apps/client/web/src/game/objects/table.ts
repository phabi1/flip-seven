import { Player } from './player';

export class Table {
  private scene: Phaser.Scene;
  private players: Player[] = [];
  private mainPlayerId: string = '';

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  setMainPlayerId(id: string) {
    this.mainPlayerId = id;
  }

  setPlayers(players: any[]) {
    players.forEach((player) => {
      const p = new Player(this.scene, 0, 0, player.name);
      this.players.push(p);
    });

    this.arrangeTable();
  }

  getMainPlayer() {
    return this.players.find(
      (player) => player.data.get('playerId') === this.mainPlayerId
    );
  }

  arrangeTable() {
    const totalPlayers = this.players.length;
    const radius = 200;
    const angle = (2 * Math.PI) / totalPlayers;

    this.players.forEach((player, index) => {
      const x = Math.cos(angle * index) * radius;
      const y = Math.sin(angle * index) * radius;
      player.setPosition(x, y);
    });

    const mainPlayer = this.getMainPlayer();
    if (mainPlayer) {
      mainPlayer.setPosition(0, 0);
    }
  }
}
