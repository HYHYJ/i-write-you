/** @jsxImportSource @emotion/react */
import { Common } from '@/style/Common';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { ChangeEvent, useState } from 'react';
import { useRecoilState } from 'recoil';
import { letterState } from '@/recoil/atom/useLetter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet-async';
import { mq } from '@/style/mq';

export default function WriteInfo() {
  const [select, setSelect] = useState(false);
  const [memberCheck, setMemberCheck] = useState(false);
  const [nonMemberCheck, setNonMemberCheck] = useState(false);
  const [selectName, setSelectName] = useState('선택');
  const [letter, setLetter] = useRecoilState(letterState);
  const navigate = useNavigate();

  /* 임시 로그인 */
  const my = {
    id: 1,
    name: '윤동주이',
  };

  /* 임시 회원 */
  const friend = [
    { hotel: '어발동', memberName: '이동호' },
    { hotel: '폭주기건차', memberName: '김건주' },
    { hotel: '효그린', memberName: '장효윤' },
    { hotel: '오소이', memberName: '정소이' },
  ];

  /* 팔로우 선택 */
  const selectMember = () => {
    setMemberCheck(!memberCheck);
    setNonMemberCheck(false);
    setSelect(false);
    setSelectName('선택');
    setLetter((prev) => ({
      ...prev,
      member: true,
      receiver: '',
      secretQuestion: '',
      secretKey: '',
      contents: [],
    }));
  };

  /* 팔로우 친구이름 */
  const selectOption = (member: string) => {
    setSelect(false);
    setSelectName(member);
    setLetter((prev) => ({
      ...prev,
      receiver: member,
    }));
  };

  /* 비회원 선택 */
  const selectNonMember = () => {
    setNonMemberCheck(!nonMemberCheck);
    setMemberCheck(false);
    setSelect(false);
    setSelectName('선택');
    setLetter((prev) => ({
      ...prev,
      member: false,
      receiver: '',
      contents: [],
    }));
  };

  /* 비회원 친구이름 */
  const receiverFriend = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    setLetter((prev) => ({
      ...prev,
      receiver: target.value,
    }));
  };

  /* 암호 정하기 */
  const handleSecretQuestion = (
    e: ChangeEvent<HTMLInputElement>,
    secret: string
  ) => {
    const target = e.target;

    if (secret === 'question') {
      setLetter((prev) => ({
        ...prev,
        secretQuestion: target.value,
      }));
    } else {
      setLetter((prev) => ({
        ...prev,
        secretKey: target.value,
      }));
    }
  };

  /* 편지쓰기 */
  const moveWriteLetter = () => {
    if (letter.member) {
      if (!letter.receiver) {
        toast.error('친구 이름을 작성해주세요', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else {
        setLetter((prev) => ({
          ...prev,
          sender: my.name,
        }));

        navigate('/writeLetter');
      }
    } else if (!letter.member) {
      if (!letter.receiver) {
        toast.error('친구 이름을 작성해주세요', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else if (!letter.secretQuestion) {
        toast.error('암호 질문을 작성해주세요', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else if (!letter.secretKey) {
        toast.error('암호를 정해주세요', {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      } else if (letter.secretKey.length !== 4) {
        toast.error('암호는 4자리로 입력해주세요', {
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
        setLetter((prev) => ({
          ...prev,
          sender: my.name,
        }));

        navigate('/writeLetter');
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>편지보내기 - 정보입력</title>
      </Helmet>
      <section css={wrapper}>
        <h1 css={header}>누구에게 편지를 쓰실 건가요?</h1>

        <div css={center}>
          <article css={member(memberCheck)}>
            <div css={memberCheckBox}>
              <input
                type="checkbox"
                id="member"
                css={checkbox}
                onClick={selectMember}
              />
              {memberCheck && <RiCheckboxCircleFill css={checkIcon} />}
              {!memberCheck && <RiCheckboxBlankCircleFill css={checkIcon} />}
              <label htmlFor="member" css={label}>
                팔로우
              </label>
            </div>
            {memberCheck && (
              <div css={{ position: 'relative' }}>
                <button
                  type="button"
                  css={memberSelect(select, selectName)}
                  onClick={() => setSelect(!select)}
                >
                  {selectName}
                </button>
                {select && (
                  <ul css={memberOptionList}>
                    {friend.map((v, i) => (
                      <li css={memberOptionItem} key={i}>
                        <button
                          type="button"
                          css={optionItem}
                          onClick={() => selectOption(v.memberName)}
                        >
                          {v.hotel} &#40;{v.memberName}&#41;
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </article>
          <article css={nonMember}>
            <input
              type="checkbox"
              id="nonMember"
              css={checkbox}
              onClick={selectNonMember}
            />
            {nonMemberCheck && <RiCheckboxCircleFill css={checkIcon} />}
            {!nonMemberCheck && <RiCheckboxBlankCircleFill css={checkIcon} />}
            <label htmlFor="nonMember" css={label}>
              비회원
            </label>
          </article>
          {nonMemberCheck && (
            <article css={nonMemberGuide}>
              <input
                type="text"
                placeholder="편지를 받을 친구의 이름을 입력해주세요."
                css={nonMemberName}
                onChange={receiverFriend}
              />
              <div css={guide}>
                <h3>
                  비회원의 경우, <br />
                  편지를 열람하기 위한 코드가 필요합니다. <br />
                  4자리의 코드를 입력해주세요.
                </h3>
                <p
                  css={css({
                    margin: '0.5rem 0',
                  })}
                >
                  편지 링크와 코드 4자리를 전달하시면, <br />
                  코드 입력 후 편지를 읽을 수 있습니다.
                </p>
                <input
                  type="text"
                  placeholder="16자리 이내의 암호 질문을 작성해주세요"
                  name="question"
                  id="question"
                  autoComplete="off"
                  minLength={1}
                  maxLength={16}
                  css={secret}
                  onChange={(e) => handleSecretQuestion(e, 'question')}
                />
                <input
                  type="password"
                  placeholder="암호 4자리"
                  name="key"
                  id="key"
                  autoComplete="off"
                  minLength={4}
                  maxLength={4}
                  css={secret}
                  onChange={(e) => handleSecretQuestion(e, 'key')}
                />
              </div>
            </article>
          )}
        </div>

        <button type="button" css={writeLetter} onClick={moveWriteLetter}>
          편지쓰기
        </button>
        <ToastContainer />
      </section>
    </>
  );
}

const wrapper = css({
  boxSizing: 'border-box',
  padding: '1rem',
  backgroundColor: Common.colors.fontYellow,
  color: Common.colors.darkBrown,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  height: '100vh',
});

const header = css({
  textAlign: 'center',
  paddingBottom: '1rem',
  fontSize: '30px',
  fontFamily: 'InkLipquid',
});

const center = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: '1',
  width: '50%',
});

const member = (check: boolean) =>
  mq({
    width: '20rem',
    fontSize: '18px',
    marginBottom: `${check ? '0' : '35px'}`,
    boxSizing: 'border-box',
    padding: ['0 20px', '0', '0', '0'],
  });

const label = css({
  textAlign: 'center',
  flexGrow: '1',
});

const memberCheckBox = css({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});

const memberSelect = (select: boolean, member: string) =>
  css({
    width: '100%',
    height: '25px',
    margin: '5px 0',
    border: `2px solid ${Common.colors.darkBrown}`,
    borderRadius: '10px',
    background: `url(/${
      select ? 'selectUp' : 'selectDown'
    }.png) no-repeat right`,
    backgroundSize: '20px',
    backgroundColor: `${
      member === '선택' ? 'transparent' : Common.colors.darkBrown
    }`,
    color: `${member === '선택' ? 'black' : 'white'}`,
    textAlign: 'center',
  });

const memberOptionList = css({
  border: `2px solid ${Common.colors.darkBrown}`,
  borderRadius: '5px',
  width: '100%',
  position: 'absolute',
  top: '90%',
  left: '0px',
  zIndex: '1',
});

const memberOptionItem = css({
  backgroundColor: Common.colors.darkBrown,
  color: 'white',
  textAlign: 'center',
  fontSize: '15px',

  '&:hover': {
    backgroundColor: Common.colors.lightYellow,
    color: 'black',
  },
});

const optionItem = css({
  border: 'none',
  backgroundColor: 'transparent',
  color: 'white',
  width: '100%',
  padding: '2px 0',
});

const nonMember = mq({
  width: '20rem',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  fontSize: '18px',
  boxSizing: 'border-box',
  padding: ['0 20px', '0', '0', '0'],
});

const nonMemberName = mq({
  boxSizing: 'border-box',
  width: ['95%', '100%', '100%', '100%'],
  margin: '5px 0 10px 0',
  padding: '4px 10px',
  border: `2px solid ${Common.colors.darkBrown}`,
  borderRadius: '10px',
  backgroundColor: 'transparent',

  '&:focus': {
    outline: 'none',
  },
});

const checkbox = css({
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: '0',
  zIndex: '1',
});

const checkIcon = css({
  width: '20px',
  height: '20px',
  marginRight: '5px',
});

const nonMemberGuide = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '1rem 0',
  width: '20rem',
});

const guide = mq({
  boxSizing: 'border-box',
  width: ['95%', '100%', '100%', '100%'],
  backgroundColor: Common.colors.darkBrown,
  color: 'white',
  textAlign: 'center',
  fontSize: '14px',
  padding: '10px',
  borderRadius: '10px',
});

const secret = css({
  boxSizing: 'border-box',
  width: '100%',
  padding: '4px 5px',
  backgroundColor: 'transparent',
  border: 'none',
  borderBottom: '2px solid white',
  color: 'white',

  '&:focus': {
    outline: 'none',
  },
});

const writeLetter = css({
  fontFamily: 'InkLipquid',
  fontSize: '25px',
  width: 'fit-content',
  margin: '0 auto',
  color: Common.colors.darkBrown,
  backgroundColor: 'transparent',
  border: 'none',
  padding: '10px',
  cursor: 'pointer',
});
