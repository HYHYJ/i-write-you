import { atom } from 'recoil';

export const letterState = atom<LetterState>({
  key: 'letter',
  default: {
    sender: '',
    receiver: '',
    contents: [],
    secretQuestion: '',
    secretKey: '',
    writingPad: 0,
    member: false,
    attachment: false,
  }
});

export const letterNumberState = atom({
  key: 'letterIndex',
  default: 1
});