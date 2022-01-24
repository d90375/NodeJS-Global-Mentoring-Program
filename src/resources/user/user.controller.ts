import { Request, Response, NextFunction } from 'express';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { errorHandler } from '../../common/error-handlers';
import userService from './user.service';

const { validate } = require('../../middleware/request.validator');

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

const createAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await validate(req);
    const userData = req.body;

    const isLoginAvailable = await userService.getByLogin(userData?.login);
    if (isLoginAvailable) {
      errorHandler(req, res, next, StatusCodes.NOT_ACCEPTABLE, 'Login has found.');
    } else {
      const user = await userService.create({ ...userData, isDeleted: false });
      return res.status(StatusCodes.OK).json(user);
    }
    return false;
  } catch (err) {
    return next(err);
  }
};

const updateAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await validate(req);
    const { id } = req.params;
    const userData = req.body;

    if (id) {
      const currUser = await userService.getById(id);
      if (!currUser) {
        errorHandler(req, res, next, StatusCodes.NOT_FOUND, 'Login not found.');
      }

      const isLoginAvailable = await userService.getByLogin(userData?.login);
      if (isLoginAvailable) {
        errorHandler(req, res, next, StatusCodes.NOT_ACCEPTABLE, 'Login has found.');
      } else {
        const user = await userService.update(id, userData);
        return res.status(StatusCodes.OK).json(user);
      }
    }

    errorHandler(req, res, next, StatusCodes.BAD_GATEWAY, getReasonPhrase(StatusCodes.BAD_GATEWAY));
    return false;
  } catch (err) {
    return next(err);
  }
};

const deleteAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (id) {
      const currUser = await userService.getById(id);
      if (currUser) {
        await userService.remove(id);
        return res.status(StatusCodes.NO_CONTENT).send('Login has been deleted.');
      }
      errorHandler(req, res, next, StatusCodes.NOT_FOUND, 'Login not found.');
    }
    errorHandler(req, res, next, StatusCodes.BAD_GATEWAY, getReasonPhrase(StatusCodes.BAD_GATEWAY));
    return false;
  } catch (err) {
    return next(err);
  }
};

const getByIdAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);
    return res.status(StatusCodes.OK).json(user);
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
