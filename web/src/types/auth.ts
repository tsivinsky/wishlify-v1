export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type RegisterData = {
  email: string;
  username: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};
