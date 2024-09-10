export interface LoginInterface {
  email: string;
  password: string;
}

export interface RegisterInterface {
  email: string;
  password: string;
  name: string;
}

export interface AuthenticationResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  isDeactivated: boolean;
  email: string;
  name: string;
  role: string;
  token: string;
}
