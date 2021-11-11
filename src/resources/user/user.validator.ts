import { body } from 'express-validator';

const validate = {
  userUpdateRequestValidation: [
    body('login').trim().isString(),
    body('password')
      .trim()
      .optional()
      .matches(/(?:\d+[a-z]|[a-z]+\d)[a-z\d]*/),
    body('age')
      .trim()
      .optional()
      .matches(/^([4-9]|[1-9][0-9]|1[01][0-9]|12[0-9]|130)$/),
  ],
  userCreateRequestValidation: [
    body('login').notEmpty().trim().isString(),
    body('password')
      .notEmpty()
      .isLength({ min: 1 })
      .trim()
      .matches(/(?:\d+[a-z]|[a-z]+\d)[a-z\d]*/),
    body('age')
      .notEmpty()
      .trim()
      .matches(/^([4-9]|[1-9][0-9]|1[01][0-9]|12[0-9]|130)$/),
  ],
};

export default validate;
