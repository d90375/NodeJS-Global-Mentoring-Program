import { DataTypes, Model, Sequelize, UUIDV4 } from 'sequelize';
import { UserAttributes, UserInput } from './user.types';

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: string;

  public login!: string;

  public password!: string;

  public age!: number;

  public isDeleted!: boolean;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

const createUserModel = (sequelize: Sequelize) =>
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      login: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ['password'] },
      },
      scopes: {
        withPassword: { attributes: undefined },
      },
      sequelize,
      tableName: 'Users',
    },
  );

export default createUserModel;
