import { Optional } from 'sequelize';

export interface GroupAttributes {
  id: string;
  name: string;
  permissions: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
export interface GroupInput extends Optional<GroupAttributes, 'createdAt' | 'updatedAt'> {}
export interface GroupOutput extends Required<GroupAttributes> {}
