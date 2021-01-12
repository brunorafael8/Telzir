import React, { useRef, useState } from 'react';
import styled, { withTheme } from 'styled-components';
import selectArrow from '../../assets/selectarrow.svg';

export interface InputProps {
  id: string;
  name: string;
  selectItens: Array<{}>;
  label: string;
  value: string;
  type?: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const TextWrapper = styled.div`
  position: relative;
  padding: 8px 0 0;
  margin-top: 24px;
  width: ${(props: { split: boolean }) => (props.split ? '45%' : '100%')};
  height: 20px;
`;

const Select = styled.select<{ value: string }>`
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 1px solid ${({ value }) => (value === '' ? '#dcdcdc' : '#332a39')};
  outline: 0;
  padding: 9px 0 4px 0;
  transition: border-color 0.2s;
  display: block;
  -webkit-appearance: none;
  -webkit-border-radius: 0px;
  font-size: 0.8em;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  background: url(${selectArrow}) 96% / 15% no-repeat transparent;
  background-size: 12px 14px;

  ::placeholder {
    color: transparent;
  }

  :placeholder-shown ~ .form__label {
    font-size: 0.8em;
    cursor: text;
    color: #332a39;
    ${({ value }) => !!value && `top: 18px;`};
  }

  :focus ~ .form__label {
    color: #332a39;
    position: absolute;
    display: block;
    font-size: 12px;
    ${({ value }) =>
      !value &&
      ` 
    top: 0;
    transition: 0.2s;
   `};
  }

  :placeholder-shown {
    border-bottom: 1px solid ${({ value }) => (value === '' ? '#dcdcdc' : '#332a39')};
  }

  :focus {
    border-bottom: 2px solid ${({ value }) => (value === '' ? '#dcdcdc' : '#332a39')};
  }
`;

const Option = styled.option`
  color: #000;
`;

const TextLabel = styled.label<{ value: string }>`
  position: absolute;
  top: ${({ value }) => (!!value ? '0' : '20px')};
  display: block;
  transition: 0.2s;
  font-weight: normal;
  font-size: 12px;
  color: ${({ value }) => (!!value ? '#332a39' : '#dcdcdc')};
  font-family: 'Roboto', sans-serif;
`;

const Options = React.memo((props) =>
  props.selectItens.map(({ value, label, key }: any) => (
    <Option key={key} value={value}>
      {label}
    </Option>
  )),
);

const InputComponent = (props: InputProps) => {
  const SelectRef = useRef<HTMLSelectElement>(null);
  const { id, name, selectItens, label, value, onChange, type } = props;
  console.log(selectItens);
  console.log(value, !!value, 'asuhauhs');
  const [passwordType, setPasswordType] = useState(type);

  const handleShow = () => {
    if (passwordType === 'password') {
      setPasswordType('text');
    } else {
      setPasswordType(type);
    }
  };
  return (
    <TextWrapper>
      <Select
        ref={SelectRef}
        defaultValue={value}
        data-required="true"
        autoFocus={false}
        id={id}
        name={name}
        onChange={onChange}
      >
        <option disabled value="" hidden />
        <Options selectItens={selectItens} />
      </Select>

      <TextLabel onClick={() => SelectRef.current?.focus()} className="form__label" htmlFor={id} value={value}>
        {label}
      </TextLabel>
    </TextWrapper>
  );
};

export default React.memo(InputComponent);
