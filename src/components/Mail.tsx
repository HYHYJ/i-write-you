/** @jsxImportSource @emotion/react */
import { mq } from '@/style/mq';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

function Mail({
  mail,
  src,
  alt,
  link,
}: {
  mail: number;
  src: string;
  alt: string;
  link: string;
}) {
  const navigate = useNavigate();

  const mailButton = mq({
    width: '35px',
    minWidth: '22px',
    maxWidth: '35px',
    height: '18%',
    border: 'none',
    background: 'transparent',
    margin: '0 13.4px',
    padding: 0,
    cursor: mail === 0 ? 'default;' : 'pointer',
    '&:hover': css({ transform: mail === 0 ? 'scale(100%)' : 'scale(120%)' }),
  });

  return (
    <button css={mailButton} type="button" onClick={() => navigate(link)}>
      <img css={{ width: '100%', height: 'auto' }} src={src} alt={alt} />
    </button>
  );
}

export default Mail;
