export interface ILoginRequestBody {
  password: string;
  userName: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
}
