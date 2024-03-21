/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Common } from '@/style/Common';
import { mq } from '@/style/mq';

type ButtonStyleProps = {
  size: 'ssmall' | 'small' | 'medium';
  colorType: 'default' | 'red';
};

const ButtonStyle = styled.button<ButtonStyleProps>`
  border-radius: 25px;

  ${(props) => buttonSize[props.size]}
  ${(props) => buttonType[props.colorType]}
`;

interface BunttonProps extends ButtonStyleProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const FriendButton = ({ children, onClick, ...styleProps }: BunttonProps) => {
  return (
    <ButtonStyle {...styleProps} onClick={onClick}>
      {children}
    </ButtonStyle>
  );
};

export default FriendButton;

const buttonSize = {
  ssmall: css`
    ${mq({
      fontSize: ['16px', '18px', '19px', '19px'],
      padding: ['3px 10px', '7px 13px', '8px 15px', '8px 15px'],
    })}
  `,
  small: css`
    padding: 8px 30px;
    ${mq({
      fontSize: ['16px', '18px', '19px', '19px'],
    })}
  `,
  medium: css`
    width: 150px;
    height: 30px;
  `,
};

export const DefaultButton = css`
  background-color: ${Common.colors.lightMint};
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #3b9bb2;
  }
`;

export const RedButton = css`
  background-color: #ff6d6d;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #e84343;
  }
`;

const buttonType = {
  default: DefaultButton,
  red: RedButton,
};
