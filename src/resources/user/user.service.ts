import userRepository from './user.memory.repository';
import { UserInput } from './user.types';

const getAll = async (loginSubstring: string, limit: number) =>
  userRepository.getAutoSuggestUsers(loginSubstring, limit);

const create = async (userData: UserInput) => userRepository.create(userData);

const update = async (id: string, userData: UserInput) => userRepository.update(id, userData);

const getById = async (id: string) => userRepository.getById(id);

const getByLogin = async (login: string) => userRepository.getByLogin(login);

const getByLoginWithPassword = async (login: string) =>
  userRepository.getByLoginWithPassword(login);

const remove = async (id: string) => userRepository.remove(id);

const userService = {
  getAll,
  create,
  update,
  getById,
  remove,
  getByLogin,
  getByLoginWithPassword,
};

export default userService;
