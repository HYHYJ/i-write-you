/** @jsxImportSource @emotion/react */

import { Common } from '@/style/Common';
import { css } from '@emotion/react';
import mailTruck from '/mailTruck.png';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { mq } from '@/style/mq';

function MenuButton({
  sent,
  received,
  home,
}: {
  sent?: boolean;
  received?: boolean;
  home?: boolean;
}) {
  const [click, setClick] = useState(false);

  return (
    <>
      {click && (
        <ul css={menuList}>
          {!sent && (
            <li>
              <NavLink css={nav} to="/received">
                받은편지함
              </NavLink>
            </li>
          )}
          {!received && (
            <li>
              <NavLink css={nav} to="/sent">
                보낸편지함
              </NavLink>
            </li>
          )}
          {!home && (
            <li>
              <NavLink css={nav} to="/hotel">
                홈
              </NavLink>
            </li>
          )}
          <li>체크아웃</li>
        </ul>
      )}
      <button css={menuButton} type="button" onClick={() => setClick(!click)}>
        <img css={mailTruckImg} src={mailTruck} alt="메뉴" />
      </button>
    </>
  );
}

const nav = css({
  textDecoration: 'none',
  color: 'white',
});

const menuList = mq({
  position: 'absolute',
  bottom: ['110px', '125px', '125px', '125px'],
  right: '50px',
  zIndex: '1',
  backgroundColor: Common.colors.darkPurple,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  gap: '10px',
  textAlign: 'center',
  padding: '10px 20px',
  fontSize: ['15px', '18px', '20px', '20px'],
  color: 'white',
});

const menuButton = mq({
  position: 'absolute',
  bottom: '40px',
  right: '20px',
  zIndex: '1',
  backgroundColor: Common.colors.darkPurple,
  width: ['60px', '80px', '80px', '80px'],
  height: ['60px', '80px', '80px', '80px'],
  borderRadius: '50%',
  border: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  cursor: 'pointer',
  overflow: 'hidden',
});

const mailTruckImg = mq({
  width: ['60px', '80px', '80px', '80px'],
});

export default MenuButton;
