import {Model} from 'objection';

export default class User extends Model {
  static tableName = 'users';
  id!: number;
  email!: string;
  password!: string;
  verificationToken!: string;
  isVerified!: boolean;
  verified!: Date;
  token!: string;
  passwordToken?: string | null;
  passwordTokenExpirationDate?: Date | null;
  createdAt!: Date;
  updatedAt!: Date;
}

  