import { Model } from 'sequelize';

export type UserInstance = User & Model;

export type User = {
  id: number;
  uuid: string;
  login: string;
  password?: string;
  age: number;
  isDeleted: boolean;
};
