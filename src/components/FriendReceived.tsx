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
        const { data: friendReceived } = await supabase
          .from('friends')
          .select('*')
          .eq('receiverId', myInfo.id);

        //T status가 true 면 보이면 안됨.
        if (friendReceived) {
          //친구 status 상태가 false인 것만 출력
          setFriendReceivedData(
            friendReceived.filter((value) => {
              return value.status === false;
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
        .eq('senderId', value.senderId)
        .eq('receiverId', value.receiverId)
        .eq('status', false);
      // 수락버튼 누르자마자 받은 친구 요청에서 사라짐.
      setFriendReceivedData((prev) =>
        prev.filter(
          (request) =>
            request.senderId !== value.senderId ||
            request.receiverId !== value.receiverId
        )
      );
      console.log('업데이트 성공:', data);
    } catch (error) {
      console.error('업데이트 중 오류 발생:', error);
    }
  };

  //친구 거절 버튼
  const handleRejectFriend = async (value: friendData) => {
    try {
      const { data } = await supabase
        .from('friends') // 'friends' 테이블 선택
        .delete()
        .eq('senderId', value.senderId)
        .eq('receiverId', value.receiverId)
        // status가 false인 값만
        .eq('status', false);
      // 거절버튼 누르자마자 받은 친구 요청에서 사라짐.
      setFriendReceivedData((prev) =>
        prev.filter(
          (request) =>
            request.senderId !== value.senderId ||
            request.receiverId !== value.receiverId
        )
      );
      console.log('친구거절 성공:', data);
    } catch (error) {
      console.error('친구거절 중 오류 발생:', error);
    }
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
                <span css={SrOnlyStyle}>{index}</span>
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
