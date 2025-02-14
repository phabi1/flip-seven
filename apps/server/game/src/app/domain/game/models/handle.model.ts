import { ISerializable } from '../interfaces/serializable.interface';
import { Card } from './card.model';
import { Player } from './player.model';

export class Handle implements ISerializable {
  private cards: Card[] = [];
  private player?: Player;

  getCards(): ReadonlyArray<Card> {
    return this.cards;
  }

  setCards(cards: Card[]) {
    this.cards = cards;
  }

  addCard(card: Card) {
    this.cards.push(card);
  }

  removeCard(card: Card) {
    this.cards = this.cards.filter((c) => c !== card);
  }

  getPlayer(): Player {
    if (this.player === undefined) {
      throw new Error('Player is not set');
    }
    return this.player;
  }

  setPlayer(player: Player) {
    this.player = player;
  }

  calculatePoints(): number {
    return this.cards.reduce((acc, c) => {
      if (c.getType() === 'number') {
        return acc + parseInt(c.getValue(), 10);
      }
      return acc;
    }, 0);
  }

  serialize() {
    return {
      cards: this.cards.map((c) => c.serialize()),
      playerId: this.player?.getId(),
    };
  }
  unserialize(data: any): void {
    this.cards = data.cards.map((c: any) => {
      const card = new Card();
      card.unserialize(c);
      return card;
    });
    this.player = data.player;
  }
}
