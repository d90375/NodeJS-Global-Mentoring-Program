import { Optional } from 'sequelize';

export interface UserAttributes {
  id: string;
  login: string;
  password?: string;
  age: number;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserInput extends Optional<UserAttributes, 'createdAt' | 'updatedAt'> {}
export interface UserOutput extends Required<UserAttributes> {}
