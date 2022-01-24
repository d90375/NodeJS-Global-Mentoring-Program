import { body, param } from 'express-validator';

const permissions = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];

const validate = {
  groupCreateRequestValidation: [
    body('name').notEmpty().isString().withMessage('Must to be a string').trim(),
    body('permissions')
      .isArray()
      .withMessage('Must to be an array')
      .notEmpty()
      .isIn(permissions)
      .withMessage('Must to be of valid permissions'),
  ],
  groupUpdateRequestValidation: [
    param('id').exists().isUUID(),
    body('name').isString().withMessage('Must to be a string').trim(),
    body('permissions')
      .isArray()
      .withMessage('Must to be an array')
      .isIn(permissions)
      .withMessage('Must to be one of valid permissions'),
  ],
  groupAddUsersRequestValidation: [
    param('id').exists().isUUID(),
    body('userIds').notEmpty().isArray(),
    body('*', 'put UUID please.').isUUID(),
  ],
  groupGetByIdRequestValidation: [param('id').exists().isUUID()],
  groupDeleteRequestValidation: [param('id').exists().isUUID()],
};

export default validate;
