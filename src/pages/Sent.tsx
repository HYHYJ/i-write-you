/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/client';
import { css, keyframes } from '@emotion/react';

import MenuButton from '@/components/MenuButton';
import { debounce } from '@/util/debounce';
import { letterSentRecent } from '@/util/letterSentRecent';
import { mq } from '@/style/mq';
import { Common } from '@/style/Common';
import LetterPagination from '@/components/LetterPagination';

type SentItemProp = {
  id: number;
  sender: string;
  created_at: string;
};

//# user filter
// const authInfo = await supabase.auth.getSession();
// console.log(authInfo.data.session?.user);

export default function Sent() {
  const [sentData, setSentData] = useState<SentItemProp[] | null>(null);
  const [emptyData, setEmptyData] = useState<Array<number> | null>([]);
  const [hover, setHover] = useState<number | null>(null);

  // 페이지네이션
  const [limit] = useState(12);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    const fetchSent = async () => {
      try {
        const { data } = await supabase
          .from('letter')
          .select('id, created_at, sender');
        // filter: 로그인 - receiver 일치할 경우만
        setSentData(
          data!.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchSent();
  }, []);

  useEffect(() => {
    if (sentData && sentData?.length % limit != 0) {
      const emptyData = Array(limit - (sentData!.length % limit))
        .fill(0)
        .map((v, i) => v + i);
      setEmptyData(emptyData);
    }
  }, [sentData, setSentData, limit]);

  const numPages = sentData && Math.ceil(sentData!.length / limit);

  return (
    <section css={background}>
      <h1 css={srOnly}>보낸 편지함</h1>
      <div css={gridLayout}>
        {/* 보낸 편지 */}
        {sentData?.slice(offset, offset + limit).map((item: SentItemProp) => {
          const isRecent = letterSentRecent(item.created_at);
          const animationStyle = isRecent
            ? css`
                animation: ${twinkleEffect} 2s alternate infinite;
              `
            : '';

          return (
            <div css={letterBoxLayout} key={item.id}>
              <div
                css={nameAnimationLayout}
                onMouseEnter={() => setHover(item.id)}
                onMouseLeave={debounce(() => setHover(null))}
              >
                <dl css={namePlate}>
                  <dt css={srOnly}>받는 사람</dt>
                  <dd css={name}>{item.sender}</dd>
                </dl>
                {hover == item.id && <div css={hoverName}>{item.sender}</div>}
              </div>
              <div css={namePlateLine} aria-hidden />
              <Link
                css={letterBox}
                to={`/sentRead/${item.id}`}
                aria-label="보낸 편지함"
              >
                <img css={animationStyle} src="/key.png" alt="키" />
              </Link>
            </div>
          );
        })}
        {/* 빈 편지함 */}
        {page === numPages &&
          emptyData!.length > 0 &&
          emptyData?.map((_, index) => (
            <div css={letterBoxLayout} key={index}>
              <div css={namePlate} />
              <div css={namePlateLine} aria-hidden />
              <div css={letterBox} aria-label="빈 편지함" />
            </div>
          ))}
      </div>
      <img src="/frontMan.png" alt="지배인" css={frontMan} />
      <footer css={footerlayout}>
        <LetterPagination
          total={sentData?.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
      <MenuButton received />
    </section>
  );
}

const srOnly = css({
  clip: 'rect(0.0625rem, 0.0625rem, 0.0625rem, 0.0625rem)',
  clipPath: 'inset(50%)',
  height: '0.0625rem',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '0.0625rem',
  margin: '-1px',
});

const background = css({
  position: 'relative',
  width: '100%',
  background: `${Common.colors.brown}`,
  margin: 'auto 0',
  paddingTop: '2rem',
  paddingBottom: '265px',
  overflow: 'hidden',
});

const name = css({
  position: 'relative',
  top: '55%',
  left: '50%',
  transform: 'translateX(-50%) translateY(-50%)',
  width: '70%',
  fontSize: '1.875rem',
  letterSpacing: '-0.1094rem',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const gridLayout = mq({
  display: 'grid',
  gridTemplateColumns: [
    'repeat(2, 1fr)',
    'repeat(3, 1fr)',
    'repeat(4, 1fr)',
    'repeat(4, 1fr)',
  ],
  rowGap: '2.25rem',
});

const letterBoxLayout = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const nameAnimationLayout = css({
  position: 'relative',
});

const namePlate = css({
  width: ' 7.875rem',
  height: '3.0625rem',
  background: `url('/namePlate.png') no-repeat center / cover`,
});

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const hoverName = css({
  position: 'absolute',
  top: '0',
  width: 'max-contents',
  padding: '0.125rem 0.75rem',
  border: `1px solid ${Common.colors.lightYellow}`,
  borderRadius: '0.375rem',
  zIndex: 1,
  background: '#2D3A6F',
  color: `${Common.colors.lightYellow}`,
  fontSize: '1.5rem',
  letterSpacing: '-0.1094rem',
  textAlign: 'center',
  animation: `${fadeIn} 0.3s ease-in`,
});

const namePlateLine = css({
  width: '0.1875rem',
  height: '0.75rem',
  background: '#A78F6C',
});

const letterBox = css({
  position: 'relative',
  width: '10.6875rem',
  height: '11.0625rem',
  background: `${Common.colors.darkBrown}`,
  '& img': {
    position: 'absolute',
    top: 0,
    left: '-1.25rem',
    width: '9.5rem',
    height: '10.625rem',
    objectFit: 'cover',
  },
});

const frontMan = css({
  position: 'fixed',
  left: '50%',
  bottom: 0,
  width: '20.5625rem',
  transform: 'translateX(-50%)',
});

const twinkleEffect = keyframes`
 0% {
    filter: drop-shadow(0 0 3px rgb(245, 198, 159, 0.2));
  }

  50% {
    filter: drop-shadow(0 0 18px rgb(245, 198, 159, 0.7));
  }

  100% {
    filter: drop-shadow(0 0 3px rgb(245, 198, 159, 0.2));
  }
`;

const footerlayout = css({
  display: 'flex',
  // justifyContent: 'center',
});
