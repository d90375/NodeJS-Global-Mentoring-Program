import { body } from 'express-validator';

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
    body('name').isString().withMessage('Must to be a string').trim(),
    body('permissions')
      .isArray()
      .withMessage('Must to be an array')
      .isIn(permissions)
      .withMessage('Must to be one of valid permissions'),
  ],
  groupAddUsersRequestValidation: [body('userIds').notEmpty().isArray()],
};

export default validate;
