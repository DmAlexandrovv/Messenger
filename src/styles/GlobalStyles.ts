import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap");

:root {
  font-family: "DM Sans", sans-serif;
  color: #22252b;
  background: #f3f4f6;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-optical-sizing: auto;
  font-weight: 400;
  font-size: 14px;
  font-smooth: always;
  --ink: #22252b;
  --muted: #91959e;
  --line: #ebedf0;
  --blue: #3988ef;
  --blue-dark: #2876dc;
}

@media (min-width: 761px) {
  :root {
    font-size: 16px;
  }

  .topbar {
    gap: 16px;
    height: 52px;
  }
  .brand {
    gap: 12px;
    font-size: 24px;
  }
  .brand-mark {
    width: 38px;
    height: 38px;
  }
  .service-label,
  .settings-toggle {
    font-size: 14px;
  }
  .settings-toggle {
    padding: 10px 14px;
  }
  .eyebrow {
    font-size: 12px;
    letter-spacing: 1.4px;
  }
  .sidebar-top h1 {
    font-size: 23px;
  }
  .icon-button {
    width: 42px;
    height: 42px;
  }
  .plus-mark {
    width: 16px;
    height: 16px;
    font-size: 12px;
  }
  .sidebar-search {
    height: 46px;
    gap: 12px;
    padding: 0 14px;
  }
  .sidebar-search input,
  .chat-list-name,
  .header-contact-name {
    font-size: 16px;
  }
  .sidebar-blank p {
    font-size: 17px;
  }
  .sidebar-blank > span,
  .chat-list-preview {
    font-size: 14px;
  }
  .sidebar-blank > button,
  .start-chat-cta,
  .primary-button {
    font-size: 14px;
  }
  .contact-avatar {
    width: 46px;
    height: 46px;
    font-size: 19px;
  }
  .chat-list-time,
  .header-contact-state,
  .setup-reminder,
  .floating-status {
    font-size: 12px;
  }
  .sidebar-bottom,
  .compose-hint,
  .date-divider span,
  .feed-empty {
    font-size: 13px;
  }
  .conversation-header {
    height: 78px;
    gap: 14px;
    padding: 0 28px;
  }
  .header-avatar {
    width: 48px;
    height: 48px;
  }
  .conversation-empty h2 {
    font-size: 32px;
  }
  .conversation-empty > p {
    font-size: 15px;
  }
  .start-chat-cta {
    padding: 13px 18px;
  }
  .settings-state {
    width: min(500px, 100%);
    padding: 42px 38px;
  }
  .settings-state h2 {
    font-size: 28px;
  }
  .settings-state > .state-icon {
    width: 54px;
    height: 54px;
  }
  .api-setup-note,
  .api-setup-note code {
    font-size: 12px;
  }
  .back-link {
    font-size: 13px;
  }
  .phone-field,
  .phone-field input {
    font-size: 15px;
  }
  .phone-field,
  .primary-button {
    min-height: 48px;
  }
  .message-feed {
    gap: 14px;
    padding: 24px 34px 30px;
  }
  .message-bubble {
    padding: 13px 16px 9px;
    font-size: 16px;
  }
  .message-meta {
    height: 16px;
    font-size: 11px;
  }
  .compose-wrap {
    padding: 0 30px 17px;
  }
  .composer {
    min-height: 58px;
    padding-left: 18px;
  }
  .composer textarea {
    font-size: 15px;
  }
  .send-button {
    width: 44px;
    height: 44px;
  }
  .draft-count,
  .compose-footnote {
    font-size: 11px;
  }
  .toast {
    max-width: min(520px, calc(100vw - 48px));
    padding: 16px 18px;
    font-size: 14px;
  }
}

* {
  box-sizing: border-box;
}
body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;
}
button,
input,
textarea {
  font: inherit;
}
button {
  cursor: pointer;
}
button:disabled {
  cursor: not-allowed;
}
::selection {
  background: #deecff;
}

