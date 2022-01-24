import { Router } from 'express';
import { authMiddleware } from '../../middleware';
import userController from './user.controller';
import validate from './user.validator';

const router = Router();

/**
from api {get} /users Get all users
 *
 * @apiSuccess (200) {Array<User>}
 */
router.get('/', authMiddleware, userController.indexAction);

/**
 * @api {get} /users/:id Get specific user by Id
 *
 * @apiParam {String} [id] Id
 *
 * @apiSuccess (200) {Object<User>}
 */
router.get(
  '/:id',
  authMiddleware,
  validate.userGetByIdRequestValidation,
  userController.getByIdAction,
);

/**
 * @api {put} /users/:id Update specific user by Id
 *
 * @apiParam {String} [id] Id
 * @apiParam {String} [login] Login
 * @apiParam {String} [password] Password
 * @apiParam {number} [age] Age
 *
 * @apiSuccess (200) {Object<User>}
 */
router.put(
  '/:id',
  authMiddleware,
  validate.userUpdateRequestValidation,
  userController.updateAction,
);

/**
 * @api {delete} /users/:id Delete specific user by Id
 *
 * @apiParam {String} [id] Id
 *
 * @apiSuccess (200) {Object<User>}
 */
router.delete(
  '/:id',
  authMiddleware,
  validate.userDeleteByIdRequestValidation,
  userController.deleteAction,
);

/**
 * @api {post} /users Create user
 *
 * @apiParam {String} [id] Id
 * @apiParam {String} [login] Login
 * @apiParam {String} [password] Password
 * @apiParam {number} [age] Age
 *
 * @apiSuccess (200) {Object<User>}
 */
router.post('/', validate.userCreateRequestValidation, userController.createAction);

export default router;
