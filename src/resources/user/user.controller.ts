import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { errorHandler } from '../../common/error-handlers';
import userService from './user.service';

const { validate } = require('../../middleware/request.validator');

const indexAction = async (
  req: Request<{}, {}, {}, { loginSubstring: string; limit: number }>,
  res: Response,
) => {
  const { loginSubstring, limit } = req.query;
  const users = await userService.getAll(loginSubstring, limit);
  res.json(users);
};

// eslint-disable-next-line consistent-return
const createAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await validate(req);
    const userData = req.body;

    const isLoginAvailable = userService.getByLogin(userData?.login);
    if (isLoginAvailable) {
      errorHandler(req, res, next, StatusCodes.NOT_ACCEPTABLE, 'Login has found.');
    } else {
      const user = await userService.create({ ...userData, isDeleted: false });
      res.json(user);
    }
  } catch (err) {
    return next(err);
  }
};

// eslint-disable-next-line consistent-return
const updateAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await validate(req);
    const { id } = req.params;
    const userData = req.body;

    const isLoginAvailable = userService.getByLogin(userData?.login);
    if (isLoginAvailable) {
      errorHandler(req, res, next, StatusCodes.NOT_ACCEPTABLE, 'Login has found.');
    } else {
      const user = await userService.update(id, userData);
      res.json(user);
    }
  } catch (err) {
    return next(err);
  }
};

const deleteAction = async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  await userService.remove(id);
  res.sendStatus(204);
};

const getByIdAction = async (req: Request, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const user = await userService.getById(id);
  res.json(user);
};

const userController = {
  indexAction,
  getByIdAction,
  createAction,
  updateAction,
  deleteAction,
};

export default userController;
