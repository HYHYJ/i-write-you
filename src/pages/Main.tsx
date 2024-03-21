/** @jsxImportSource @emotion/react */
import { informationState } from '@/recoil/atom/useOpen';
import { Common } from '@/style/Common';
import { mq } from '@/style/mq';
import { css } from '@emotion/react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/supabaseClient';
import { useRecoilState } from 'recoil';
import { TbHandClick } from 'react-icons/tb';
import { clickAnimation } from '@/util/clickAnimation';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSession from '@/store/useSession';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

export default function Main() {
  const [open, setOpen] = useRecoilState(informationState);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const session = useSession();

  const handleButtonClick = () => {
    if (session) {
      navigate('/hotel');
    } else {
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div css={div}>
        <p css={title}>
          <span>I WRITE </span>
          <span css={you}>YOU</span>
          <button
            type="button"
            css={information}
            onClick={() => setOpen(!open)}
          >
            ?
          </button>
        </p>
        <div css={background}>
          <span css={subTitle}>Save Memories</span>
          <button type="button" css={clickBtn} onClick={handleButtonClick}>
            <TbHandClick css={click} />
            check-in
          </button>
        </div>
      </div>
      <Modal open={showModal} onClose={closeModal} center>
        {!session && (
          <section
            css={{
              maxWidth: '400px',
              minWidth: '250px',
              margin: '0 auto',
              paddingTop: '10px',
              paddingBottom: '10px',
            }}
          >
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
              providers={['github']}
            />
          </section>
        )}
      </Modal>
    </>
  );
}

const div = css({
  background: '#ed94a1',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  height: '100vh',
});

const title = mq({
  position: 'absolute',
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  zIndex: 1,
  fontSize: ['25vw', '20vw', '20vw', '200px'],
  color: Common.colors.lightYellow,
  width: '100%',
});

const information = css({
  position: 'absolute',
  bottom: '30%',
  right: '10px',
  border: `none`,
  backgroundColor: Common.colors.darkPurple,
  color: 'white',
  borderRadius: '50%',
  fontSize: '20px',
  width: '30px',
  height: '30px',
  cursor: 'pointer',
});

const you = css({
  position: 'absolute',
  bottom: '-60%',
  left: '15px',
});

const background = css({
  position: 'relative',
  width: '100%',
  height: '80vh',
  background: `${Common.colors.mint} url("/hotel.png") no-repeat center 85%`,
  backgroundSize: 'auto 70%',
  transform: 'translateY(30%)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
});

const clickBtn = css({
  position: 'absolute',
  bottom: '50px',
  right: '50%',
  transform: 'translateX(50%) translateY(7%)',
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'InkLipquid',
  fontSize: '30px',
  color: Common.colors.darkPurple,
});

const click = css({
  color: Common.colors.darkPurple,
  width: '70px',
  height: '50px',
  animation: `${clickAnimation} 1s linear infinite`,
  '&:hover': css({
    transform: 'scale(110%)',
  }),
});

const subTitle = mq({
  position: 'absolute',
  top: '90px',
  right: '-80px',
  fontSize: '30px',
  transform: 'rotate(90deg)',
  color: Common.colors.lightYellow,
});
