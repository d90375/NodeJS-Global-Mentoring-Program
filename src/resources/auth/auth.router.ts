import { Router } from 'express';
import authController from './auth.controller';
import validate from './auth.validator';

const router = Router();

/**
from api {post} /groups Get all groups
 *
 * @apiSuccess (200) {Array<Group>}
 */
router.post('/login', validate.authValidation, authController.loginAction);

export default router;
