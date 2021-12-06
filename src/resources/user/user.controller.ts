import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HTTP400Error, HTTP404Error } from '../../common/errors';
import { validateMiddleware } from '../../middleware';
import userService from './user.service';
import { UserInput } from './user.types';

const indexAction = async (
  req: Request<{}, {}, {}, { loginSubstring: string; limit: number }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { loginSubstring, limit } = req.query;
    const users = await userService.getAll(loginSubstring, limit);
    return res.status(StatusCodes.OK).json(users);
  } catch (err) {
    return next(err);
  }
};

const createAction = async (req: Request<{}, {}, UserInput>, res: Response, next: NextFunction) => {
  try {
    await validateMiddleware(req, res, next);
    const userData = req.body;

    const isLoginAvailable = await userService.getByLogin(userData?.login);
    if (isLoginAvailable) {
      throw new HTTP404Error('Login has found.');
    } else {
      const user = await userService.create({ ...userData, isDeleted: false });
      return res.status(StatusCodes.OK).json(user);
    }
  } catch (err) {
    return next(err);
  }
};

const updateAction = async (
  req: Request<{ id: string }, {}, UserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    await validateMiddleware(req, res, next);
    const { id } = req.params;
    const userData = req.body;

    if (id) {
      const currUser = await userService.getById(id);
      if (!currUser) {
        throw new HTTP404Error('Login has found.');
      }

      const user = await userService.update(id, userData);
      return res.status(StatusCodes.OK).json(user);
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
      const currUser = await userService.getById(id);
      if (currUser) {
        await userService.remove(id);
        return res.status(StatusCodes.OK).send('User has been deleted');
      }
      throw new HTTP404Error('User not found.');
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
      const user = await userService.getById(id);
      if (user) {
        await userService.remove(id);
        return res.status(StatusCodes.OK).json(user);
      }

      throw new HTTP404Error('User not found.');
    }
    throw new HTTP400Error();
  } catch (err) {
    return next(err);
  }
};

const userController = {
  indexAction,
  getByIdAction,
  createAction,
  updateAction,
  deleteAction,
};

export default userController;
