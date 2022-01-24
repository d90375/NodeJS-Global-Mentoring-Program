import { DataTypes, HasManyAddAssociationMixin, Model, Sequelize, UUIDV4 } from 'sequelize';
import { UserInput } from '../user/user.types';
import { GroupAttributes, GroupInput } from './group.types';

class Group extends Model<GroupAttributes, GroupInput> implements GroupAttributes {
  public id!: string;

  public name!: string;

  public permissions!: string[];

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public addUsers!: HasManyAddAssociationMixin<UserInput, number>;
}

const createGroupModel = (sequelize: Sequelize) =>
  Group.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      permissions: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'Groups',
    },
  );

export default createGroupModel;
