/** @jsxImportSource @emotion/react */

import Mail from '@/components/Mail';
import MenuButton from '@/components/MenuButton';
import SeasonEvent from '@/components/SeasonEvent';
import { Common } from '@/style/Common';
import { mq } from '@/style/mq';
import { randomColor, randomPosition } from '@/util/random';
import { css, keyframes } from '@emotion/react';
import { useEffect, useState } from 'react';
import { BsFillSendFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import empty from '/emptyMail.png';
import newMail from '/newMail.png';
import view from '/viewMail.png';
import EventControl from '@/components/EventControl';

export default function Hotel() {
  const navigate = useNavigate();
  const [season, setSeason] = useState('');
  const [control, setControl] = useState(false);

  /* 임시배열 */
  const arr = [
    0, 0, 0, 1, 0, 1, 0, 2, 1, 2, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  /* 임시닉네임 */
  const nickName = '윤동주이';

  /* 현재 달 */
  const currentMonth = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;

    switch (true) {
      case 1 <= month && month < 4:
        setSeason('spring');
        break;

      case 4 <= month && month < 7:
        setSeason('summer');
        break;

      case 7 <= month && month < 10:
        setSeason('fall');
        break;

      default:
        setSeason('winter');
    }
  };

  useEffect(() => {
    currentMonth();
  }, []);

  return (
    <div css={background}>
      <button
        type="button"
        id="writeButton"
        css={writeMail}
        onClick={() => navigate('/writeInfo')}
      >
        <BsFillSendFill
          css={{
            '#writeButton:hover &': css({
              animation: `${writeButton} 1s ease infinite`,
            }),
          }}
        />
        편지작성하기
      </button>
      <div css={hotelWrapper}>
        <div css={mailWrapper}>
          {arr.map((v, i) => (
            <Mail
              key={i}
              mail={v}
              src={v === 0 ? `${empty}` : v === 1 ? `${newMail}` : `${view}`}
              alt={
                v === 0 ? '미확인 편지' : v === 1 ? '새로운 편지' : '확인 편지'
              }
              link={
                v === 0
                  ? '/hotel'
                  : v === 1
                  ? '/receivedRead/1'
                  : '/receivedRead/1'
              }
            />
          ))}
          <p css={hotelNameWrapper}>{nickName} HOTEL</p>
        </div>
      </div>
      <MenuButton home={true} />
      <EventControl control={control} setControl={setControl} />
      {season &&
        [...new Array(60)].map((v) => (
          <SeasonEvent
            key={v}
            season={season}
            top={randomPosition(100)}
            position={randomPosition(100)}
            color={randomColor(season, randomPosition(3))}
            control={control}
          />
        ))}
    </div>
  );
}

/* 편지작성하기 애니메이션 */
const writeButton = keyframes`
  0%{
    transform: translateX(0) translateY(0);
  }

  100%{
    transform: translateX(30px) translateY(-20px) scale(0%);
  }
`;

const background = css({
  position: 'relative',
  color: Common.colors.white,
  background: Common.colors.darkPurple,
  overflow: 'hidden',
  width: '100%',
  fontSize: '25px',
  height: '100%',
  display: 'flex',
  alignItems: 'flex-end',

  '.season:nth-child(2n)': {
    width: '15px',
    height: '15px',
    animationDuration: '7s',
    animationDelay: '0.5s',
  },

  '.season:nth-child(2n+1)': {
    width: '18px',
    height: '18px',
    animationDuration: '5s',
    animationDelay: '1s',
  },

  '.season:nth-child(4n)': {
    animationDuration: '3s',
    animationDelay: '2s',
  },

  '.season:nth-child(9n)': {
    animationDuration: '6s',
    animationDelay: '2s',
  },
});

const writeMail = css({
  display: 'flex',
  position: 'absolute',
  top: '10%',
  left: '50%',
  background: 'transparent',
  color: Common.colors.white,
  transform: 'translateX(-50%)',
  flexDirection: 'column',
  border: 'none',
  alignItems: 'center',
  gap: '5px',
  cursor: 'pointer',
  fontSize: '20px',
  textShadow: '4px 2px 5px white',
  '&:hover': css({
    transition: 'font-size 0.2s',
    fontSize: '22px',
  }),
});

const hotelWrapper = css({
  position: 'relative',
  width: '100%',
  height: '75%',
  display: 'flex',
  alignItems: 'flex-end',
  background: `url("/sliceHotel.png") no-repeat center`,
  backgroundSize: 'cover',
});

const mailWrapper = mq({
  position: 'absolute',
  top: '32%',
  left: '50%',
  zIndex: '1',
  backgroundColor: 'black',
  opacity: '0.5',
  width: '100%',
  minWidth: '476px',
  maxWidth: '476px',
  height: '41%',
  maxHeight: '41%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'flex-start',
  flexWrap: 'wrap',

  '> :nth-child(1)': {
    marginLeft: '7px',
  },

  '> :nth-child(8n+1)': {
    marginLeft: '7px',
  },

  '> :nth-child(8n)': {
    marginRight: 0,
  },
});

const hotelNameWrapper = css({
  position: 'relative',
  width: '95%',
  textAlign: 'center',
  fontSize: '30px',
  color: '#452E72',
  fontFamily: 'InkLipquid',
});
