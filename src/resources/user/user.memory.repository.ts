import { users } from '../../mock/users';
import { User } from '../../types';

const getAll = () => users;

const getAutoSuggestUsers = (loginSubstring: string, limit: number) => {
  const fixedLoginSubstring = loginSubstring?.toLowerCase()?.trim();
  // eslint-disable-next-line @typescript-eslint/dot-notation
  let sortedUsers = users.sort((a, b) => a['login'].localeCompare(b['login']));

  if (loginSubstring) {
    sortedUsers = sortedUsers.filter((user) =>
      // eslint-disable-next-line @typescript-eslint/dot-notation
      user['login'].toLowerCase().includes(fixedLoginSubstring),
    );
  }

  if (limit) {
    return sortedUsers.slice(0, limit);
  }

  return sortedUsers;
};

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

const getByLogin = (login: string) => users.find((el) => el.login === login);

// eslint-disable-next-line consistent-return
const remove = (id: string): void => {
  // soft delete implementation
  const indexById = users.findIndex((el) => el.id === id);
  console.log('indexById', users[0]);
  if (indexById) {
    users[indexById].isDeleted = true;
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
  getAutoSuggestUsers,
  getByLogin,
};

export default userRepository;
