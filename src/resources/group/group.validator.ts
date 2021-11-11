import { body } from 'express-validator';

const permissions = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

const validate = {
  groupCreateRequestValidation: [
    body('name').notEmpty().trim().isString(),
    body('permissions').isArray().notEmpty().isIn(permissions),
  ],
  groupUpdateRequestValidation: [
    body('name').trim().isString(),
    body('permissions').isArray().isIn(permissions),
  ],
  groupAddUsersRequestValidation: [body('userIds').notEmpty().isArray()],
};

export default validate;
