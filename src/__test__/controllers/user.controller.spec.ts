// @ts-nocheck
import bcrypt from 'bcrypt';
import userController from '../../resources/user/user.controller';
import userRepository from '../../resources/user/user.memory.repository';
import { BaseError } from '../../common/BaseError';

jest.mock('bcrypt');
jest.mock('../../resources/user/user.memory.repository', () => ({
  create: jest.fn(),
  getByLogin: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  getAutoSuggestUsers: jest.fn(),
}));

describe('UserController', () => {
  const mockResponse = {
    status: jest.fn().mockReturnValue({
      json: jest.fn(),
      send: jest.fn(),
    }),
  };
  const mockNext = jest.fn();

  const mockUser = {
    id: 'f2ab8b0d-1ff8-4a94-a4a5-1c2df2092437',
    login: '2',
    age: 7,
    isDeleted: false,
    password: 123,
    groups: [
      {
        id: 'fd4804eb-c3e4-4a3c-bcff-29848bac7ff0',
        name: 'group1',
        permissions: ['READ'],
      },
    ],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    const mocRequest = { query: { loginSubstring: 'qwerty', limit: 1 } };

    it('Should return list of users', async () => {
      userRepository.getAutoSuggestUsers.mockResolvedValue([mockUser]);
      await userController.indexAction(mocRequest, mockResponse, mockNext);
      expect(userRepository.getAutoSuggestUsers).toHaveBeenCalledTimes(1);
      expect(userRepository.getAutoSuggestUsers.mock.calls[0][0]).toEqual(
        mocRequest.query.loginSubstring,
      );
      expect(userRepository.getAutoSuggestUsers.mock.calls[0][1]).toEqual(mocRequest.query.limit);
      expect(mockResponse.status).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenLastCalledWith(200);
      expect(mockResponse.status().json.mock.calls[0][0]).toEqual([mockUser]);
      expect(mockResponse.status().json).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUserById', () => {
    const reMockRequest = { params: { id: mockUser.id } };

    it('Should return user', async () => {
      userRepository.getById.mockResolvedValue(mockUser);
      await userController.getByIdAction(reMockRequest, mockResponse, mockNext);

      expect(userRepository.getById).toHaveBeenCalledTimes(1);
      expect(userRepository.getById).lastCalledWith(mockUser.id);
      expect(mockResponse.status).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenLastCalledWith(200);
      expect(mockResponse.status().json).toHaveBeenCalledTimes(1);
      expect(mockResponse.status().json).toHaveBeenLastCalledWith(mockUser);
    });

    it('Should handle user absence exception', async () => {
      userRepository.getById.mockResolvedValue(undefined);
      await userController.getByIdAction(reMockRequest, mockResponse, mockNext);

      expect(mockNext.mock.calls[0][0] instanceof BaseError).toEqual(true);
    });
  });

  describe('updateUser', () => {
    const reMockRequest = {
      params: { id: mockUser.id },
      body: mockUser,
    };

    it('Should update user', async () => {
      userRepository.getById.mockResolvedValue(mockUser.id);
      userRepository.update.mockResolvedValue(mockUser);
      bcrypt.hash.mockImplementation((str) => str);

      await userController.updateAction(reMockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenLastCalledWith(200);
      expect(mockResponse.status().json).toHaveBeenCalledTimes(1);
      expect(mockResponse.status().json).toHaveBeenLastCalledWith(mockUser);
    });

    it('Should handle user absence exception', async () => {
      userRepository.getById.mockResolvedValue(undefined);
      await userController.updateAction(reMockRequest, mockResponse, mockNext);

      expect(mockNext.mock.calls[0][0] instanceof BaseError).toEqual(true);
    });
  });

  describe('createUser', () => {
    const mockRequest = { body: mockUser };

    it('should create user successfully', async () => {
      userRepository.getByLogin.mockResolvedValue(false);
      userRepository.create.mockImplementation((data) => data);
      bcrypt.hash.mockImplementation((str) => str);
      await userController.createAction(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenLastCalledWith(200);
      expect(mockResponse.status().json).toHaveBeenCalledTimes(1);
      expect(mockResponse.status().json).toHaveBeenLastCalledWith(mockUser);
    });

    it('Should handle exception when login is busy', async () => {
      userRepository.getByLogin.mockResolvedValue(true);
      await userController.createAction(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
      expect(mockNext.mock.calls[0][0] instanceof BaseError).toEqual(true);
    });
  });

  describe('deleteUser', () => {
    const reMockRequest = { params: { id: mockUser.id } };

    it('Should delete user', async () => {
      userRepository.getById.mockResolvedValue(mockUser.id);
      userRepository.remove.mockResolvedValue(mockUser);
      await userController.deleteAction(reMockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledTimes(1);
      expect(mockResponse.status).toHaveBeenLastCalledWith(200);
      expect(mockResponse.status().send).toHaveBeenCalledTimes(1);
      expect(mockResponse.status().send).toHaveBeenLastCalledWith('User has been deleted');
    });

    it('Should handle user absence exception', async () => {
      userRepository.getById.mockResolvedValue(undefined);
      await userController.deleteAction(reMockRequest, mockResponse, mockNext);
      expect(mockNext.mock.calls[0][0] instanceof BaseError).toEqual(true);
    });
  });
});
