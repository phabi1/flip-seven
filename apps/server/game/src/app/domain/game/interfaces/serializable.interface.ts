export interface ISerializable {
  serialize(): any;
  unserialize(data: any): void;
}
