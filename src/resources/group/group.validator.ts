import { body, param } from 'express-validator';

const permissions = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

const validate = {
  groupCreateRequestValidation: [
    body('name').notEmpty().trim().isString(),
    body('permissions').isArray().notEmpty().isIn(permissions),
  ],
  groupUpdateRequestValidation: [
    param('id').exists().isUUID(),
    body('name').trim().isString(),
    body('permissions').isArray().isIn(permissions),
  ],
  groupAddUsersRequestValidation: [
    param('id').exists().isUUID(),
    body('userIds').notEmpty().isArray(),
  ],
  groupGetByIdRequestValidation: [param('id').exists().isUUID()],
  groupDeleteRequestValidation: [param('id').exists().isUUID()],
};

export default validate;
