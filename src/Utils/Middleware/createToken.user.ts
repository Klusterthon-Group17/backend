import { UserObject } from "../../Interfaces/jwt.dao";
const createTokenUser = (user: UserObject): UserObject => {
    return { email: user.email, id: user.id };
  };
  
  export {createTokenUser };