import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HTTP400Error, HTTP404Error } from '../../common/errors';
import { validateMiddleware } from '../../middleware';
import userService from './group.service';
import groupService from './group.service';
import { GroupInput } from './group.types';

const indexAction = async (
  req: Request<{}, {}, {}, { loginSubstring: string; limit: number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const groups = await groupService.getAll();
    return res.status(StatusCodes.OK).json(groups);
  } catch (err) {
    return next(err);
  }
};

const createAction = async (
  req: Request<{}, {}, GroupInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await validateMiddleware(req, res, next);
    const groupData = req.body;

    const isLoginAvailable = await groupService.getByName(groupData?.name);
    if (isLoginAvailable) {
      throw new HTTP404Error('Group has found.');
    }
    const group = await groupService.create(groupData);
    return res.status(StatusCodes.OK).json(group);
  } catch (err) {
    return next(err);
  }
};

const updateAction = async (
  req: Request<{ id: string }, {}, GroupInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await validateMiddleware(req, res, next);
    const { id } = req.params;
    const groupData = req.body;

    if (id) {
      const currGroup = await groupService.getById(id);
      if (!currGroup) {
        throw new HTTP404Error('Group not found.');
      }

      const group = await groupService.update(id, groupData);
      return res.status(StatusCodes.OK).json(group);
    }

    throw new HTTP400Error();
  } catch (err) {
    return next(err);
  }
};

const deleteAction = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (id) {
      const currGroup = await groupService.getById(id);
      if (currGroup) {
        await groupService.remove(id);
        return res.status(StatusCodes.OK).send('Group has been deleted');
      }
      throw new HTTP404Error('Group not found.');
    }
    throw new HTTP400Error();
  } catch (err) {
    return next(err);
  }
};

const getByIdAction = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (id) {
      const group = await groupService.getById(id);

      if (!group) {
        throw new HTTP404Error('Group not found.');
      }
      return res.status(StatusCodes.OK).json(group);
    }
    throw new HTTP400Error();
  } catch (err) {
    return next(err);
  }
};

const addUsersToGroupAction = async (
  req: Request<{ id: string }, {}, { userIds: string[] }, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await validateMiddleware(req, res, next);
    const { id } = req.params;
    const { userIds } = req.body;

    const currentUsers: any = await Promise.all(
      userIds?.map(async (userId) => userService.getById(userId)),
    )
      .then((data) => data)
      .catch(() => {});

    if (!currentUsers || !currentUsers.every((userId: string) => userId)) {
      throw new HTTP404Error('One of the users was not found ');
    }

    const group = await groupService.addUsersToGroup(id, userIds);

    if (!group) {
      throw new HTTP404Error('Group or User not found.');
    }

    return res.status(StatusCodes.OK).json(group);
  } catch (err) {
    return next(err);
  }
};

const groupController = {
  indexAction,
  getByIdAction,
  createAction,
  updateAction,
  deleteAction,
  addUsersToGroupAction,
};

export default groupController;
