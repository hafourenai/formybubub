import type {CSSProperties, ReactNode} from 'react';
import {theme} from '../config/theme';

export type IconName = 'browser' | 'email' | 'file' | 'chat' | 'video' | 'globe' |
  'phone' | 'postcard' | 'mailbox' | 'home' | 'game' | 'broadcast' | 'search' |
  'plane' | 'check' | 'cross' | 'clock' | 'shield' | 'router' | 'database' |
  'cache' | 'arrows' | 'handshake' | 'bolt' | 'pen';

const paths: Record<IconName, ReactNode> = {
  browser: <><rect x="8" y="11" width="48" height="42" rx="5"/><path d="M8 22h48M16 17h1m6 0h1M19 32h26M19 40h17"/></>,
  email: <><rect x="7" y="13" width="50" height="38" rx="5"/><path d="m9 16 23 19 23-19M9 49l16-17m30 17L39 32"/></>,
  file: <><path d="M15 6h23l12 12v40H15zM38 6v13h12M24 31h17M24 41h17M24 50h10"/></>,
  chat: <><path d="M8 10h48v34H29L16 55V44H8zM18 23h28M18 32h20"/></>,
  video: <><rect x="6" y="14" width="35" height="36" rx="6"/><path d="m41 25 16-9v32l-16-9z"/></>,
  globe: <><circle cx="32" cy="32" r="25"/><ellipse cx="32" cy="32" rx="12" ry="25"/><path d="M8 25h48M8 39h48"/></>,
  phone: <path d="M17 7 8 14c-4 15 27 47 42 42l8-9-14-12-8 7c-8-4-13-9-16-16l7-7z"/>,
  postcard: <><rect x="6" y="12" width="52" height="40" rx="3"/><path d="M33 18v28M40 20h10v10H40zM39 37h12M39 43h10M13 23h13M13 31h9"/></>,
  mailbox: <><path d="M9 44V24a12 12 0 0 1 24 0v20zM21 12h23a12 12 0 0 1 12 12v20H33M15 27h12M44 44v14M44 29V6h11v10H44"/></>,
  home: <><path d="m5 29 27-23 27 23M13 24v33h38V24M26 57V39h12v18"/></>,
  game: <><path d="M18 18h28c8 0 18 32 10 35-6 3-13-9-16-9H24c-3 0-10 12-16 9-8-3 2-35 10-35zM20 25v14M13 32h14M43 29h1m7 8h1"/></>,
  broadcast: <><circle cx="32" cy="34" r="4"/><path d="M32 38v19M21 22a17 17 0 0 0 0 24m22-24a17 17 0 0 1 0 24M13 13a29 29 0 0 0 0 41m38-41a29 29 0 0 1 0 41"/></>,
  search: <><circle cx="27" cy="27" r="18"/><path d="m40 40 17 17M18 27h18M27 18v18"/></>,
  plane: <path d="m6 28 52-22-18 52-12-22L6 28Zm22 8L58 6M28 36l-1 20 8-8"/>,
  check: <path d="m12 33 13 13 28-29"/>,
  cross: <path d="m15 15 34 34M49 15 15 49"/>,
  clock: <><circle cx="32" cy="32" r="25"/><path d="M32 14v19l12 8"/></>,
  shield: <><path d="m32 5 23 9v18c0 12-15 23-23 27C24 55 9 44 9 32V14z"/><path d="m20 31 9 9 16-18"/></>,
  router: <><rect x="8" y="30" width="48" height="23" rx="5"/><path d="M17 30V10M47 30V10M17 42h1m9 0h1M39 42h9M11 13l6-5 6 5M41 13l6-5 6 5"/></>,
  database: <><ellipse cx="32" cy="13" rx="23" ry="8"/><path d="M9 13v37c0 11 46 11 46 0V13M9 31c0 11 46 11 46 0"/></>,
  cache: <><rect x="13" y="13" width="38" height="38" rx="5"/><path d="M24 24h16v16H24zM23 5v8M41 5v8M23 51v8M41 51v8M5 23h8M5 41h8M51 23h8M51 41h8"/></>,
  arrows: <path d="M7 21h48L44 10M57 43H9l11 11"/>,
  handshake: <><path d="m5 25 12-14 13 7 10-7 19 15-10 12-9 12-9-1-16-14zM30 18l-9 11 7 5 11-9 13 10M10 19l12 13M19 39l8-8M26 45l8-9"/></>,
  bolt: <path d="m37 4-25 33h17l-2 23 26-36H35z"/>,
  pen: <><path d="m14 40-5 16 16-5L55 21 43 9zM37 15l12 12M14 40l11 11"/></>,
};

export const Icon = ({name, size = 64, color = theme.text, style}: {
  name: IconName; size?: number; color?: string; style?: CSSProperties;
}) => <svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={color}
  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
  {paths[name]}
</svg>;
