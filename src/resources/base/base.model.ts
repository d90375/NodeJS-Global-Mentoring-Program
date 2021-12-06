import { Sequelize } from 'sequelize';
import CONFIG from '../../common/config';
import logger from '../../common/logger.config';

import createGroupModel from '../group/group.model';
import createUserModel from '../user/user.model';

export const db = new Sequelize({
  database: CONFIG.DATABASE_NAME,
  username: CONFIG.DATABASE_USERNAME,
  password: CONFIG.DATABASE_PASSWORD,
  host: CONFIG.DATABASE_HOST,
  port: (CONFIG.DATABASE_PORT as number | undefined) || 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // This will help you. But you will see nwe error
      rejectUnauthorized: false, // This line will fix new error
    },
  },
  logging: (msg) => logger.debug(msg),
});

const Models = {
  UserModel: createUserModel(db),
  GroupModel: createGroupModel(db),
};

Models.GroupModel.belongsToMany(Models.UserModel, {
  through: 'UserGroup',
  as: 'users',
  foreignKey: 'groupId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Models.UserModel.belongsToMany(Models.GroupModel, {
  through: 'UserGroup',
  as: 'groups',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

export default Models;
