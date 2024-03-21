/** @jsxImportSource @emotion/react */
import { BsEnvelopeCheckFill } from 'react-icons/bs';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { letterNumberState, letterState } from '@/recoil/atom/useLetter';
import { Common } from '@/style/Common';

function SelectWritingPad({ x }: { x: number }) {
  const [letterIndex, setLetterIndex] = useRecoilState(letterNumberState);
  const [, setLetter] = useRecoilState(letterState);

  const selectPad = (i: number) => {
    setLetterIndex(i + 1);
    setLetter((prev) => ({
      ...prev,
      writingPad: i + 1,
    }));
  };

  return (
    <ul css={wrapper}>
      {[...new Array(27)].map((_, i) => (
        <li css={padList(x)} key={i}>
          <button
            type="button"
            css={pad}
            className="letters"
            onClick={() => selectPad(i)}
          >
            <img
              css={lettersImg}
              src={`/bg/letter${i + 1}.jpg`}
              alt="Image By freepik"
            />
            <BsEnvelopeCheckFill css={check(i + 1 === letterIndex)} />
          </button>
        </li>
      ))}
    </ul>
  );
}

const wrapper = css({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  width: '95%',
  overflow: 'hidden',
  height: '130px',
});

const padList = (x: number) =>
  css({
    boxSizing: 'border-box',
    position: 'relative',
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    border: `1px solid ${Common.colors.gray300}`,
    transform: `translateX(${x}px)`,
    transition: 'transform 0.5s',
  });

const pad = css({
  position: 'relative',
  cursor: 'pointer',
  padding: 0,
  border: 'none',
  width: '90px',
  height: '100%',
});

const lettersImg = css({
  width: '100%',
  height: '100%',
});

const check = (check: boolean) =>
  css({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    opacity: `${check ? 1 : 0}`,
    width: '30px',
    height: '30px',
    color: Common.colors.darkPurple,

    '.letters:hover &': css({
      opacity: '1',
    }),
  });

export default SelectWritingPad;
