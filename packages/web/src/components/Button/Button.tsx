import React from 'react';

import styled from 'styled-components';

export interface Props extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
  isLoading: boolean;
  style: Record<string, any>;
  className: string;
  disabled: boolean;
  onClick: () => void;
}

const ButtonStyled = styled.button`
  font-family: 'Roboto', sans-serif;
  color: #fff;
  border: 1px solid #332a39;
  border-radius: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  opacity: ${(props) => (props.disabled ? '0.4' : '1')};
`;

const Loader = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-left: 4px solid;
  animation: spin 1s infinite linear;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  align-self: center;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Button = (props: Props) => {
  const { children, isLoading, type, style, className, disabled, onClick, form } = props;

  return (
    <ButtonStyled form={form} disabled={disabled} type={type} style={style} className={className} onClick={onClick}>
      {isLoading && !disabled ? <Loader /> : children}
    </ButtonStyled>
  );
};

export default Button;
