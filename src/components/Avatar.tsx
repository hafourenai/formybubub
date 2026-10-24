import {theme} from '../config/theme';

export const Avatar = ({mirrored = false}: {mirrored?: boolean}) =>
  <svg width="200" height="230" viewBox="0 0 200 230" fill="none" style={{transform: mirrored ? 'scaleX(-1)' : undefined}}>
    <circle cx="100" cy="75" r="44" fill={theme.surface} stroke={theme.muted} strokeWidth="3"/>
    <path d="M58 69c-5-57 84-60 87 4-16-2-38-17-44-27-9 14-24 22-43 23Z" fill={theme.muted}/>
    <path d="M90 91q13 10 23-1M23 223v-34c0-73 154-73 154 0v34z" stroke={theme.muted} strokeWidth="3" fill={theme.surface}/>
    <circle cx="86" cy="76" r="3" fill={theme.text}/><circle cx="117" cy="76" r="3" fill={theme.text}/>
    <path d="m76 146 24 24 24-24M100 170v53" stroke={theme.muted} strokeWidth="3"/>
  </svg>;
