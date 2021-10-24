import { users } from '../../mock/users';
import { User } from '../../types';

const getAll = () => users;

const create = (user: User) => {
  users.push(user);
  return user;
};

// eslint-disable-next-line consistent-return
const update = (id: string, user: User): void | User => {
  const indexById = users.findIndex((el) => el.id === id);

  if (indexById !== -1) {
    const updatedUser = { ...users[indexById], ...user };
    users[indexById] = updatedUser;
    return updatedUser;
  }
};

// eslint-disable-next-line consistent-return
const getById = (id: string): void | User => {
  const user = users.find((el) => el.id === id);

  if (user) {
    return user;
  }
};

// eslint-disable-next-line consistent-return
const remove = (id: string): void | User => {
  // soft delete implementation
  const user = users.find((el) => el.id === id);

  if (user) {
    return { ...user, isDeleted: true };
  }

  //   const indexById = users.findIndex((el) => el.id === id);
  //   const isDeleted = indexById !== -1;
  //   if (isDeleted) {
  //     users.splice(indexById, 1);
  //   }
  //   return isDeleted;
};

const userRepository = {
  getAll,
  create,
  update,
  getById,
  remove,
};

export default userRepository;
