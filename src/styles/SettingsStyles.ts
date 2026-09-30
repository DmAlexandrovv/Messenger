import styled from "styled-components";

export const SettingsFormRoot = styled.form`
  display: grid;
  gap: 15px;
`;

export const Field = styled.label`
  display: grid;
  gap: 7px;
  color: #626771;
  font-size: 10px;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  height: 39px;
  padding: 0 11px;
  border: 1px solid #e6e8ec;
  border-radius: 8px;
  outline: 0;
  background: #fff;
  color: #34383f;
  font-size: 11px;

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
  transform: translateY(-50%);
  border: 0;
  background: transparent;
  color: #7c9fc9;
  font-size: 9px;
`;

export const PrivacyNote = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: -1px 0 0;
  color: #9ca1aa;
  font-size: 9px;

  svg {
    color: #7daada;
  }
`;

export const PrimaryButton = styled.button`
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 1px;
  border: 0;
  border-radius: 8px;
  background: #3988ef;
  color: #fff;
  font-size: 11px;
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
