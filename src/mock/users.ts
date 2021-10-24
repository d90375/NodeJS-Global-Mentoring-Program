import { v4 as uuidv4 } from 'uuid';
// @ts-ignore
import Fakerator from 'fakerator';

const fake = Fakerator('en-EN');

// eslint-disable-next-line import/prefer-default-export
export const users = Array(6)
  .fill(0)
  .map(() => ({
    id: uuidv4(),
    login: fake.names.firstName(),
    password: fake.internet.password(8),
    age: fake.random.number(4, 130),
    isDeleted: false,
  }));
