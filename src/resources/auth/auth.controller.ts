import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HTTP404Error } from '../../common/errors';
import { validateMiddleware } from '../../middleware';
import userService from '../user/user.service';
import { UserInput } from '../user/user.types';
import { CONFIG } from '../../common/config';

const loginAction = async (req: Request<{}, UserInput>, res: Response, next: NextFunction) => {
  try {
    await validateMiddleware(req, res, next);
    const { login, password } = req.body;

    const currentUser = await userService.getByLoginWithPassword(login);
    if (!currentUser) {
      throw new HTTP404Error('Login not found.');
    }

    const passwordMatch = await bcrypt.compare(password, currentUser?.password);
    if (!passwordMatch) {
      throw new HTTP404Error('Invalid password');
    }

    const token = jwt.sign({ login }, CONFIG.JWT_TOKEN_SECRET);

    return res.json({ token });
  } catch (err) {
    return next(err);
  }
};

const authController = {
  loginAction,
};

export default authController;
