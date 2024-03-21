/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FaPlay } from 'react-icons/fa6';
import { IoPause } from 'react-icons/io5';

function EventControl({
  control,
  setControl,
}: {
  control: boolean;
  setControl: (control: boolean) => void;
}) {
  const eventControl = css({
    position: 'absolute',
    top: '20px',
    right: '20px',
    border: 'none',
    backgroundColor: 'transparent',
    width: '40px',
    height: '40px',
    color: 'white',
    cursor: 'pointer',
    animationPlayState: `${control === false ? 'paused' : 'running'}`,
  });

  return (
    <button
      css={eventControl}
      type="button"
      onClick={() => setControl(!control)}
    >
      {!control && <IoPause css={{ width: '100%', height: '100%' }} />}
      {control && <FaPlay css={{ width: '70%', height: '70%' }} />}
    </button>
  );
}

export default EventControl;
