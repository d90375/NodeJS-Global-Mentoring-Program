import groupRepository from './group.memory.repository';
import { GroupInput } from './group.types';

const getAll = async () => groupRepository.getAllGroups();

const create = async (group: GroupInput) => groupRepository.createGroup(group);

const getById = async (id: string) => groupRepository.getGroupById(id);

const getByName = async (name: string) => groupRepository.getGroupByName(name);

const update = async (id: string, group: GroupInput) => groupRepository.updateGroupById(id, group);

const remove = async (id: string) => groupRepository.deleteGroupById(id);

const addUsersToGroup = (groupId: string, userIds: string[]) =>
  groupRepository.addUsersToGroup(groupId, userIds);

const userService = {
  getAll,
  create,
  update,
  getById,
  remove,
  addUsersToGroup,
  getByName,
};

export default userService;
