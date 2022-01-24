import { Op } from 'sequelize';
import { User } from './user.types';
import UserModel from './user.model';

const updatedFields = (obj: any) =>
  Object.keys(obj).filter((field) => !['password'].includes(field));

const getAutoSuggestUsers = async (loginSubstring: string, limit: number): Promise<User[]> => {
  let whereOption;

  if (loginSubstring) {
    whereOption = {
      login: { [Op.iLike]: `${loginSubstring}%` },
    };
  }
  const sortedUsers = await UserModel.findAll({
    order: ['login'],
    where: whereOption,
    limit,
  });

  return sortedUsers;
};

const create = async (user: User) => UserModel.create(user);

const update = async (id: string, user: User): Promise<User | null> => {
  const updatedUser = await UserModel.update(user, {
    where: { id },
    returning: true,
    fields: updatedFields(UserModel.rawAttributes),
  }).then(() => UserModel.findOne({ where: { id } }));

  return updatedUser;
};

const getById = async (id: string): Promise<User | null> =>
  UserModel.findOne({
    where: {
      id,
    },
  });

const getByLogin = async (login: string): Promise<User | null> =>
  UserModel.findOne({ where: { login } });

const remove = async (id: string): Promise<void> => {
  UserModel.destroy({ where: { id } });
};

const userRepository = {
  create,
  update,
  getById,
  remove,
  getAutoSuggestUsers,
  getByLogin,
};

export default userRepository;
