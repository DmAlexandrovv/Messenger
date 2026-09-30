import styled from "styled-components";

export const AppShell = styled.main`
  position: relative;
  max-width: 1480px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 23px 40px 38px;

  @media (max-width: 760px) {
    padding: 14px;
  }
  @media (max-width: 380px) {
    padding: 10px;
  }
`;

export const ChatLayout = styled.section.attrs({ className: "chat-layout" })`
  display: grid;
  grid-template-columns: 302px minmax(0, 1fr);
  height: min(780px, calc(100vh - 110px));
  min-height: 510px;
  overflow: hidden;
  border: 1px solid #e8e9ec;
  border-radius: 17px;
  background: #fff;
  box-shadow: 0 14px 48px rgb(33 42 58 / 5%);

  &.auth-layout {
    grid-template-columns: minmax(0, 1fr);
  }

  @media (max-width: 760px) {
    position: relative;
    display: block;
    height: calc(100dvh - 81px);
    min-height: 460px;
  }
`;
