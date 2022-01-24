import { body } from 'express-validator';

const validate = {
  authValidation: [
    body('login').notEmpty().isString().withMessage('Must to be a string').trim(),
    body('password')
      .notEmpty()
      .isLength({ min: 1 })
      .trim()
      .matches(/(?:\d+[a-z]|[a-z]+\d)[a-z\d]*/)
      .withMessage('Must contain a numbers and letters'),
  ],
};

export default validate;
