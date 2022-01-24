import Models, { db } from '../base/base.model';
import { GroupInput, GroupOutput } from './group.types';

const getAllGroups = async () =>
  Models.GroupModel.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: {
      model: Models.UserModel,
      as: 'users',
      attributes: ['id', 'login', 'age', 'isDeleted'],
      through: {
        attributes: [],
      },
    },
  });

const createGroup = async (group: GroupInput): Promise<GroupOutput> =>
  Models.GroupModel.create(group);

const getGroupById = async (id: string) =>
  Models.GroupModel.findByPk(id, {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: {
      model: Models.UserModel,
      as: 'users',
      attributes: ['id', 'login', 'age', 'isDeleted'],
      through: {
        attributes: [],
      },
    },
  });

const updateGroupById = async (id: string, group: GroupInput) => {
  const currentGroup = await Models.GroupModel.findByPk(id, {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: {
      model: Models.UserModel,
      as: 'users',
      attributes: ['id', 'login', 'age', 'isDeleted'],
      through: {
        attributes: [],
      },
    },
  });

  return currentGroup?.update(group);
};

const getGroupByName = async (name: string) => Models.GroupModel.findOne({ where: { name } });

const deleteGroupById = async (id: string): Promise<void> => {
  Models.GroupModel.destroy({ where: { id } });
};

const addUsersToGroup = async (groupId: string, userIds: string[]) => {
  const transaction = await db.transaction();

  const currentGroup = await Models.GroupModel.findByPk(groupId);

  if (!currentGroup) {
    return null;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const userId of userIds) {
    // eslint-disable-next-line no-await-in-loop
    const user = await Models.UserModel.findByPk(userId);

    if (!user) {
      return null;
    }

    // eslint-disable-next-line no-await-in-loop
    await currentGroup?.addUsers(user, { transaction });
  }
  await transaction.commit();

  const responseGroup = await Models.GroupModel.findByPk(groupId, {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: {
      model: Models.UserModel,
      as: 'users',
      attributes: ['id', 'login', 'age', 'isDeleted'],
      through: {
        attributes: [],
      },
    },
  });

  return responseGroup;
};

const userRepository = {
  getAllGroups,
  createGroup,
  getGroupById,
  updateGroupById,
  deleteGroupById,
  addUsersToGroup,
  getGroupByName,
};

export default userRepository;
