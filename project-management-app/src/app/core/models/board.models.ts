export interface Board {
  title: string;
  owner: string;
  users: Array<string>;
}

export interface RawBoard {
  name: string;
  members: Array<string>;
}
