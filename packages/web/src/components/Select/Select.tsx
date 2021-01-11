import React, { useRef, useState } from 'react';
import styled, { withTheme } from 'styled-components';
import selectArrow from '../assets/selectarrow.svg';

export interface InputProps {
  id: string;
  name: string;
  select: boolean;
  selectItens: Array<{}>;
  placeholder: string;
  pattern: string;
  value: string;
  theme: Object;
  split: boolean;
  mask: string;
  maskChar: string;
  type: string;
  onKeyUp: () => void;
  error: string;
  onChange: (any) => void;
}

const TextWrapper = styled.div`
  position: relative;
  padding: 8px 0 0;
  margin-top: 24px;
  width: ${(props: { split: boolean }) => (props.split ? '45%' : '100%')};
  height: 20px;
`;

const Select = styled.select`
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 1px solid #332a39;
  border-bottom: 1px solid ${({ value }) => (value === '' ? '#dcdcdc' : '#332a39')};
  outline: 0;
  padding: 9px 0 4px 0;
  background: #ffffff;
  transition: border-color 0.2s;
  display: block;
  -webkit-appearance: none;
  -webkit-border-radius: 0px;
  font-size: 0.8em;
  color: #332a39;
  font-family: 'Roboto', sans-serif;
  font-style: italic;
  font-weight: 300;
  background: url(${selectArrow}) 96% / 15% no-repeat #fff;
  background-size: 12px 14px;
  ::placeholder {
    color: transparent;
  }

  :placeholder-shown ~ .form__label {
    font-size: 0.8em;
    cursor: text;
    top: 18px;
    color: #332a39;
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

const TextLabel = styled.label`
  position: absolute;
  top: ${(props: { select: boolean; value: string }) => (props.select && !props.value ? '20px' : '0')};
  display: block;
  transition: 0.2s;
  font-weight: normal;
  font-size: 12px;
  color: ${({ theme: { colors }, value }) => (value ? '#dcdcdc' : '#332a39')};
  font-family: 'Roboto', sans-serif;
`;

const Options = React.memo((props) =>
  props.selectItens.map(({ value, label, hidden, key }: any) => (
    <option key={key} hidden={hidden} value={value}>
      {label}
    </option>
  )),
);

const InputComponent = (props: InputProps) => {
  const InputRef = useRef<any>(null);
  const SelectRef = useRef<HTMLSelectElement>(null);
  const {
    id,
    name,
    select,
    selectItens,
    placeholder,
    pattern,
    value,
    theme,
    split,
    onChange,
    mask,
    maskChar,
    type,
    onKeyUp,
    error,
  } = props;

  const [passwordType, setPasswordType] = useState(type);

  const handleShow = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else {
      setPasswordType(type);
    }
  };
  return (
    <TextWrapper split={split}>
      <Select
        ref={SelectRef}
        defaultValue={value}
        data-required="true"
        onKeyUp={onKeyUp}
        autoFocus={false}
        id={id}
        name={name}
        onChange={onChange}
      >
        <option disabled value="" hidden />
        <Options selectItens={selectItens} />
      </Select>

      <TextLabel
        onClick={() => (select ? SelectRef.current?.focus() : InputRef.current.getInputDOMNode().focus())}
        className="form__label"
        htmlFor={id}
        select={select}
        value={value}
        theme={theme}
      >
        {placeholder}
      </TextLabel>
    </TextWrapper>
  );
};

export default React.memo(InputComponent);