.topbar {
  display: flex;
  align-items: center;
  gap: 13px;
  height: 44px;
  margin-bottom: 20px;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #202329;
  font:
    800 20px "Manrope",
    sans-serif;
  letter-spacing: -0.9px;
  text-decoration: none;
}
.brand-mark {
  display: grid;
  width: 31px;
  height: 31px;
  place-items: center;
  border-radius: 10px;
  background: var(--blue);
  color: white;
}
.brand-dot {
  color: var(--blue);
}
.service-label {
  padding-left: 13px;
  border-left: 1px solid #dfe1e5;
  color: #898d96;
  font-size: 11px;
}
.topbar-spacer {
  flex: 1;
}
.settings-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 11px;
  border: 1px solid #e7e9ed;
  border-radius: 9px;
  background: #fff;
  color: #737882;
  font-size: 11px;
  transition:
    border-color 0.15s,
    color 0.15s;
}
.settings-toggle:hover {
  border-color: #c9d8ec;
  color: var(--blue-dark);
}
.connection-dot {
  width: 8px;
  height: 8px;
  margin-left: 3px;
  border-radius: 50%;
  background: #c3c7cd;
}
.connection-dot.is-connected {
  background: #50bf87;
  box-shadow: 0 0 0 3px #50bf871f;
}

