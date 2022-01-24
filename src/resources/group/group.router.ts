import { Router } from 'express';
import groupController from './group.controller';
import validate from './group.validator';

const router = Router();

/**
from api {get} /groups Get all groups
 *
 * @apiSuccess (200) {Array<Group>}
 */
router.get('/', groupController.indexAction);

/**
 * @api {get} /groups/:id Get specific group by Id
 *
 * @apiParam {String} [id] Id
 *
 * @apiSuccess (200) {Object<Group>}
 */
router.get('/:id', validate.groupGetByIdRequestValidation, groupController.getByIdAction);

/**
 * @api {put} /groups/:id Update specific group by Id
 *
 * @apiParam {String} [name] Name
 * @apiParam {Array<string[]>} [permissions] Permissions
 *
 * @apiSuccess (200) {Object<Group>}
 */
router.put('/:id', validate.groupUpdateRequestValidation, groupController.updateAction);

/**
 * @api {delete} /groups/:id Delete specific group by Id
 *
 * @apiParam {String} [id] Id
 *
 * @apiSuccess (200) {Object<Group>}
 */
router.delete('/:id', validate.groupDeleteRequestValidation, groupController.deleteAction);

/**
 * @api {post} /groups Create group
 *
 * @apiParam {String} [name] Name
 * @apiParam {Array<string[]>} [permissions]  Permissions
 *
 * @apiSuccess (200) {Object<Group>}
 */
router.post('/', validate.groupCreateRequestValidation, groupController.createAction);

/**
 * @api {patch} /groups/addUsers/:id add Users to group by specific group id
 *
 * @apiParam {String} [name] Name
 * @apiParam {Array<string[]>} [userIds] UserIds
 *
 * @apiSuccess (200) {Object<Group>}
 */
router.patch(
  '/addUsers/:id',
  validate.groupAddUsersRequestValidation,
  groupController.addUsersToGroupAction,
);

export default router;
