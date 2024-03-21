/** @jsxImportSource @emotion/react */
import MenuButton from '@/components/MenuButton';
import SelectWritingPad from '@/components/SelectWritingPad';
import { letterNumberState, letterState } from '@/recoil/atom/useLetter';
import { Common } from '@/style/Common';
import { css } from '@emotion/react';
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useRecoilState } from 'recoil';
import { supabase } from '@/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import ShareModal from '@/components/ShareModal';

export default function WriteLetter() {
  const [line, setLine] = useState('');
  const [photo, setPhoto] = useState('');
  const [havePhoto, setHavePhoto] = useState('첨부');
  const [translate, setTranslate] = useState(0);
  const [upload, setUpload] = useState(false);
  const [letterId, setLetterId] = useState(0);
  const [modal, setModal] = useState(false);
  const [letterIndex] = useRecoilState(letterNumberState);
  const [letter, setLetter] = useRecoilState(letterState);
  const navigate = useNavigate();
  const photoRef = useRef<HTMLInputElement | null>(null);

  /* 편지 작성하기 */
  const handleWritingLetter = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      setLetter((prev) => ({
        ...prev,
        contents: [...prev.contents, line.slice(line.lastIndexOf('\n') + 1)],
      }));
    }
  };

  /* 첨부파일 */
  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const photoFile = e.target.files[0];
      const photoUrl = URL.createObjectURL(photoFile);

      setPhoto(photoUrl);
      setHavePhoto('변경');

      setLetter((prev) => ({
        ...prev,
        attachment: true,
      }));
    }
  };

  /* 편지지 더보기 왼쪽 */
  const handleLeft = () => {
    if (translate > -10) {
      setTranslate(0);
    } else {
      setTranslate(translate + 400);
    }
  };

  /* 편지지 더보기 오른쪽 */
  const handleRight = () => {
    // const breakpoints = [576, 768, 992, 1200];
    const size = window.innerWidth;

    if (size <= 576) {
      setTranslate(Math.max(translate - 400, -2550));
    } else if (size <= 768) {
      setTranslate(Math.max(translate - 400, -2350));
    } else if (size <= 992) {
      setTranslate(Math.max(translate - 400, -2150));
    } else if (size >= 1200) {
      setTranslate(Math.max(translate - 400, -1920));
    }
  };

  /* supabase 업로드 */
  const uploadLetter = async () => {
    try {
      const { data }: { data: LetterState[] | null } = await supabase
        .from('letter')
        .insert(letter)
        .select();

      if (!letter.attachment && data) {
        if (data[0].id !== undefined) {
          setLetterId(data[0].id);
        }

        if (letter.member) {
          toast.success('전달 성공!', {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });

          setTimeout(() => {
            navigate(`/sentRead/${data[0].id}`);
          }, 1002);
        } else {
          setModal(true);
        }
      } else if (
        letter.attachment &&
        photoRef.current &&
        photoRef.current.files &&
        data
      ) {
        const attachment = photoRef.current?.files[0];

        await supabase.storage
          .from('letter')
          .upload(
            `attachment/${data[0].id}.${attachment.type.slice(6)}`,
            attachment,
            {
              contentType: 'image/*',
            }
          );

        if (data[0].id !== undefined) {
          setLetterId(data[0].id);
        }

        if (letter.member) {
          toast.success('전달 성공!', {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });

          setTimeout(() => {
            navigate(`/sentRead/${data[0].id}`);
          }, 1002);
        } else {
          setModal(true);
        }
      }
    } catch (err) {
      console.error(err);

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

  /* 전송 버튼 클릭 */
  const submitLetter = (e: FormEvent) => {
    e.preventDefault();
    const lastIndex = line.lastIndexOf('\n');

    if (lastIndex > -1) {
      setLetter((prev) => ({
        ...prev,
        contents: [...prev.contents, line.slice(lastIndex + 1)],
      }));
    } else {
      setLetter((prev) => ({
        ...prev,
        contents: [...prev.contents, line],
      }));
    }

    setUpload(true);
  };

  useEffect(() => {
    if (upload) {
      if (letter.contents.length === 0) {
        setUpload(false);

        toast.error('편지 내용을 작성해주세요', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        uploadLetter();
        setUpload(false);
      }
    }
  }, [upload]);

  return (
    <>
      <Helmet>
        <title>편지보내기 - 편지작성</title>
      </Helmet>
      <form onSubmit={submitLetter} css={{ position: 'relative' }}>
        <section css={selectLetter(letterIndex)}>
          <article css={[wrapper, selectWritingPad]}>
            <h3 css={guide}>
              편지지를 선택해주세요<sup css={sup}>*</sup>
            </h3>
            <button type="button" css={navPad(true)} onClick={handleLeft}>
              <FiChevronLeft css={navPadImg(true)} />
            </button>
            <SelectWritingPad x={translate} />
            <button type="button" css={navPad(false)} onClick={handleRight}>
              <FiChevronLeft css={navPadImg(false)} />
            </button>
          </article>
          <article css={wrapper}>
            <h3 css={guide}>첨부파일을 선택해주세요</h3>
            <span css={photoBtn}>파일{havePhoto}하기</span>
            <input
              css={photoInput}
              type="file"
              accept="image/jpg,image/png,image/jpeg,image/webp,image/avif"
              ref={photoRef}
              onChange={handlePhoto}
              name="photo"
            />
          </article>
          <hr css={contour} />
          <article css={letterWrapper}>
            {photo && <img css={letterPhoto} src={photo} alt="첨부파일" />}
            <textarea
              name="letter"
              placeholder="편지를 작성해주세요"
              css={letterText}
              onChange={(e) => setLine(e.target.value)}
              onKeyDown={handleWritingLetter}
            />
          </article>
          <button type="submit" css={sendBtn}>
            전달
          </button>
          <ToastContainer />
          <MenuButton />
        </section>
        {modal && <ShareModal letterId={letterId} />}
      </form>
    </>
  );
}

const selectLetter = (img: number) =>
  css({
    boxSizing: 'border-box',
    width: '100%',
    height: '100%',
    padding: '1rem',
    background: `url("bg/letter${img}.jpg") no-repeat center`,
    backgroundSize: 'cover',
    position: 'relative',
  });

const wrapper = css({
  position: 'relative',
  textAlign: 'center',
  padding: '10px 0',
});

const selectWritingPad = css({
  padding: '10px 40px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const navPad = (left: boolean) =>
  css({
    position: 'absolute',
    [left ? 'left' : 'right']: '1%',
    top: '50%',
    border: 'none',
    backgroundColor: 'transparent',
    width: '50px',
    color: Common.colors.darkPurple,
    cursor: 'pointer',
  });

const navPadImg = (left: boolean) =>
  css({
    width: '100%',
    height: '100%',
    transform: [left ? 'rotate(0)' : 'rotate(180deg)'],
  });

const guide = css({
  textAlign: 'center',
  padding: '10px 0',
  textShadow: `3px 1.3px 6px white`,
});

const sup = css({
  color: Common.colors.darkPurple,
  paddingLeft: '2px',
});

const photoBtn = css({
  display: 'inline-block',
  backgroundColor: Common.colors.darkPurple,
  color: 'white',
  borderRadius: '30px',
  width: '120px',
  padding: '5px 0',
});

const photoInput = css({
  position: 'absolute',
  bottom: '15px',
  left: '50%',
  width: '120px',
  transform: 'translateX(-50%)',
  opacity: '0',
});

const contour = css({
  margin: '30px 0',
});

const letterWrapper = css({
  background: 'rgba(255, 255, 255, 0.7)',
  border: 'gray 1px solid',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const letterPhoto = css({
  width: '50%',
  maxWidth: '600px',
  height: 'auto',
  maxHeight: '600px',
  padding: '20px 0',
});

const letterText = css({
  backgroundColor: 'transparent',
  border: 'none',
  width: '100%',
  height: 'auto',
  minHeight: '600px',
  fontSize: '1.2rem',
  fontFamily: 'Pretendard',
  lineHeight: '1.8',
  padding: '1rem',
  boxSizing: 'border-box',
  outline: 'none',
  resize: 'none',
});

const sendBtn = css({
  fontFamily: 'InkLipquid',
  cursor: 'pointer',
  display: 'block',
  margin: '50px auto 30px auto',
  fontSize: '25px',
  backgroundColor: 'white',
  color: Common.colors.darkPurple,
  borderRadius: '30px',
  width: '120px',
  padding: '5px 0',
  border: 'none',

  '&:hover': css({
    backgroundColor: Common.colors.darkPurple,
    color: 'white',
  }),

  '&:focus': css({
    backgroundColor: Common.colors.darkPurple,
    color: 'white',
  }),
});
