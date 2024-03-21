/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { mq } from '@/style/mq';
import { Helmet } from 'react-helmet-async';
import { Common } from '@/style/Common';
import FreindList from '@/components/FriendList';
import { useEffect, useState } from 'react';
import FriendReceived from '@/components/FriendReceived';
import { useNavigate } from 'react-router-dom';
import FriendNavButton from '@/components/FriendNavButton';
import { supabase } from '@/client';

import { useRecoilState } from 'recoil';
import { usersInfoState, myInfoState } from '@/recoil/atom/useFriend';

export default function Friend() {
  // const main = document.querySelector('main');
  // main?.setAttribute('style', 'background: #2D3A6F');

  const [nav, setNav] = useState('목록');
  const navName = ['목록', '요청'];
  const navigate = useNavigate();

  // 본인 uuid 값와 email 값
  const [, setMyInfo] = useRecoilState(myInfoState);

  // 다른 사용자들 uuid 값와 email 값 리스트
  const [, setUsersInfo] = useRecoilState(usersInfoState);

  // // 본인 값 불러오기
  // useEffect(() => {
  //   const findMyId = async () => {
  //     try {
  //       const {
  //         data: { user },
  //       } = await supabase.auth.getUser();

  //       setMyInfo(() => ({ id: user!.id, email: '' }));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   findMyId();

  //   const fetchId = async () => {
  //     try {
  //       const { data } = await supabase
  //         .from('userInfo')
  //         .select('*')
  //         .eq('userId', myInfo.id);

  //       setMyInfo(() => ({ id: myInfo!.id, email: data[0].hotelName }));
  //     } catch (error) {
  //       console.log('Error fetching UsersInfo: ', error);
  //     }
  //   };
  //   fetchId();
  // }, []);
  //* 본인 값 불러오고 그 값으로 자신의 hotelName 가져오기
  useEffect(() => {
    const findAndFetchMyId = async () => {
      try {
        // 사용자 기본 정보를 불러옵니다.
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          // userId를 이용해 추가 정보를 조회합니다.
          const { data: userInfo, error } = await supabase
            .from('userInfo')
            .select('*')
            .eq('userId', user.id);

          // 에러가 없으면 상태를 한 번만 업데이트합니다.
          if (!error && userInfo.length > 0) {
            // 사용자 정보와 추가 정보 모두를 상태에 설정합니다.
            setMyInfo({ id: user.id, email: userInfo[0].hotelName });
            //localStorage에 나의 정보 담기
            localStorage.setItem(
              'myInfo',
              JSON.stringify({ id: user.id, email: userInfo[0].hotelName })
            );
          } else {
            // userInfo가 비어있거나 오류가 발생한 경우, 사용자 기본 정보만으로 상태를 업데이트합니다.
            setMyInfo({ id: user.id, email: '' });
          }
        }
      } catch (error) {
        console.log('Error fetching user info: ', error);
      }
    };

    findAndFetchMyId();
  }, []);

  // 다른 사용자 값 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await supabase
          .from('userInfo')
          .select('id, hotelName');
        if (data && data.length > 0) {
          const usersInfoData = data.map((item: any) => ({
            id: item.id,
            email: item.hotelName,
          }));

          setUsersInfo(() => [...usersInfoData]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      <Helmet>
        <title>친구 목록</title>
      </Helmet>
      <section css={FriendSection}>
        <div css={FriendBox}>
          <header css={FreindHeader}>
            <h2>친구</h2>
            <button
              css={FriendBackButton}
              onClick={() => navigate(-1)}
              type="button"
            >
              <img src="/public/back.png" alt="뒤로 가기" />
            </button>
          </header>
          <section>
            <nav
              css={css({
                display: 'flex',
                justifyContent: 'center',
              })}
            >
              <ul
                css={mq({
                  display: 'flex',
                  justifyContent: 'center',
                  borderBottom: `solid 2px ${Common.colors.darkNavy}`,
                  width: ['90%', '80%', '75%', '75%'],
                })}
              >
                {navName.map((i, index) => {
                  return (
                    <FriendNavButton
                      key={index}
                      value={i}
                      index={index}
                      state={nav}
                      onClick={() => setNav(i)}
                    />
                  );
                })}
              </ul>
            </nav>
            {nav === '목록' ? <FreindList /> : <FriendReceived />}
          </section>
        </div>
      </section>
    </>
  );
}

export const FriendSection = css`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: ${Common.colors.darkNavy};
  text-align: center;
`;

export const FriendBox = mq({
  width: ['100%', '90%', '85%', '792px'],
  height: ['90%', '90%', '85%', '792px'],
  background: `${Common.colors.lightPink}`,
  margin: 'auto',
  padding: ['30px 0', '32px 0', '38px 0', '40px 0'],
  color: `${Common.colors.darkNavy}`,
  'border-radius': '40px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

export const FreindHeader = css`
  position: relative;
  & > h2 {
    ${mq({
      fontSize: ['23px', '25px', '30px', ' 32px'],
    })}
  }
`;

export const FriendBackButton = css`
  border: none;
  background: transparent;
  position: absolute;
  height: 5px;
  top: 0;
  left: 6%;
  & > img {
    ${mq({
      height: ['29px', '30px', '35px', ' 38px'],
    })}
  }
`;
