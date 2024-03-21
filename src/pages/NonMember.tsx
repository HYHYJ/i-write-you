/** @jsxImportSource @emotion/react */

import { supabase } from '@/client';
import Loading from '@/components/Loading';
import { Common } from '@/style/Common';
import { css } from '@emotion/react';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import gift from '/gift.png';
import { mq } from '@/style/mq';

function NonMember() {
  const navigate = useNavigate();
  const { id } = useParams();
  const keyRef = useRef<HTMLInputElement | null>(null);
  const [letter, setLetter] = useState<LetterState | null>(null);
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [codeModal, setCodeModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [windowSize, setWindowSize] = useState(false);

  /* 엔터키 누를 경우 암호코드 일치 확인 */
  const clickButton = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm(letter?.secretKey);
    }
  };

  /* 암호코드 일치 확인 */
  const handleConfirm = (key: string | undefined) => {
    if (keyRef.current) {
      if (key === keyRef.current.value) {
        setCodeModal(false);
      } else {
        toast.warn('코드가 일치하지 않습니다', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    }
  };

  useEffect(() => {
    const size = window.innerWidth;

    if (size < 380) {
      setWindowSize(true);
    }

    /* 인풋 포커스 */
    const keyInput = document.querySelector<HTMLInputElement>('.key');

    if (keyInput) {
      keyInput.focus();
    }

    /* 데이터 가져오기 */
    const getLetter = async () => {
      const { data } = await supabase
        .from('letter')
        .select('*')
        .eq('id', `${id}`);

      if (data) {
        setLetter(data[0]);
        setLoading(true);

        if (data[0].attachment) {
          const imgUrl = await supabase.storage
            .from('letter')
            .getPublicUrl(`attachment/${id}.png`).data.publicUrl;

          setAttachmentUrl(imgUrl);
        }
      }
    };

    getLetter();
  }, []);

  console.log(windowSize);

  return (
    <>
      <Helmet>{loading && <title>{letter?.sender}님의 편지</title>}</Helmet>
      <div css={wrapper(loading)}>
        {!loading && <Loading />}
        {loading && (
          <>
            <section css={etc}>
              <h3 css={sender}>{letter?.sender}님으로부터</h3>
              <img
                css={giftImg(windowSize)}
                src={gift}
                alt="열쇠"
                aria-hidden={true}
              />
              <button type="button" css={reply} onClick={() => navigate('/')}>
                답장하기
              </button>
            </section>
            <section
              css={letterWrapper(letter?.writingPad ? letter?.writingPad : 0)}
            >
              <p css={contents}>
                <p css={receiver}>{letter?.receiver}에게</p>
                {letter?.attachment && (
                  <img css={attachment} src={attachmentUrl} alt="첨부파일" />
                )}
                {letter?.contents.map((v, i) => (
                  <span css={line} key={i}>
                    {v}
                  </span>
                ))}
              </p>
            </section>
            {codeModal && (
              <section css={secretModalWrapper}>
                <div css={secretModal}>
                  <p css={question}>{letter?.secretQuestion}</p>
                  <input
                    type="text"
                    css={key}
                    maxLength={4}
                    className="key"
                    ref={keyRef}
                    onKeyDown={clickButton}
                    placeholder="4자 이내"
                  />
                  <button
                    type="button"
                    css={submit}
                    onClick={() => handleConfirm(letter?.secretKey)}
                  >
                    코드 전송
                  </button>
                  <ToastContainer />
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </>
  );
}

const wrapper = (loading: boolean) =>
  css({
    boxSizing: 'border-box',
    backgroundColor: Common.colors.darkPurple,

    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${loading ? '30px 0' : '0px'}`,
    position: 'relative',
  });

const etc = mq({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: ['90%', '70%', '70%', '70%'],
  fontSize: '20px',
  color: 'white',
  position: 'relative',
});

const sender = css({
  fontFamily: 'GowunBatang-Regular',
});

const giftImg = (windowSize: boolean) =>
  mq({
    position: 'absolute',
    top: ['-40%', '-50%', '-50%', '-50%'],
    left: '50%',
    transform: 'translate(-50% -50%)',
    width: ['30px', '40px', '40px', '40px'],
    height: 'auto',
    opacity: `${windowSize ? '0' : '1'}`,
  });

const reply = css({
  fontFamily: 'GowunBatang-Regular',
  fontSize: '18px',
  color: 'white',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
});

const letterWrapper = (index: number) =>
  mq({
    boxSizing: 'border-box',
    width: ['90%', '70%', '70%', '70%'],
    height: '93%',
    background: `url("bg/letter${index}.jpg") no-repeat center`,
    backgroundSize: 'cover',
    overflowY: 'auto',
  });

const receiver = css({ textAlign: 'left', width: '100%', fontSize: '30px' });

const contents = css({
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  fontFamily: 'GangwonEduHyeonokT_OTFMediumA',
  fontSize: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px 30px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
});

const attachment = css({
  width: '60%',
  maxWidth: '600px',
  height: 'auto',
  maxHeight: '500px',
  padding: '20px 0',
});

const line = css({
  display: 'inline-block',
  width: '100%',
});

const secretModalWrapper = css({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: `rgba(172, 122, 120, 0.975)`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const secretModal = mq({
  boxSizing: 'border-box',
  width: ['80%', '50%', '50%', '50%'],
  height: '300px',
  background: `url("/secretCode.png") no-repeat center`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 0',
});

const question = css({
  fontFamily: 'GowunBatang-Regular',
  fontSize: '30px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: '1',
});

const key = css({
  fontFamily: 'GowunBatang-Regular',
  width: '30%',
  height: '50px',
  fontSize: '25px',
  textAlign: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: `2px solid ${Common.colors.darkBrown}`,

  '&:focus': {
    outline: 'none',
  },
});

const submit = css({
  fontFamily: 'GowunBatang-Regular',
  flexBasis: '15%',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
});

export default NonMember;
