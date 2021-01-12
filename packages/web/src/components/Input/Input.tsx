import React, { useRef } from 'react';
import styled from 'styled-components';

export interface Props {
  id: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  label: string;
  min?: string;
  max?: string;
  maxlength?: string;
}

const TextWrapper = styled.div<{ split: boolean }>`
  position: relative;
  padding: 8px 0 0;
  margin-top: 24px;
  width: ${({ split }) => (split ? '45%' : '100%')};
  height: 20px;
`;

const Input = styled.input<{ value: string }>`
  width: 100%;
  border: 0;
  border-bottom: 1px solid ${({ value }) => (value === '' ? '#dcdcdc' : '#332a39')};
  outline: 0;
  font-size: 0.8em;
  padding: 9px 0 4px 0;
  background: transparent;
  transition: border-color 0.2s;
  font-family: 'Roboto', sans-serif;
  color: #fff;
  font-weight: 300;

  ::placeholder {
    color: transparent;
  }

  :focus ::placeholder {
    color: transparent;
  }

  :placeholder-shown ~ .form__label {
    font-size: 0.8em;
    cursor: text;
    top: 18px;
    color: #dcdcdc;
  }

  :focus ~ .form__label {
    color: #332a39;
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 12px;
  }

  :placeholder-shown {
    border-bottom: 1px solid ${({ value }) => (value === '' ? '#dcdcdc' : '#332a39')};
  }

  :focus {
    border-bottom: 2px solid ${({ value }) => (value === '' ? '#dcdcdc' : '#332a39')};
  }
`;

const TextLabel = styled.label<{ value: string }>`
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-weight: normal;
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
  color: ${({ value }) => (value ? '#332a39' : '#dcdcdc')};
`;

const InputComponent = (props: Props) => {
  const InputRef = useRef<any>(null);
  const { id, name, value, onChange, type, label, min, max, maxlength } = props;

  return (
    <TextWrapper>
      <Input
        id={id}
        placeholder={label}
        onChange={onChange}
        name={name}
        ref={InputRef}
        value={value}
        type={type}
        min={min}
        max={max}
        maxlength={maxlength}
      />
      <TextLabel onClick={() => InputRef.current.focus()} className="form__label" htmlFor={id} value={value}>
        {label}
      </TextLabel>
    </TextWrapper>
  );
};

export default InputComponent;
