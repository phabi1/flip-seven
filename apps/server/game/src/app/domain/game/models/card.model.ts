import { ISerializable } from '../interfaces/serializable.interface';

export class Card implements ISerializable {
  private type: string = '';
  private value: string = '';

  constructor(type: string = '', value: string = '') {
    this.type = type;
    this.value = value;
  }

  getType(): string {
    return this.type;
  }

  setType(type: string) {
    this.type = type;
  }

  getValue(): string {
    return this.value;
  }

  setValue(value: string) {
    this.value = value;
  }

  isEquals(card: Card): boolean {
    return this.type === card.getType() && this.value === card.getValue();
  }

  serialize() {
    return {
      type: this.type,
      value: this.value,
    };
  }
  unserialize(data: any): void {
    this.type = data.type;
    this.value = data.value;
  }
}
