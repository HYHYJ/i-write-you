/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { mq } from '@/style/mq';
import { Common } from '@/style/Common';

import FriendButton from './FriendButton';
import { SrOnlyStyle } from '@/pages/Login';
import { FriendListItem, FriendListNumber } from './FriendList';
import { FriendRequestBtnBox } from './FriendReceived';
import { supabase } from '@/client';

import { useRecoilState } from 'recoil';
import { usersInfoState, myInfoState } from '@/recoil/atom/useFriend';
import { useCallback, useEffect, useState } from 'react';

export default function FriendRequestForm() {
  // 본인 uuid 값와 email 값
  const [myInfo] = useRecoilState(myInfoState);

  // 다른 사용자들 uuid 값와 email 값 리스트
  const [usersInfo] = useRecoilState(usersInfoState);

  // let filterUsersInfo: infoType[] = [];
  const [filterUsersInfo, setFilterUsersInfo] = useState<infoType[]>([]);

  //* 사용자들 정보에서 내정보 필터링
  //TODO: 친구 요청 할때 이미 요청했거나, 친구인 사용자는 제외하기
  useEffect(() => {
    const fetchFriendList = async () => {
      try {
        const { data } = await supabase
          .from('friends')
          .select('*')
          .or(`senderId.eq.${myInfo.id},receiverId.eq.${myInfo.id}`);

        //친구 요청 할때 이미 요청했거나, 친구인 사용자
        const friendList = data!.map((i) =>
          i.senderId === myInfo.id ? i.receiverName : i.senderName
        );

        //*본인과 친구 요청 할때 이미 요청했거나, 친구인 사용자 필터링
        setFilterUsersInfo(
          usersInfo.filter(
            (i) => i.id !== myInfo.id && !friendList.includes(i.email)
          )
        );
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
      // setFilterUsersInfo((prev) => ({
      //   prev.filter((i)=>{})})
    };
    fetchFriendList();
  }, []);

  //친구 요청 버튼
  const handleFriendRequest = useCallback(
    async (value: infoType) => {
      const { data, error } = await supabase.from('friends').upsert([
        {
          senderId: myInfo.id,
          senderName: myInfo.email,
          receiverId: value.id,
          receiverName: value.email,
          status: false,
        },
      ]);
      if (error) {
        console.error('업데이트 중 오류 발생: ', error);
      } else {
        //TODO: 친구요청하면 리스트에서 바로 사라지게하기
        // setFilterUsersInfo(
        //   (prev) =>
        // prev.filter(
        //   (i) =>
        //   i.senderId !== value.senderId ||
        //   i.receiverId !== value.receiverId
        // )
        // );
        console.log('업데이트 성공: ', data);
      }
    },
    [myInfo.id, myInfo.email]
  );

  return (
    <>
      <form css={Requestform}>
        <label css={SrOnlyStyle} htmlFor="friendRequest">
          친구 요청 보내기
        </label>

        <input
          css={FriendRequestInput}
          id="friendRequest"
          name="friendRequest"
          type="text"
          placeholder="(7자~15자)"
          maxLength={15}
        />
        {/* <img src="/public/pass.png" /> */}

        <FriendButton size="small" colorType="default">
          검색
        </FriendButton>
      </form>
      <ul>
        {filterUsersInfo.map((value, index) => {
          return (
            <li key={index} css={FriendListItem}>
              <div css={FriendListNumber}>
                <span css={SrOnlyStyle}>{index}</span>
              </div>
              <span>{value.email}</span>
              <div css={FriendRequestBtnBox}>
                <FriendButton
                  size="ssmall"
                  colorType="default"
                  onClick={() => handleFriendRequest(value)}
                >
                  친구 요청
                </FriendButton>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
export const Requestform = css`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  position: relative;
  & > img {
    position: absolute;
    right: 10px;
    top: 5px;
  }
  ${mq({
    height: ['38px', '43px', '46px', '48px'],
  })}
`;

export const FriendRequestInput = css`
  ::placeholder {
    color: ${Common.colors.lightMint};
  }
  :focus {
    border: 2px solid ${Common.colors.lightMint};
  }
  outline: none;

  background: url('/public/noPass.png') no-repeat;
  background: url('/public/pass.png') no-repeat;
  background-position: right 10px top 50%;
  background-size: 6%;

  padding: 0 60px 0 20px;
  border: none;
  border-radius: 25px;
  background-color: white;

  color: ${Common.colors.lightMint};

  ${mq({
    '&::placeholder': {
      fontSize: ['16px', '20px', '20px', ' 22px'],
    },
    fontSize: ['20px', '22px', '23px', ' 24px'],
    width: ['55%', '59%', '63%', '67%'],
    height: ['33px', '43px', '43px', '45px'],
    marginBottom: ['8px', '20px', '20px', '30px'],
  })}
`;
