import { atom } from 'recoil';

export const usersInfoState = atom<infoType[]>({
  key: 'usersInfo',
  default: [],
});

export const myInfoState = atom<infoType>({
  key: 'myInfo',
  default: {
    id: '',
    email: '',
  },
});
