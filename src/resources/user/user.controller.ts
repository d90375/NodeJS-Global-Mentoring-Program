import { Request, Response, NextFunction } from 'express';
import userService from './user.service';

const { validate } = require('../../middleware/request.validator');

const indexAction = async (_req: Request, res: Response) => {
  const users = await userService.getAll();
  res.json(users);
};

// eslint-disable-next-line consistent-return
const createAction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await validate(req);
    const userData = req.body;
    const user = await userService.create({ ...userData, isDeleted: false });
    res.json(user);
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
    const user = await userService.update(id, userData);
    res.json(user);
  } catch (err) {
    return next(err);
  }
};

const deleteAction = async (req: Request, res: Response, _next: NextFunction) => {
  await validate(req);
  const { id } = req.params;
  await userService.remove(id);
  res.sendStatus(204);
};

const getByIdAction = async (req: Request, res: Response, _next: NextFunction) => {
  await validate(req);
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
