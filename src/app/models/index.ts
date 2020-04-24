export interface Item {
  id: number;
  name: string;
  email: string;
  password: string;
  created: number;
}

export interface Person {
  id: string;
  name: string;
  relationship: string;
  age: number;
  phone: string;
  avatar: string;
  mission: string;
  mission_color: string;
  mission_label_color: string;
  register_date: string;
  challenges: Array<any>;
}
