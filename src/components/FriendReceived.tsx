/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { mq } from '@/style/mq';
import { Common } from '@/style/Common';

import FriendButton from './FriendButton';

import { FriendListItem, FriendListNumber, FriendSection } from './FriendList';
import { SrOnlyStyle } from '@/pages/Login';
import FriendRequestForm from './FriendRequestForm';

import { supabase } from '@/client';

import { useRecoilState } from 'recoil';
import { myInfoState } from '@/recoil/atom/useFriend';
import { useState, useEffect } from 'react';

export default function FriendReceived() {
  // 본인 uuid 값와 email 값
  const [myInfo] = useRecoilState(myInfoState);
  const [friendReceivedData, setFriendReceivedData] = useState<friendData[]>(
    []
  );

  //* 받은 친구 요청 중 본인이 받은 요청만 가져오기
  useEffect(() => {
    const FetchFriendReceived = async () => {
      try {
        const { data: friendReceived, error } = await supabase
          .from('friends')
          .select('*')
          .eq('receiverId', myInfo.id);

        //TODO: status가 true 면 보이면 안됨.
        if (!error && friendReceived.length > 0) {
          //친구 status 상태가 false인 것만 출력
          setFriendReceivedData(
            friendReceived.filter((value) => {
              !value.status;
            })
          );
        }
      } catch (error) {
        console.log('Error fetching user info: ', error);
      }
    };

    FetchFriendReceived();
  }, []);

  //친구 수락 버튼
  const handleAcceptFriend = async (value: friendData) => {
    try {
      const { data } = await supabase
        .from('friends') // 'friends' 테이블 선택
        .update({ status: true }) // status 값을 true로 업데이트
        .eq('senderId', value.senderId) // senderId가 '123'인 조건
        .eq('receiverId', value.receiverId); // receiverId가 '345'인 조건

      console.log('업데이트 성공:', data);
    } catch (error) {
      console.error('업데이트 중 오류 발생:', error);
    }
  };

  //친구 거절 버튼
  const handleRejectFriend = async (value: friendData) => {
    console.log('거절', value);
  };

  return (
    <section css={FriendSection}>
      <h3 css={FriendRequestTitle}>✉️친구 요청 보내기</h3>
      <FriendRequestForm />

      <h3 css={FriendRequestTitle}>📬받은 친구 요청</h3>
      <ul>
        {friendReceivedData.map((value, index) => {
          return (
            <li css={FriendListItem} key={index}>
              <div css={FriendListNumber}>
                <span css={SrOnlyStyle}>1</span>
              </div>
              <span>{value.senderName}</span>
              <div css={FriendRequestBtnBox}>
                <FriendButton
                  size="ssmall"
                  colorType="default"
                  onClick={() => handleAcceptFriend(value)}
                >
                  수락
                </FriendButton>
                <FriendButton
                  size="ssmall"
                  colorType="red"
                  onClick={() => handleRejectFriend(value)}
                >
                  거절
                </FriendButton>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export const FriendRequestTitle = css`
  text-align: start;
  margin: 25px 0;
  padding-bottom: 5px;
  border-bottom: solid 1px ${Common.colors.darkNavy};
  ${mq({
    fontSize: ['18px', '22px', '24px', ' 25px'],
  })};
`;

/* export const FriendRequestWidth = css`
  & > span {
    ${mq({
      width: ['40%', '40%', '40%', '50%'],
    })};
  }
`; */

export const FriendRequestBtnBox = css`
  display: flex;
  justify-content: end;
  ${mq({
    width: ['50%', '43%', '40%', '30%'],
    gap: ['2px', '4px', '4px', '5px'],
  })};
`;