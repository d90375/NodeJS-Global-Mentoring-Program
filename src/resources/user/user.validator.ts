import { body } from 'express-validator';

const validate = {
  userRequestValidation: [
    body(['id', 'login']).not().isEmpty().trim().escape(),
    body('password')
      .isLength({ min: 1 })
      .trim()
      .escape()
      .matches(/(?:\d+[a-z]|[a-z]+\d)[a-z\d]*/),
    body('age')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .matches(/^([4-9]|[1-9][0-9]|1[01][0-9]|12[0-9]|130)$/),
  ],
};

export default validate;
