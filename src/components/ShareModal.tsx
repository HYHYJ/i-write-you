/** @jsxImportSource @emotion/react */
import { KAKAO_KEY } from '@/client';
import { letterState } from '@/recoil/atom/useLetter';
import { Common } from '@/style/Common';
import { mq } from '@/style/mq';
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { BiCodeCurly } from 'react-icons/bi';
import { FaLine } from 'react-icons/fa6';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

function ShareModal({ letterId }: { letterId: number | undefined }) {
  const [letter] = useRecoilState(letterState);
  const { Kakao } = window;
  const link = `http://localhost:5173/#/nonMember/${letterId}`;

  /* 클립보드 공유 */
  const handleClipboard = () => {
    window.navigator.clipboard.writeText(link);

    try {
      toast.success('클립보드 복사 완료!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    } catch (err) {
      toast.warning('잠시후 다시 시도해주세요', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  /* 카카오톡 공유 */
  const handleKakao = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '📮누군가의 편지가 도착했습니다',
        description: '마음을 전해드려요📫',
        imageUrl: 'https://ifh.cc/g/yxmvt9.jpg',
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
      },
    });
  };

  /* 라인 공유 */
  const handleLine = () => {
    const title = '📮 누군가의 편지가 도착했습니다';
    const summary = 'I WRITE YOU';

    const line =
      'http://line.me/R/msg/text/?' +
      encodeURIComponent(title) +
      '　　' +
      encodeURIComponent(summary) +
      '　　' +
      encodeURIComponent(link);

    window.open(line);
  };

  useEffect(() => {
    Kakao.cleanup();

    Kakao.init(KAKAO_KEY);
  });

  return (
    <section css={modalWrapper}>
      <div css={modal}>
        <p css={reveiver}>{letter.receiver}님에게 공유하기</p>
        <div css={buttonWrapper}>
          <button
            type="button"
            css={buttonItem('clip')}
            onClick={handleClipboard}
          >
            <BiCodeCurly css={buttonImg('clip')} />
          </button>
          <button type="button" css={buttonItem('kakao')} onClick={handleKakao}>
            <RiKakaoTalkFill css={buttonImg('kakao')} />
          </button>
          <button type="button" css={buttonItem('line')} onClick={handleLine}>
            <FaLine css={buttonImg('line')} />
          </button>
        </div>
        <Link to="/hotel" css={moveHotel}>
          호텔로 이동
        </Link>
      </div>
      <ToastContainer />
    </section>
  );
}

const modalWrapper = css({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: `rgba(105, 105, 105, 0.5)`,
});

const modal = mq({
  position: 'absolute',
  bottom: '20%',
  left: '50%',
  transform: 'translateX(-50%)',
  boxSizing: 'border-box',
  backgroundColor: 'white',
  width: ['80%', '40%', '40%', '40%'],
  padding: '30px 0',
  borderRadius: '5px',
  textAlign: 'center',
});

const reveiver = css({
  fontSize: '20px',
});

const buttonWrapper = css({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  margin: '20px 0',
});

const buttonItem = (sns: string) =>
  css({
    width: '40px',
    height: '40px',
    background: `${
      sns === 'kakao'
        ? '#F7E600'
        : sns === 'line'
        ? '#06C755'
        : Common.colors.darkPurple
    }`,
    border: 'none',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  });

const buttonImg = (sns: string) =>
  css({
    width: '100%',
    height: '100%',
    color: `${sns === 'kakao' ? '#3A1D1D' : 'white'}`,
  });

const moveHotel = css({
  fontFamily: 'InkLipquid',
  color: 'black',
  textDecoration: 'none',
  fontSize: '20px',
});

export default ShareModal;
