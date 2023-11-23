import { Response } from 'express';
import IUser from './user.type';
import User from '../Models/user.model';

export interface jwtToken {
    user_id : number,
    lat: number,
    exp: number
}


export interface Payload  {
  user: User;
  refresh_token: string;
};

  
 export  type CreateJWT = {
    payload: Payload;
  };
export interface AttachCookiesToResponse  {
    res: Response;
    user: UserObject;
    refresh_token: string;
  };

  export interface UserObject {
    id: number;
    email: string;
  }
  export interface CreateJWTPayload {
      id: number;
      user_name: string;
      refresh_token?: string;
  }

  export interface LogoutPAyload{
    id: number
  }