/** @jsxImportSource @emotion/react */

import { seasonAnimation } from '@/util/seasonAnimation';
import { css } from '@emotion/react';
import { PiFlowerDuotone } from 'react-icons/pi';
import { IoLeafSharp } from 'react-icons/io5';
import { FaSnowflake } from 'react-icons/fa';
import { FaCanadianMapleLeaf } from 'react-icons/fa6';

function SeasonEvent({
  season,
  top,
  position,
  color,
  control,
}: {
  season: string;
  top: number;
  position: number;
  color: string;
  control: boolean;
}) {
  const event = css({
    position: 'absolute',
    top: `${top}%`,
    left: `${position}%`,
    color: `${color}`,
    width: '20px',
    height: '20px',
    opacity: 0,
    animation: `${seasonAnimation} 10s linear infinite`,
    animationPlayState: `${control ? 'paused' : 'running'}`,
  });

  return (
    <>
      {season === 'spring' && <IoLeafSharp className="season" css={event} />}
      {season === 'summer' && (
        <PiFlowerDuotone className="season" css={event} />
      )}
      {season === 'fall' && (
        <FaCanadianMapleLeaf className="season" css={event} />
      )}
      {season === 'winter' && <FaSnowflake className="season" css={event} />}
    </>
  );
}

export default SeasonEvent;
