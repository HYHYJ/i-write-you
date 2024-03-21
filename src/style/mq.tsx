/** @jsxImportSource @emotion/react */
import { Common } from './Common';
import facepaint from 'facepaint';

// 모바일, 테블릿, 데스크탑 미디어 쿼리
const breakpoints = [576, 768, 992, 1200];

export const mq = facepaint(
  breakpoints.map((bp) => `@media (min-width: ${bp}px)`)
);

//공통 width 값
export const commonWidth = mq({
  width: ['100%', '100%', '100%', '992px'],
  minHeight: '100vh',
  background: `${Common.colors.lightYellow}`,
  margin: '0 auto',
});

//사용 예시

//<div css={commonWidth}>
// 컨텐츠
//</div>
