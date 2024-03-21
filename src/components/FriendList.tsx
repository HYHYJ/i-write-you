/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { mq } from '@/style/mq';
import { Common } from '@/style/Common';

import FriendButton from './FriendButton';
import { SrOnlyStyle } from '@/pages/Login';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/client';

import { useRecoilState } from 'recoil';
// import { myInfoState } from '@/recoil/atom/useFriend';
import { letterState } from '@/recoil/atom/useLetter';

export default function FreindList() {
  const [myInfo, setMyInfo] = useState<infoType | undefined>();
  const [friendList, setFriendList] = useState<friendData[]>([]);
  const [, setLetter] = useRecoilState(letterState);

  //localStorage에서 나의 값 가져오기
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('myInfo');
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      setMyInfo(userInfo);
    }
  }, []);

  //친구 등록된 사용자 리스트 가져오기 : friends 테이블에서 친구 true된 값만 가져오기
  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        const storedUserInfo = localStorage.getItem('myInfo');

        if (storedUserInfo) {
          const userInfo = JSON.parse(storedUserInfo);
          setMyInfo(userInfo);
        }
        const { data, error } = await supabase
          .from('friends')
          .select('*')
          // senderId가 MyInfo.id와 일치하고 status가 true인 조건
          // 또는 receiveId가 MyInfo.id와 일치하고 status가 true인 조건
          .or(`senderId.eq.${myInfo!.id},receiverId.eq.${myInfo!.id}`)
          .or('status.eq.true');
        if (error) {
          console.error('Error fetching friends:', error);
        } else {
          // 조회된 데이터를 활용
          setFriendList(data);
        }
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };
    if (myInfo) {
      fetchFriendList();
    }
  }, [myInfo?.id]);

  //친구목록 정렬
  const sortedFriendList = useMemo(() => {
    return friendList.sort((a, b) => a.senderName.localeCompare(b.senderName));
  }, [friendList]);

  //* 편지 발송 버튼 누르면 setLetter로 값 변경(sender, receiver 값 전달)
  const handleMoveWriteLetter = (value: friendData) => {
    setLetter((prev) => ({
      ...prev,
      member: true,
      sender: myInfo!.email,
      receiver:
        myInfo!.email !== value.receiverName
          ? value.receiverName
          : value.senderName,
      secretQuestion: '',
      secretKey: '',
      contents: [],
    }));
    // console.log({
    //   member: true,
    //   sender: myInfo!.email,
    //   receiver:
    //     myInfo!.email !== value.receiverName
    //       ? value.receiverName
    //       : value.senderName,
    //   secretQuestion: '',
    //   secretKey: '',
    //   contents: [],
    // });
  };
  return (
    <section css={FriendSection}>
      <ul>
        {sortedFriendList.map((value, index) => {
          return (
            <li key={index} css={FriendListItem}>
              <div css={FriendListNumber}>
                <span css={SrOnlyStyle}>{index}</span>
              </div>
              <span>
                {value.receiverId === myInfo!.id
                  ? value.senderName
                  : value.receiverName}
              </span>
              <Link to={`/writeLetter`}>
                <FriendButton
                  size="ssmall"
                  colorType="default"
                  onClick={() => handleMoveWriteLetter(value)}
                >
                  편지 발송
                </FriendButton>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export const FriendSection = css`
  margin: 0 auto;
  ${mq({
    width: ['90%', '80%', '75%', '75%'],
  })};
`;

export const FriendListItem = css`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  ${mq({
    margin: ['17px auto', '16px auto', '17px auto', '21px auto'],
  })};

  & > span {
    text-align: start;
    margin-bottom: 3px;

    ${mq({
      flexGrow: '1',
      fontSize: ['21px', '24px', '25px', ' 26px'],
    })};
  }
`;
export const FriendListNumber = css`
  display: inline-block;
  margin: auto 0;
  border-radius: 50%;
  ${mq({
    width: ['27px', '32px', '37px', ' 40px'],
    height: ['27px', '32px', '37px', ' 40px'],
    background: `${Common.colors.lightMint}`,
  })};
`;
