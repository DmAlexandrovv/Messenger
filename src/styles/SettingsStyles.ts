import styled from "styled-components";

export const SettingsFormRoot = styled.form`
  display: grid;
  gap: 15px;
`;

export const Field = styled.label`
  display: grid;
  gap: 9px;
  color: #626771;
  font-size: 14px;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 14px;
  border: 1px solid #e6e8ec;
  border-radius: 8px;
  outline: 0;
  background: #fff;
  color: #34383f;
  font-size: 15px;

  &::placeholder {
    color: #b5b9c0;
  }

  &:focus {
    box-shadow: 0 0 0 3px #3988ef14;
    border-color: #90bdf3;
  }
`;

export const InputWithAction = styled.div`
  position: relative;

  ${Input} {
    padding-right: 62px;
  }
`;

export const FieldAction = styled.button`
  position: absolute;
  top: 50%;
  right: 9px;
  display: grid;
  width: 36px;
  height: 36px;
  transform: translateY(-50%);
  place-items: center;
  border: 0;
  background: transparent;
  color: #7c9fc9;
  cursor: pointer;
`;

export const PrivacyNote = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: -1px 0 0;
  color: #9ca1aa;
  font-size: 13px;

  svg {
    color: #7daada;
  }
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 1px;
  border: 0;
  border-radius: 8px;
  background: #3988ef;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.15s;

  &:hover:not(:disabled) {
    background: #2876dc;
  }
  &:disabled {
    opacity: 0.65;
  }
`;

export const StyledSettingsCard = styled.div.attrs({ className: "settings-state" })``;
