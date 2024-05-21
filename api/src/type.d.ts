import {Model} from "mongoose";
import {WebSocket} from "ws";
import Types = module;

export interface User {
  email: string,
  password: string,
  token: string,
  role: string,
  avatar: string | null,
  displayName: string,
  googleID: string | null;
}

export interface UserApi extends User {
  _id: Types.ObjectId;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>,
  generateToken(): void,
}

export type UserModel = Model<User, unknown, UserMethods>;


export interface MessageFront {
  message: string;
  userId: Types.ObjectId;
  datetime: string;
}

export interface MessageApi extends MessageFront {
  _id: Types.ObjectId;
}

export interface UserOnline {
  displayName: string;
  _id: string;
  avatar: string | null;
  googleID: string | null;
}

export interface ActiveConnections {
  [id: string]: WebSocket
}