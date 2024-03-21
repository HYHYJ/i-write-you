/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import loading from '/loading.png';

function Loading() {
  return (
    <div css={wrapper}>
      <img css={img} src={loading} alt="로딩중" aria-hidden="true" />
      <p css={guide}>로딩중...</p>
    </div>
  );
}

const wrapper = css({
  backgroundColor: '#ed94a1',
  width: '100%',
  height: '100%',
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

export default Loading;
