// @ts-nocheck
import groupController from '../../resources/group/group.controller';
import groupRepository from '../../resources/group/group.memory.repository';
import userRepository from '../../resources/user/user.memory.repository';
import { BaseError } from '../../common/BaseError';

jest.mock('../../resources/group/group.memory.repository', () => ({
  getGroupById: jest.fn(),
  getAllGroups: jest.fn(),
  createGroup: jest.fn(),
  deleteGroupById: jest.fn(),
  updateGroupById: jest.fn(),
  getGroupByName: jest.fn(),
  addUsersToGroup: jest.fn(),
}));

jest.mock('../../resources/user/user.memory.repository', () => ({
  getById: jest.fn(),
}));

describe('GroupController', () => {
  const mockNext = jest.fn();
  const mockResponse = {
    status: jest.fn().mockReturnValue({
      json: jest.fn(),
      send: jest.fn(),
    }),
  };

  const mockGroup = {
    id: 'fd4804eb-c3e4-4a3c-bcff-29848bac7ff0',
    name: 'group1',
    permissions: ['READ'],
    users: [
      {
        id: '9389a0bb-73f7-4bd4-acc7-d8fee72af704',
        login: 'cat',
        age: 7,
        isDeleted: false,
      },
      {
        id: '92a6b903-5e51-49cb-a63d-188da4d2b49f',
        login: 'CAT',
        age: 7,
        isDeleted: false,
      },
      {
        id: 'f2ab8b0d-1ff8-4a94-a4a5-1c2df2092437',
        login: '2',
        age: 7,
        isDeleted: false,
      },
    ],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getGroups', () => {
    it('Should return groups', async () => {
      const mockRequest = {};
      groupRepository.getAllGroups.mockResolvedValue([mockGroup]);
      await groupController.indexAction(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).lastCalledWith(200);
      expect(mockResponse.status().json).toHaveBeenCalledTimes(1);
      expect(mockResponse.status().json).lastCalledWith([mockGroup]);
    });
  });

  describe('getGroupById', () => {
    const mockRequest = { params: { id: mockGroup.id } };
    it('Should return group', async () => {
      groupRepository.getGroupById.mockResolvedValue(mockGroup.id);
      await groupController.getByIdAction(mockRequest, mockResponse, mockNext);

      expect(groupRepository.getGroupById).toHaveBeenCalledTimes(1);
      expect(groupRepository.getGroupById).lastCalledWith(mockGroup.id);
      expect(mockResponse.status).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).lastCalledWith(200);
      expect(mockResponse.status().json).toHaveBeenCalledTimes(1);
      expect(mockResponse.status().json).lastCalledWith(mockGroup.id);
    });

    it('Should handle group absence', async () => {
      groupRepository.getGroupById.mockResolvedValue(undefined);
      await groupController.getByIdAction(mockRequest, mockResponse, mockNext);
      expect(mockNext.mock.calls[0][0] instanceof BaseError).toEqual(true);
    });
  });

  describe('createGroup', () => {
    const mockRequest = { body: mockGroup };
    it('Should create group', async () => {
      groupRepository.createGroup.mockResolvedValue(mockGroup);
      groupRepository.getGroupByName.mockResolvedValue(undefined);
      await groupController.createAction(mockRequest, mockResponse, mockNext);
      expect(mockResponse.status).lastCalledWith(200);
      expect(mockResponse.status().json).toHaveBeenCalledTimes(1);
      expect(mockResponse.status().json).lastCalledWith(mockGroup);
    });

    it('Should handle exception', async () => {
      groupRepository.getGroupByName.mockResolvedValue(mockGroup.name);
      await groupController.createAction(mockRequest, mockResponse, mockNext);
      expect(mockNext.mock.calls[0][0] instanceof BaseError).toEqual(true);
    });
  });

  describe('updateGroup', () => {
    const mockRequest = { params: { id: mockGroup.id }, body: mockGroup };
    it('Should update group', async () => {
      groupRepository.getGroupById.mockResolvedValue(mockGroup.id);
      groupRepository.updateGroupById.mockResolvedValue(mockGroup);
      await groupController.updateAction(mockRequest, mockResponse, mockNext);

      expect(groupRepository.updateGroupById).lastCalledWith(mockGroup.id, mockGroup);
      expect(mockResponse.status).lastCalledWith(200);
      expect(mockResponse.status().json).toHaveBeenCalledTimes(1);
      expect(mockResponse.status().json).lastCalledWith(mockGroup);
    });

    it('Should handle group not found exception', async () => {
      groupRepository.getGroupById.mockResolvedValue(undefined);
      await groupController.updateAction(mockRequest, mockResponse, mockNext);
      expect(mockNext.mock.calls[0][0] instanceof BaseError).toEqual(true);
    });
  });

  describe('deleteGroup', () => {
    const mockRequest = { params: { id: mockGroup.id } };

    it('should delete group', async () => {
      groupRepository.getGroupById.mockResolvedValue(mockGroup.id);
      groupRepository.deleteGroupById.mockResolvedValue(mockGroup);
      await groupController.deleteAction(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).lastCalledWith(200);
      expect(mockResponse.status().send).toHaveBeenCalledTimes(1);
      expect(mockResponse.status().send).lastCalledWith('Group has been deleted');
    });

    it('Should handle exception', async () => {
      groupRepository.getGroupById.mockResolvedValue(undefined);
      await groupController.deleteAction(mockRequest, mockResponse, mockNext);

      expect(mockNext.mock.calls[0][0] instanceof BaseError).toEqual(true);
    });
  });

  describe('addUsersToGroupAction', () => {
    const userIds = ['9389a0bb-73f7-4bd4-acc7-d8fee72af704'];
    const mockRequest = {
      params: { id: mockGroup.id },
      body: { userIds: userIds },
    };

    it('Should add users to group', async () => {
      userRepository.getById.mockResolvedValue(mockGroup.id);
      console.log('userRepository', userRepository.getById());
      groupRepository.addUsersToGroup.mockResolvedValue(userIds);
      await groupController.addUsersToGroupAction(mockRequest, mockResponse, mockNext);

      expect(groupRepository.addUsersToGroup).lastCalledWith(mockGroup.id, userIds);
      expect(mockResponse.status).lastCalledWith(200);
      expect(mockResponse.status().json).toHaveBeenCalledTimes(1);
      expect(mockResponse.status().json).lastCalledWith(userIds);
    });

    it('Should handle exception', async () => {
      groupRepository.addUsersToGroup.mockResolvedValue(undefined);
      await groupController.addUsersToGroupAction(mockRequest, mockResponse, mockNext);
      expect(mockNext.mock.calls[0][0] instanceof BaseError).toEqual(true);
    });
  });
});
