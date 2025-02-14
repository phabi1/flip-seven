import { ISerializable } from '../interfaces/serializable.interface';
import { Card } from './card.model';

export class Deck implements ISerializable {
  private cards: Card[] = [];

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

  shiftCard(): Card {
    return this.cards.shift()!;
  }

  shuffle() {
    this.cards = this.cards.sort(() => Math.random() - 0.5);
  }

  serialize() {
    return {
      cards: this.cards.map((c) => c.serialize()),
    };
  }
  unserialize(data: any): void {
    this.cards = data.cards.map((c: any) => {
      const card = new Card();
      card.unserialize(c);
      return card;
    });
  }
}
