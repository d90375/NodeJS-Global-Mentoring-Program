import { body } from 'express-validator';

const validate = {
  userUpdateRequestValidation: [
    body('login').isString().withMessage('Must to be a string').trim(),
    body('password')
      .trim()
      .optional()
      .matches(/(?:\d+[a-z]|[a-z]+\d)[a-z\d]*/)
      .withMessage('Must contain a numbers and letters'),
    body('age')
      .trim()
      .optional()
      .matches(/^([4-9]|[1-9][0-9]|1[01][0-9]|12[0-9]|130)$/)
      .withMessage('Must contain a numbers 4 to 130'),
  ],
  userCreateRequestValidation: [
    body('login').notEmpty().isString().withMessage('Must to be a string').trim(),
    body('password')
      .notEmpty()
      .isLength({ min: 1 })
      .trim()
      .matches(/(?:\d+[a-z]|[a-z]+\d)[a-z\d]*/)
      .withMessage('Must contain a numbers and letters'),
    body('age')
      .notEmpty()
      .trim()
      .matches(/^([4-9]|[1-9][0-9]|1[01][0-9]|12[0-9]|130)$/)
      .withMessage('Must contain a numbers 4 to 130'),
  ],
};

export default validate;
