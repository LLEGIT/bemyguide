export enum UserRegisterField {
  AVATAR = "avatar",
  USERNAME = "username",
  FIRSTNAME = "firstname",
  LASTNAME = "lastname",
  PHONENB = "phone_nb",
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRMPASSWORD = "confirm_password",
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface User {
  _id: string;
  avatar: string | Buffer | File | null | undefined;
  username: string;
  firstname: string;
  lastname: string;
  phone_nb: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRegister {
  avatar: string | Buffer | File | null | undefined;
  username: string;
  firstname: string;
  lastname: string;
  phone_nb: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface UserIdAndEmail {
  _id?: string;
  email: string;
}

export const UserInitialViewState: UserRegister = {
  avatar: undefined,
  username: "",
  firstname: "",
  lastname: "",
  phone_nb: "",
  email: "",
  password: "",
  confirm_password: "",
};

export enum UserLoginField {
  EMAIL = "email",
  PASSWORD = "password",
}

export interface UserLogin {
  email: string;
  password: string;
}

export const UserLoginInitialViewState: UserLogin = {
  email: "",
  password: "",
};

export interface UserContext extends User {
  id: string;
}

export interface UserLoggedIn {
  loggedIn: boolean;
  user?: UserContext;
}

export interface UserProfile {
  _id: string;
  avatar: Buffer | string | null | undefined;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_nb: number;
  password: string;
  old_password?: string;
  new_password?: string;
  initial_password?: string;
}

export interface OtherUser extends UserProfile {
  createdAt: Date;
}

export interface GoogleUser {
  email: string;
  username: string;
}

export interface GoogleTokenDecoded {
  aud: string;
  azp: string;
  email: string;
  email_verified: string;
  exp: number;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  locale: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}
