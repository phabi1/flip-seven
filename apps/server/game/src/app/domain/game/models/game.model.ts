import EventEmitter from 'events';
import { ISerializable } from '../interfaces/serializable.interface';
import { Card } from './card.model';
import { Deck } from './deck.model';
import { Handle } from './handle.model';
import { Player } from './player.model';

export class Game extends EventEmitter implements ISerializable {
  private id: string = '';
  private status: 'waiting' | 'running' | 'closed' = 'waiting';
  private players: Player[] = [];
  private deck: Deck = new Deck();
  private handles: Map<string, Handle> = new Map();
  private direction: 'clockwise' | 'counter-clockwise' = 'clockwise';
  private currentPlayerIndex = 0;

  getId(): string {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
  }

  getPlayers(): ReadonlyArray<Player> {
    return this.players;
  }

  addPlayer(player: Player): Player {
    if (!player.getId()) {
      player.setId(this.generateUuid());
    }
    this.players.push(player);
    return player;
  }

  removePlayer(player: Player) {
    this.players = this.players.filter((p) => p !== player);
  }

  start() {
    const cards = this.generateCards();
    this.deck.setCards(cards);
    this.deck.shuffle();

    this.players.forEach((player) => {
      const handle = new Handle();
      handle.setPlayer(player);
      handle.setCards([]);
      this.handles.set(player.getId(), handle);
    });

    this.currentPlayerIndex = 0;
    this.status = 'running';
  }

  nextTurn() {
    if (this.direction === 'clockwise') {
      this.currentPlayerIndex++;
    } else {
      this.currentPlayerIndex--;
    }
    if (this.currentPlayerIndex >= this.players.length) {
      this.currentPlayerIndex = 0;
    }
    if (this.currentPlayerIndex < 0) {
      this.currentPlayerIndex = this.players.length - 1;
    }
    this.emit('turn', this.players[this.currentPlayerIndex]);
  }

  private generateCards(): Card[] {
    const cards: Card[] = [];
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let number of numbers) {
      for (let i = 0; i < number; i++) {
        cards.push(new Card('number', number.toString()));
      }
    }
    return cards;
  }

  private generateUuid(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  serialize() {
    return {
      id: this.id,
      status: this.status,
      players: this.players.map((p) => p.serialize()),
      deck: this.deck.serialize(),
      handles: Array.from(this.handles.values()).map((h) => h.serialize()),
      direction: this.direction,
    };
  }
  unserialize(data: any): void {
    this.id = data.id;
    this.status = data.status;
    this.players = data.players.map((p: any) => {
      const player = new Player();
      player.unserialize(p);
      return player;
    });

    this.deck = new Deck();
    this.deck.unserialize(data.deck);

    this.handles = new Map();
    data.handles.forEach((h: any) => {
      const player = this.players.find((p) => p.getId() === h.playerId);
      if (!player) {
        throw new Error('Player not found');
      }
      const handle = new Handle();
      handle.unserialize(h);
      handle.setPlayer(player);
      this.handles.set(player.getId(), handle);
    });
    this.direction = data.direction;
  }
}
