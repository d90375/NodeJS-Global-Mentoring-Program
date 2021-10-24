import { User } from '../../types';
import userRepository from './user.memory.repository';

const getAll = () => userRepository.getAll();

const create = (userData: User) => userRepository.create(userData);

const update = (id: string, userData: User) => userRepository.update(id, userData);

const getById = (id: string) => userRepository.getById(id);

const remove = (id: string) => userRepository.remove(id);

const userService = {
  getAll,
  create,
  update,
  getById,
  remove,
};

export default userService;
