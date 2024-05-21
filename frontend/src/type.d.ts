export interface RegisterMutation {
  email: string;
  password: string;
  avatar: File | null;
  displayName: string;
}

export interface LoginMutation {
  email: string;
  password: string;
}
export interface User {
  _id: string;
  email: string;
  token: string;
  role: string,
  avatar: string | null,
  displayName: string,
  googleID: string | null;
}

export interface RegisterResponse {
  user: User;
  massage: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}


export interface OnlineUser {
  displayName: string;
  _id: string;
  avatar: string | null;
  googleID: string | null;
}


export interface MessageApi {
  _id: string;
  message: string;
  datetime: string;
  userId: OnlineUser;
}

export interface IncomingWelcomeChat {
  type: 'WELCOME';
  payload: MessageApi[];
}
export interface IncomingChatMessage {
  type: 'NEW_MESSAGE';
  payload: MessageApi;
}

export interface IncomingOnlineUsers {
  type: "SET_ONLINE_USERS";
  payload: OnlineUser[];
}

export interface IncomingNewMessage {
  type: "NEW_MESSAGE",
  payload: MessageApi,
}

export type IncomingMessage = IncomingChatMessage | IncomingWelcomeChat | IncomingOnlineUsers;




