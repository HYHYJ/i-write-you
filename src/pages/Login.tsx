/** @jsxImportSource @emotion/react */

import { Common } from '@/style/Common';
import { mq } from '@/style/mq';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { supabase } from '@/supabaseClient';
import { useEffect, useState } from 'react';

export default function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkLogin() {
      const authInfo = await supabase.auth.getSession();
      const session = authInfo.data.session;
      setIsLoggedIn(session !== null);
    }

    checkLogin();
  }, []);

  const main = document.querySelector('main');
  main?.setAttribute('style', 'background: #2D3A6F');

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.replace('/');
  };

  return (
    <>
      <Helmet>
        <title>로그인</title>
      </Helmet>
      <section css={CardFlex}>
        <div css={InviteCard}>
          <h2 css={SrOnlyStyle}>로그인</h2>
          <img css={LoginTitleImage} src="/loginImage.png" />
          <form
            css={CardForm}
            action=""
            name="CardForm"
            className="CardForm"
            method="POST"
          >
            <fieldset
            /* css={css({ display: 'flex', 'flex-direction': 'column' })} */
            >
              <legend css={SrOnlyStyle}>로그인</legend>
              <label htmlFor="userId" css={SrOnlyStyle}>
                아이디
              </label>
              <input
                css={CardInput}
                id="userId"
                type="text"
                name="userId"
                placeholder="아이디"
                required
              />
              <label htmlFor="userPassword" css={SrOnlyStyle}>
                비밀번호
              </label>
              <input
                css={CardInput}
                type="password"
                id="userPassword"
                name="userPassword"
                placeholder="비밀번호"
              />
              <div css={CardButtonBox}>
                <Link
                  css={CardButton}
                  to="/Join"
                  id="JoinBtn"
                  aria-label="회원가입으로 바로가기"
                >
                  호텔 만들기
                </Link>
                <button
                  css={StampButton}
                  id="loginBtn"
                  aria-label="로그인 버튼"
                  type="submit"
                >
                  체크인
                </button>
              </div>
            </fieldset>
          </form>
          <div css={InviteCardRibbon}></div>

          {!isLoggedIn ? (
            <button
              id="login"
              css={{
                width: '200px',
                backgroundColor: '#2e2e2e',
                color: '#fff',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2px',
                margin: '0 auto',
                border: 'none',
                height: '40px',
                cursor: 'pointer',
                // & hover {
                //   backgroundColor: '#3e3e3e',
                // }
              }}
              onClick={() =>
                supabase.auth.signInWithOAuth({ provider: 'github' })
              }
            >
              <svg
                className="c-eSSyNk"
                fill="gray"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 30 30"
                width="21px"
                height="21px"
              >
                {' '}
                <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
              </svg>
              GitHub 로그인
            </button>
          ) : (
            <button
              onClick={handleLogout}
              id="logout"
              css={{
                width: '200px',
                backgroundColor: '#fff',
                color: '#000',
                borderRadius: '4px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2px',
                margin: '0 auto',
                border: 'none',
                height: '40px',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              로그아웃
            </button>
          )}
        </div>
      </section>
    </>
  );
}

export const CardForm = css`
  display: inline-block;
  width: 80%;
  margin: 0 auto;
  ${mq({
    width: ['82%', '78%', '70%', '73%'],
  })}
`;

export const CardFlex = mq({
  width: '100%',
  height: '100%',
  display: 'flex',
  background: `${Common.colors.darkNavy}`,
});

export const InviteCard = mq({
  position: 'relative',
  width: ['95%', '80%', '80%', '792px'],
  // height: ['270px', '340px', '440px', '470px'],
  background: `${Common.colors.lightPink}`,
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '10px',
  padding: ['14px 0', '15px 0', '18px 0', '20px 0'],
});

export const CardInput = css`
  ::placeholder {
    color: ${Common.colors.darkPurple};
  }
  :focus {
    border-bottom: 1px solid ${Common.colors.darkPurple};
  }
  outline: none;
  margin: 0 auto;
  border: none;
  background-color: transparent;
  color: ${Common.colors.darkNavy};

  ${mq({
    '&::placeholder': {
      fontSize: ['21px', '23px', '27px', '28px'],
    },
    fontSize: ['20px', '22px', '26px', '27px'],
    width: '100%',
    height: ['45px', '55px', '55px', '60px'],
    marginBottom: ['8px', '26px', '34px', '36px'],
  })}
`;

export const CardButtonBox = css`
  display: flex;
  justify-content: space-between;
  ${mq({
    marginTop: ['10px', '0px', '35px', '20px'],
  })}
`;

export const CardButton = css`
  text-decoration: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 10px 0;
  ${mq({
    fontSize: ['19px', '21px', '25px', '26px'],
  })};
  color: ${Common.colors.darkPurple};
`;

export const StampButton = css`
  ${CardButton}
  ${mq({
    fontSize: ['19px', '21px', '25px', '26px'],
  })};

  color: ${Common.colors.darkPurple};
  background: url('/stamp.png') no-repeat;
  background-position: center right;

  ${mq({
    fontSize: ['19px', '21px', '25px', '26px'],
    paddingRight: ['35px', '40px', '50px', '50px'],
    backgroundSize: ['35px', '40px', '50px', '50px'],
  })};
`;

export const LoginTitleImage = css`
  margin: 0 auto;

  ${mq({
    height: ['80px', '100px', '125px', '137px'],
    marginBottom: ['10px', '10px', '15px', '18px'],
    marginTop: ['0px', '0px', '10px', '10px'],
  })};
`;

export const InviteCardRibbon = css`
  position: absolute;
  top: 9px;
  right: -55px;
  transform: rotate(32deg);
  background: ${Common.colors.lightMint};
  ${mq({
    width: ['190px', '200px', '255px', '270px'],
    height: ['42px', '48px', '63px', '63px'],
  })};
`;

export const SrOnlyStyle = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
`;
