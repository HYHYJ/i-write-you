/// <reference types="vite/client" />

interface LetterState {
  id?: number;
  created_at?: string;
  sender: string;
  receiver: string;
  contents: string[];
  secretQuestion?: string;
  secretKey?: string;
  writingPad: number;
  member: boolean;
  attachment: boolean;
  receiverId: string;
  senderId: string;
}

interface UserInfo {
  id: string;
  userEmail: string;
  userId: string;
  hotelName: string;
  created_at: string;
}

interface Window {
  // Kakao: { VERSION: string, cleanup: () => void, init: (key: string) => void, isInitialized: () => void; };
  Kakao: any;
}

//친구 - 유저 데이터
type infoType = {
  id: string;
  email: string;
};

type friendData = {
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  status: boolean;
};