.chat-sidebar {
  position: relative;
  display: flex;
  min-width: 0;
  flex-direction: column;
  padding: 23px 17px 16px;
  border-right: 1px solid #eff0f2;
}
.sidebar-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
}
.eyebrow {
  display: block;
  color: #a3a7b0;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1.2px;
}
.sidebar-top h1 {
  margin: 7px 0 0;
  font:
    700 18px "Manrope",
    sans-serif;
  letter-spacing: -0.45px;
}
.icon-button {
  display: inline-grid;
  width: 35px;
  height: 35px;
  flex: 0 0 auto;
  place-items: center;
  border: 1px solid transparent;
  border-radius: 10px;
  background: transparent;
  color: #777c86;
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s;
}
.icon-button:hover:not(:disabled) {
  border-color: #e8eef6;
  background: #f4f8fd;
  color: var(--blue-dark);
}
.new-chat-button {
  position: relative;
  border-color: #e4efff;
  background: #f1f7ff;
  color: var(--blue);
}
.plus-mark {
  position: absolute;
  right: 3px;
  bottom: 2px;
  display: grid;
  width: 12px;
  height: 12px;
  place-items: center;
  border: 1px solid white;
  border-radius: 50%;
  background: var(--blue);
  color: white;
  font-family: "DM Sans", sans-serif;
  font-size: 0;
  transform: translateX(1px);
}
.plus-mark::before,
.plus-mark::after {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  transform: translate(-50%, -50%);
  border-radius: 1px;
  background: white;
  content: "";
}
.plus-mark::before {
  width: 6px;
  height: 1.5px;
}
.plus-mark::after {
  width: 1.5px;
  height: 6px;
}
.sidebar-search {
  display: flex;
  height: 37px;
  align-items: center;
  gap: 10px;
  margin: 21px 1px 16px;
  padding: 0 11px;
  border: 1px solid #eff0f2;
  border-radius: 9px;
  background: #fafbfc;
}
.sidebar-search input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--ink);
  font-size: 11px;
}
.sidebar-search input::placeholder {
  color: #b0b4bc;
}
.sidebar-search input:disabled {
  cursor: default;
}
.search-glass {
  position: relative;
  width: 12px;
  height: 12px;
  flex: 0 0 auto;
  border: 1.5px solid #aeb3bc;
  border-radius: 50%;
}
.search-glass::after {
  position: absolute;
  right: -4px;
  bottom: -2px;
  width: 5px;
  height: 1.5px;
  transform: rotate(45deg);
  border-radius: 2px;
  background: #aeb3bc;
  content: "";
}
.sidebar-blank {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px 55px;
  text-align: center;
}
.blank-chat-icon {
  display: grid;
  width: 44px;
  height: 44px;
  margin-bottom: 12px;
  place-items: center;
  border: 1px solid #edf3fa;
  border-radius: 15px;
  background: #f5f9fe;
  color: #78a9e5;
}
.sidebar-blank p {
  margin: 0;
  color: #595e67;
  font-size: 12px;
  font-weight: 600;
}
.sidebar-blank > span {
  max-width: 190px;
  margin-top: 6px;
  color: #a0a4ac;
  font-size: 10px;
  line-height: 1.5;
}
.sidebar-blank > button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 16px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--blue-dark);
  font-size: 10px;
  font-weight: 600;
}
.chat-list-item {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: 10px;
  padding: 10px 9px;
  border: 1px solid #eaf2fc;
  border-radius: 11px;
  background: #f6faff;
  color: inherit;
  text-align: left;
}
.contact-avatar {
  display: grid;
  width: 39px;
  height: 39px;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 13px;
  background: linear-gradient(140deg, #b8dafd, #e2efff);
  color: #417ec1;
  font:
    700 15px "Manrope",
    sans-serif;
}
.chat-list-copy {
  display: grid;
  min-width: 0;
  flex: 1;
  gap: 4px;
}
.chat-list-name,
.chat-list-preview {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.chat-list-name {
  color: #363a41;
  font-size: 11px;
  font-weight: 600;
}
.chat-list-preview {
  color: #9298a2;
  font-size: 10px;
}
.chat-list-time {
  align-self: flex-start;
  padding-top: 2px;
  color: #a0a5ad;
  font-size: 9px;
}
.sidebar-bottom {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-top: auto;
  padding: 13px 5px 1px;
  border-top: 1px solid #f0f1f3;
  color: #a3a7ae;
  font-size: 9px;
}
.sidebar-bottom svg {
  color: #7faedb;
}

.conversation {
  position: relative;
  display: flex;
  min-width: 0;
  flex-direction: column;
  background: #fff;
}
.conversation-empty {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px;
  text-align: center;
}
.empty-orbit {
  position: relative;
  display: grid;
  width: 112px;
  height: 112px;
  margin-bottom: 32px;
  place-items: center;
}
.orbit {
  position: absolute;
  border: 1px solid #e9f1fc;
  border-radius: 50%;
}
.orbit-one {
  inset: 0;
}
.orbit-two {
  inset: 13px;
  border-color: #edf3fa;
}
.orbit-core {
  display: grid;
  width: 57px;
  height: 57px;
  place-items: center;
  border: 1px solid #e1edfc;
  border-radius: 20px;
  background: #f1f7ff;
  color: #5a9be7;
  box-shadow: 0 8px 24px #3988ef12;
}
.orbit-spark {
  position: absolute;
  color: #78abe5;
}
.spark-one {
  top: 2px;
  right: 3px;
}
.spark-two {
  bottom: 3px;
  left: 0;
  color: #b9cce3;
}
.conversation-empty h2 {
  margin: 13px 0 0;
  color: #282c32;
  font:
    700 24px/1.3 "Manrope",
    sans-serif;
  letter-spacing: -0.8px;
}
.conversation-empty > p {
  margin: 9px 0 0;
  color: #999da5;
  font-size: 11px;
  line-height: 1.8;
}
.start-chat-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 22px;
  padding: 10px 15px;
  border: 0;
  border-radius: 9px;
  background: var(--blue);
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  box-shadow: 0 5px 13px #3988ef30;
  transition:
    background 0.15s,
    transform 0.15s;
}
.start-chat-cta:hover:not(:disabled) {
  transform: translateY(-1px);
  background: var(--blue-dark);
}
.start-chat-cta:disabled {
  background: #b8cce5;
  box-shadow: none;
}
.setup-reminder {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 14px;
  color: #a4a8b0;
  font-size: 9px;
}

.settings-state {
  position: relative;
  display: flex;
  width: min(390px, 100%);
  margin: auto;
  flex-direction: column;
  align-items: stretch;
  padding: 34px 34px 38px;
}
.settings-state > .state-icon {
  display: grid;
  width: 44px;
  height: 44px;
  margin-bottom: 19px;
  place-items: center;
  border: 1px solid #e0edfc;
  border-radius: 14px;
  background: #f1f7ff;
  color: var(--blue);
}
.settings-state > .eyebrow {
  margin-bottom: 8px;
}
.settings-state h2 {
  margin: 0;
  font:
    700 22px "Manrope",
    sans-serif;
  letter-spacing: -0.7px;
}
.state-copy {
  margin: 9px 0 23px;
  color: #9398a1;
  font-size: 12px;
  line-height: 1.7;
}
.new-chat-form {
  display: grid;
  gap: 15px;
}
.new-chat-form label {
  display: grid;
  gap: 7px;
  color: #626771;
  font-size: 10px;
  font-weight: 600;
}
.phone-field {
  width: 100%;
  height: 39px;
  padding: 0 11px;
  border: 1px solid #e6e8ec;
  border-radius: 8px;
  outline: 0;
  background: #fff;
  color: #34383f;
  font-size: 11px;
  transition:
    border 0.15s,
    box-shadow 0.15s;
}
.phone-field input::placeholder {
  color: #b5b9c0;
}
.phone-field:focus-within {
  border-color: #90bdf3;
  box-shadow: 0 0 0 3px #3988ef14;
}
.primary-button {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 8px;
  background: var(--blue);
  color: white;
  font-size: 11px;
  font-weight: 600;
  transition: background 0.15s;
}
.primary-button:hover:not(:disabled) {
  background: var(--blue-dark);
}
.primary-button:disabled {
  opacity: 0.65;
}
.api-setup-note {
  margin: 17px 0 0;
  padding: 11px 12px;
  border: 1px solid #edf0f4;
  border-radius: 8px;
  background: #fafbfd;
  color: #9298a2;
  font-size: 9px;
  line-height: 1.7;
}
.api-setup-note code {
  color: #64748b;
  font-size: 9px;
}
.new-chat-state {
  padding-top: 39px;
}
.back-link {
  position: absolute;
  top: -27px;
  left: 32px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 0;
  background: transparent;
  color: #87909d;
  font-size: 10px;
}
.phone-field {
  display: flex;
  align-items: center;
  gap: 7px;
}
.phone-field > span {
  color: #757a84;
  font-size: 12px;
}
.phone-field input {
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  font-size: 11px;
}
.new-chat-form > .primary-button {
  margin-top: 3px;
}
.spinner {
  width: 14px;
  height: 14px;
  border: 2px solid #ffffff66;
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.conversation-header {
  display: flex;
  height: 67px;
  flex: 0 0 auto;
  align-items: center;
  gap: 11px;
  padding: 0 22px;
  border-bottom: 1px solid #f0f1f3;
}
.header-avatar {
  width: 37px;
  height: 37px;
}
.header-contact {
  display: grid;
  gap: 4px;
}
.header-contact-name {
  color: #373b42;
  font-size: 12px;
  font-weight: 600;
}
.header-contact-state {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #9ca1aa;
  font-size: 9px;
}
.online-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #55bd89;
  box-shadow: 0 0 0 2px #55bd891c;
}
.online-dot.is-offline {
  background: #e0a35f;
  box-shadow: 0 0 0 2px #e0a35f1c;
}
.header-actions {
  display: flex;
  gap: 3px;
  margin-left: auto;
}
.mobile-back {
  display: none;
}
.message-feed {
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  gap: 11px;
  overflow-y: auto;
  padding: 18px 28px 24px;
  scroll-behavior: smooth;
}
.date-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 8px;
}
.date-divider span {
  padding: 5px 10px;
  border: 1px solid #eff1f3;
  border-radius: 7px;
  background: #fff;
  color: #a0a5ad;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 0.7px;
}
.feed-empty {
  display: grid;
  justify-items: center;
  gap: 6px;
  margin: auto 0;
  color: #a4a8af;
  font-size: 10px;
}
.feed-lock {
  display: grid;
  width: 27px;
  height: 27px;
  margin-bottom: 4px;
  place-items: center;
  border-radius: 9px;
  background: #f4f7fa;
  color: #8da9c6;
}
.message-row {
  display: flex;
  width: 100%;
}
.message-row.incoming {
  justify-content: flex-start;
}
.message-row.outgoing {
  justify-content: flex-end;
}
.message-bubble {
  max-width: min(72%, 490px);
  padding: 10px 12px 7px;
  border: 1px solid #edf0f3;
  border-radius: 4px 13px 13px 13px;
  background: #f7f8fa;
  color: #42464e;
  font-size: 12px;
  line-height: 1.6;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}
