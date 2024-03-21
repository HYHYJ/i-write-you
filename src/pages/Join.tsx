/** @jsxImportSource @emotion/react */

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  CardFlex,
  InviteCardRibbon,
  CardButton,
  CardForm,
  StampButton,
  SrOnlyStyle,
} from './Login';
import { Common } from '@/style/Common';
import { mq } from '@/style/mq';
import { css } from '@emotion/react';

export default function Login() {
  const main = document.querySelector('main');
  main?.setAttribute('style', 'background: #2D3A6F');

  return (
    <>
      <Helmet>
        <title>회원가입</title>
      </Helmet>
      <section css={CardFlex}>
        <div css={InviteCard}>
          <h2 css={SrOnlyStyle}>회원가입</h2>
          <h3 css={JoinTitle}>
            당신의 <br /> 호텔을 만들어주세요
          </h3>
          <form
            css={CardForm}
            action=""
            name="CardForm"
            className="CardForm"
            method="POST"
          >
            <fieldset>
              <legend css={SrOnlyStyle}>로그인</legend>
              <label css={JoinLabel} htmlFor="userId">
                아이디
              </label>
              <input
                css={JoinInput}
                id="userId"
                type="text"
                name="userId"
                required
                placeholder="(7자~15자)"
              />
              <label css={JoinLabel} htmlFor="userPassword">
                비밀번호
              </label>
              <input
                css={JoinInput}
                type="password"
                id="userPassword"
                name="userPassword"
                placeholder="(7자~15자, 특수문자 or 숫자 포함)"
              />
              <label css={JoinLabel} htmlFor="checkPassword">
                비밀번호 확인
              </label>
              <input
                css={JoinInput}
                type="password"
                id="checkPassword"
                name="checkPassword"
              />
              <label css={JoinLabel} htmlFor="hotelName">
                호텔 이름을 무엇으로 하시겠습니까?
              </label>
              <input
                css={JoinInput}
                type="text"
                id="hotelName"
                name="hotelName"
                placeholder="(2자~13자)"
                maxLength={13}
              />
              <div css={JoinButtonBox}>
                <Link
                  css={[JoinButton]}
                  to="/login"
                  id="cancelBtn"
                  aria-label="회원가입 취소 버튼"
                >
                  취소
                </Link>
                <Link
                  css={StampButton}
                  to="/login"
                  id="joinBtn"
                  aria-label="회원가입 버튼"
                  type="submit"
                >
                  만들기
                </Link>
              </div>
            </fieldset>
          </form>
          <div css={InviteCardRibbon}></div>
        </div>
      </section>
    </>
  );
}

export const JoinTitle = css`
  text-align: center;
  ${mq({
    fontSize: ['26px', '30px', '32px', '39px'],
    'margin-bottom': ['15px', '19px', '23px', '30px'],
  })}
`;

export const InviteCard = mq({
  position: 'relative',
  width: ['95%', '80%', '80%', '792px'],
  background: `${Common.colors.lightPink}`,
  margin: 'auto',
  padding: ['33px 0', '39px 0', '50px 0', '60px 0'],
  display: 'flex',
  'flex-direction': 'column',
  'border-radius': '10px',
});

export const JoinLabel = css`
  color: ${Common.colors.darkPurple};
  ${mq({
    fontSize: ['18px', '20px', '24px', '25px'],
  })}
`;

export const JoinInput = css`
  margin: 0 auto;
  border: none;
  border-bottom: 1px solid ${Common.colors.darkPurple};
  outline: none;
  background-color: transparent;
  color: ${Common.colors.darkNavy};

  ${mq({
    '&::placeholder': {
      fontSize: ['13px', '15px', '19px', '21px'],
      color: `${Common.colors.writeBackground}`,
    },
    fontSize: ['20px', '22px', '26px', '27px'],
    width: '100%',
    height: ['39px', '40px', '45px', '47px'],
    'margin-bottom': ['14px', '15px', '25px', '35px'],
  })}
`;

export const JoinButton = css`
  ${CardButton}
  ${mq({
    margin: ['0 50px', '0 72px', '0 78px', '0 80px'],
  })}
`;

export const JoinButtonBox = css`
  display: flex;
  justify-content: end;
  ${mq({
    'margin-top': ['35px', '40px', '60px', '65px'],
  })}
`;
