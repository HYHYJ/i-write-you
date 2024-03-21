/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import notFound from '/404.png';
import { Common } from '@/style/Common';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>페이지를 찾을 수 없습니다</title>
      </Helmet>
      <div css={wrapper}>
        <img
          css={img}
          src={notFound}
          alt="페이지를 찾을 수 없습니다"
          aria-hidden="true"
        />
        <p css={guide}>페이지를 찾을 수 없습니다</p>
        <span>올바른 URL을 입력하였는지 확인해주세요</span>
        <button css={back} type="button" onClick={() => navigate(-1)}>
          이전페이지로 돌아가기
        </button>
      </div>
    </>
  );
}

const wrapper = css({
  backgroundColor: '#ed94a1',
  width: '100%',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const img = css({ width: '300px', height: 'auto' });

const guide = css({
  fontSize: '30px',
  marginTop: '10px',
});

const back = css({
  backgroundColor: Common.colors.darkPurple,
  color: 'white',
  border: 'none',
  borderRadius: '30px',
  padding: '5px 10px',
  cursor: 'pointer',
  marginTop: '10px',
});

export default NotFound;
