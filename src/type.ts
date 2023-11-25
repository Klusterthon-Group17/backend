import { MaybeCompositeId } from "objection";
import IUser from "./Interfaces/user.type";

type PartialUser = Partial<Omit<IUser, 'id'>> ;
type UserId = number & MaybeCompositeId;
type RegisterInterface = {
  email: string;
  password: string;
  confirmPassword: string;
  verificationToken: string;
};
export {PartialUser, UserId, RegisterInterface};