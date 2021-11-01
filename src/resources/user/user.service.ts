import { User } from './user.types';
import userRepository from './user.memory.repository';

const getAll = (loginSubstring: string, limit: number) =>
  userRepository.getAutoSuggestUsers(loginSubstring, limit);

const create = (userData: User) => userRepository.create(userData);

const update = (id: string, userData: User) => userRepository.update(id, userData);

const getById = (id: string) => userRepository.getById(id);

const getByLogin = (login: string) => userRepository.getByLogin(login);

const remove = (id: string) => userRepository.remove(id);

const userService = {
  getAll,
  create,
  update,
  getById,
  remove,
  getByLogin,
};

export default userService;