.outgoing .message-bubble {
  border-color: #e1edfd;
  border-radius: 13px 4px 13px 13px;
  background: #edf5ff;
  color: #2e4053;
}
.message-meta {
  display: flex;
  height: 13px;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 2px;
  color: #a4a8af;
  font-size: 8px;
  line-height: 1;
}
.read-check {
  color: #599de9;
}
.pending-check {
  color: #a2abb6;
}
.compose-wrap {
  flex: 0 0 auto;
  padding: 0 23px 11px;
}
.compose-hint {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 8px 4px;
  color: #a3a7ae;
  font-size: 9px;
}
.hint-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #73c59c;
}
.composer {
  display: flex;
  min-height: 48px;
  align-items: center;
  gap: 8px;
  padding: 5px 6px 5px 15px;
  border: 1px solid #e9ebee;
  border-radius: 11px;
  background: #fff;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}
.composer:focus-within {
  border-color: #b8d4f5;
  box-shadow: 0 0 0 3px #3988ef0d;
}
.composer textarea {
  width: 100%;
  min-height: 24px;
  max-height: 112px;
  resize: vertical;
  border: 0;
  outline: 0;
  background: transparent;
  color: #353a42;
  font-size: 11px;
  line-height: 1.6;
}
.composer textarea::placeholder {
  color: #b0b4bc;
}
.draft-count {
  flex: 0 0 auto;
  color: #a5abb4;
  font-size: 8px;
}
.send-button {
  display: grid;
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  place-items: center;
  border: 0;
  border-radius: 9px;
  background: var(--blue);
  color: #fff;
  transition:
    background 0.15s,
    opacity 0.15s;
}
.send-button:hover:not(:disabled) {
  background: var(--blue-dark);
}
.send-button:disabled {
  background: #d9e1eb;
  color: #fff;
}
.compose-footnote {
  margin: 7px 2px 0;
  color: #adb1b8;
  font-size: 8px;
}
.compose-footnote span {
  margin: 0 4px;
  color: #d0d2d6;
}

.toast {
  position: fixed;
  z-index: 5;
  right: 27px;
  bottom: 25px;
  display: flex;
  max-width: min(420px, calc(100vw - 30px));
  align-items: flex-start;
  gap: 14px;
  padding: 13px 14px;
  border: 1px solid #f2d1d1;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 8px 30px #252b361a;
  color: #884b4b;
  font-size: 11px;
  line-height: 1.55;
}
.toast-notice {
  border-color: #dcebdd;
  color: #467654;
}
.toast button {
  flex: 0 0 auto;
  padding: 0;
  border: 0;
  background: transparent;
  color: #9499a0;
}
.floating-status {
  position: fixed;
  right: 22px;
  bottom: 18px;
  display: flex;
  align-items: center;
  gap: 7px;
  color: #a3a7ae;
  font-size: 9px;
}
.status-pulse {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #5fc18e;
  box-shadow: 0 0 0 3px #5fc18e19;
}
.status-pulse.is-offline {
  background: #e0a35f;
  box-shadow: 0 0 0 3px #e0a35f19;
}
.fatal-error {
  display: grid;
  min-height: 100vh;
  align-content: center;
  justify-items: center;
  padding: 24px;
  text-align: center;
}
.fatal-error h1 {
  margin: 0;
  font:
    700 21px "Manrope",
    sans-serif;
}
.fatal-error p {
  color: var(--muted);
}
.fatal-error button {
  margin-top: 20px;
  padding: 11px 16px;
  border: 0;
  border-radius: 9px;
  background: var(--blue);
  color: white;
}

@media (min-width: 761px) {
  .sidebar-bottom {
    color: #737882;
    font-size: 15px;
  }

  .new-chat-state > .state-copy,
  .new-chat-form > label {
    font-size: 15px;
  }

  .sidebar-blank > span,
  .chat-list-preview,
  .conversation-empty > p {
    color: #737882;
    font-size: 16px;
    line-height: 1.6;
  }

  .feed-empty {
    gap: 10px;
    color: #737882;
    font-size: 17px;
    line-height: 1.6;
    text-align: center;
  }

  .compose-hint,
  .chat-list-time,
  .header-contact-state,
  .setup-reminder,
  .floating-status {
    color: #737882;
    font-size: 14px;
  }

  .sidebar-blank > button,
  .primary-button,
  .start-chat-cta {
    font-size: 16px;
  }

  .settings-state > .eyebrow {
    font-size: 14px;
  }

  .settings-state > .api-setup-note {
    font-size: 14px;
    line-height: 1.7;
  }

  .settings-state > .api-setup-note code {
    font-size: 14px;
  }

  .settings-state > .setup-reminder {
    font-size: 14px;
  }

  .eyebrow {
    font-size: 14px;
  }

  .plus-mark {
    font-size: 0;
  }

  .chat-list-preview,
  .sidebar-blank > span {
    font-size: 16px;
  }

  .chat-list-time,
  .date-divider span,
  .message-meta,
  .draft-count,
  .compose-footnote,
  .setup-reminder {
    font-size: 13px;
  }

  .compose-hint,
  .floating-status,
  .header-contact-state {
    font-size: 15px;
  }

  .toast {
    font-size: 16px;
  }
}

@media (max-width: 760px) {
  .topbar {
    height: 40px;
    margin-bottom: 13px;
  }
  .brand {
    font-size: 18px;
  }
  .brand-mark {
    width: 29px;
    height: 29px;
  }
  .service-label {
    padding-left: 9px;
    font-size: 9px;
  }
  .settings-toggle {
    width: 34px;
    height: 34px;
    justify-content: center;
    padding: 0;
  }
  .settings-toggle span {
    display: none;
  }
  .chat-sidebar {
    width: 100%;
    height: 100%;
    padding: 18px 15px 13px;
    border-right: 0;
  }
  .chat-sidebar.mobile-hidden {
    display: none;
  }
  .conversation {
    display: none;
    width: 100%;
    height: 100%;
  }
  .conversation.mobile-active {
    display: flex;
  }
  .conversation-header {
    height: 59px;
    gap: 9px;
    padding: 0 13px;
  }
  .mobile-back {
    display: inline-grid;
    width: 31px;
    height: 31px;
    margin-left: -5px;
  }
  .close-chat-button {
    display: none;
  }
  .message-feed {
    padding: 15px 15px 20px;
  }
  .message-bubble {
    max-width: 84%;
    font-size: 11px;
  }
  .compose-wrap {
    padding: 0 10px 9px;
  }
  .composer {
    padding-left: 11px;
  }
  .conversation-empty {
    padding: 23px 15px;
  }
  .conversation-empty h2 {
    font-size: 22px;
  }
  .settings-state {
    width: min(430px, 100%);
    padding: 28px 23px;
  }
  .back-link {
    left: 22px;
  }
  .sidebar-search {
    margin-top: 16px;
  }
  .sidebar-blank {
    padding-bottom: 35px;
  }
  .floating-status {
    right: 16px;
    bottom: 11px;
  }
}

@media (max-width: 380px) {
  .service-label {
    font-size: 8px;
  }
  .topbar {
    gap: 9px;
  }
  .settings-state {
    padding-right: 18px;
    padding-left: 18px;
  }
  .conversation-empty > p {
    font-size: 10px;
  }
  .desktop-break {
    display: none;
  }
}
`;

export default GlobalStyles;
