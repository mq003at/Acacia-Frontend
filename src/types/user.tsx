export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'customer';
  avatar: string;
  creationAt?: string;
  updatedAt?: string;
}

export interface UserReducer {
  userList?: string[];
  currentUser?: User;
  accessToken?: Token;
  specialToken?: Token;
}

export interface AccountCredential {
  email: string;
  password: string;
  purpose?: string;
}

export interface AccountCredentialResponse {
  accessToken: Token,
  specialToken?: Token, 
  user: User;
}

export interface Token {
  token: string;
  expiration: string;
  purpose?: string;
}
