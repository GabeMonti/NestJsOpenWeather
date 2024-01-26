export class UserWithoutPassword {
  id: number;
  username: string;
  createDate: any;
  updatedDate: any;
  lastLogin: any;
  hashRefreshToken: string;
}

export class UserM extends UserWithoutPassword {
  password: string ;
}
