import User from '../models/user';

import { passwordToHash } from '../../helpers/password';

const data = [
  {
    _id: '5e4f7e054425635ba140362e',
    email: 'test@test.ru',
    password: 'test',
  },
];

export default () => {
  return data.map(d => {
    d.password = passwordToHash(d.password);

    return new User(d).save();
  });
};
