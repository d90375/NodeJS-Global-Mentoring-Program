import { Op } from 'sequelize';
import Models from '../base/base.model';
import { UserInput, UserOutput } from './user.types';

const getAutoSuggestUsers = async (
  loginSubstring: string,
  limit: number,
): Promise<UserOutput[]> => {
  let whereOption;

  if (loginSubstring) {
    whereOption = {
      login: { [Op.iLike]: `${loginSubstring}%` },
    };
  }
  const sortedUsers = await Models.UserModel.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: {
      model: Models.GroupModel,
      as: 'groups',
      attributes: ['id', 'name', 'permissions'],
      through: {
        attributes: [],
      },
    },
    order: ['login'],
    where: whereOption,
    limit,
  });

  return sortedUsers;
};

const create = async (user: UserInput) => Models.UserModel.create(user);

const update = async (id: string, user: UserInput): Promise<UserOutput | null | undefined> => {
  const currentUser = await Models.UserModel.findByPk(id, {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: {
      model: Models.GroupModel,
      as: 'groups',
      attributes: ['id', 'name', 'permissions'],
      through: {
        attributes: [],
      },
    },
  });

  return currentUser?.update(user);
};

const getById = async (id: string): Promise<UserOutput | null> =>
  Models.UserModel.findByPk(id, {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: {
      model: Models.GroupModel,
      as: 'groups',
      attributes: ['id', 'name', 'permissions'],
      through: {
        attributes: [],
      },
    },
  });

const getByLogin = async (login: string): Promise<UserOutput | null> =>
  Models.UserModel.findOne({ where: { login } });

const getByLoginWithPassword = async (login: string): Promise<UserOutput | null> =>
  Models.UserModel.scope('withPassword').findOne({ where: { login } });

const remove = async (id: string): Promise<void> => {
  Models.UserModel.destroy({ where: { id } });
};

const userRepository = {
  create,
  update,
  getById,
  remove,
  getAutoSuggestUsers,
  getByLoginWithPassword,
  getByLogin,
};

export default userRepository;
