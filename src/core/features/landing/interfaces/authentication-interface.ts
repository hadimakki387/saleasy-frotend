export interface LoginInterface {
  email: string;
  password: string;
}

export interface RegisterInterface {
  phoneNumber: string;
  countryCode: string;
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
