/** @jsxImportSource @emotion/react */
import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import { informationState } from '@/recoil/atom/useOpen';
import { Common } from '@/style/Common';
import { commonWidth } from '@/style/mq';
import { css } from '@emotion/react';
import { KeyboardEvent, MouseEvent } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

export default function RootLayout() {
  const navigate = useNavigate();
  const [open, setOpen] = useRecoilState(informationState);

  /* 모달창 닫기 */
  const closeModalKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const closeModalClick = (e: MouseEvent) => {
    const wrapper = document.querySelector('.informationModal');

    if (e.target === wrapper) {
      setOpen(false);
    }
  };

  return (
    <>
      <Header />
      <main css={commonWidth}>
        <Outlet />
        {open && (
          <div
            css={informationModal}
            className="informationModal"
            onKeyDown={closeModalKeyDown}
            onClick={closeModalClick}
          >
            <div css={modal}>
              <p>
                <span css={writeYou}>"I WRITE YOU"</span>는 마음을 전달할 수
                있는 곳입니다.
              </p>
              <p>자신만의 호텔을 만들어 마음을 보내고</p>
              <p>다른 사람에게 받은 마음을 저장할 수 있습니다.</p>
              <p>소중한 사람에게 마음을 전달해보세요</p>
              <button
                type="button"
                css={create}
                onClick={() => {
                  navigate('/join');
                  setOpen(!open);
                }}
              >
                📮 나만의 호텔만들러가기 📮
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

const informationModal = css({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: '1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: `rgba(105, 105, 105, 0.5)`,
  width: '100%',
  height: '100vh',
});

const modal = css({
  fontFamily: 'GangwonEduHyeonokT_OTFMediumA',
  fontSize: '20px',
  width: '350px',
  height: '200px',
  backgroundColor: Common.colors.lightYellow,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'center',
});

const writeYou = css({
  fontSize: '22px',
  color: Common.colors.darkPurple,
});

const create = css({
  fontFamily: 'GangwonEduHyeonokT_OTFMediumA',
  fontSize: '22px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
});
