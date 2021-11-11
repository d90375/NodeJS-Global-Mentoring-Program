import { Request, Response, NextFunction } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { errorHandler } from '../../common/error-handlers';
import groupService from './group.service';
import { GroupInput } from './group.types';

const { validate } = require('../../middleware/request.validator');

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
    await validate(req);
    const groupData = req.body;

    const isLoginAvailable = await groupService.getByName(groupData?.name);
    if (isLoginAvailable) {
      errorHandler(req, res, next, StatusCodes.NOT_ACCEPTABLE, 'Group has found.');
    } else {
      const group = await groupService.create(groupData);
      return res.status(StatusCodes.OK).json(group);
    }
    return false;
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
    await validate(req);
    const { id } = req.params;
    const groupData = req.body;

    if (id) {
      const currGroup = await groupService.getById(id);
      if (!currGroup) {
        errorHandler(req, res, next, StatusCodes.NOT_FOUND, 'Group not found.');
      }

      const group = await groupService.update(id, groupData);
      return res.status(StatusCodes.OK).json(group);
    }

    errorHandler(req, res, next, StatusCodes.BAD_GATEWAY, getReasonPhrase(StatusCodes.BAD_GATEWAY));
    return false;
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
      errorHandler(req, res, next, StatusCodes.NOT_FOUND, 'Group not found.');
    }
    errorHandler(req, res, next, StatusCodes.BAD_GATEWAY, getReasonPhrase(StatusCodes.BAD_GATEWAY));
    return false;
  } catch (err) {
    return next(err);
  }
};

const getByIdAction = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const group = await groupService.getById(id);

    if (!group) {
      errorHandler(req, res, next, StatusCodes.NOT_FOUND, 'Group not found.');
    }

    return res.status(StatusCodes.OK).json(group);
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
    const { id } = req.params;
    const { userIds } = req.body;

    const group = await groupService.addUsersToGroup(id, userIds);

    if (!group) {
      errorHandler(req, res, next, StatusCodes.NOT_FOUND, 'Group or User not found.');
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
