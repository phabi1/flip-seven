import { ISerializable } from '../interfaces/serializable.interface';

export class Player implements ISerializable {
  private id!: string;
  private name: string = '';
  private points = 0;

  getId(): string {
    return this.id;
  }

  setId(id: string) {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getPoints(): number {
    return this.points;
  }

  setPoints(points: number) {
    this.points = points;
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      points: this.points,
    };
  }

  unserialize(data: any): void {
    this.id = data.id;
    this.name = data.name;
    this.points = data.points;
  }
}
