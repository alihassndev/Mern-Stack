export interface Info {
  id: number;
  name: string;
  email: string;
}

export interface AdminInfo extends Info {
  isAdmin: boolean;
}
