import {theme} from '../config/theme';
import {fonts} from '../config/fonts';

export const Host = ({label, sublabel, color = theme.muted, server = false, size = 180}: {
  label: string; sublabel?: string; color?: string; server?: boolean; size?: number;
}) => <div style={{width: Math.max(size, 220), textAlign: 'center'}}>
  <svg width={size} height={size * 0.78} viewBox="0 0 180 140" fill="none">
    {server ? <>
      {[12, 50, 88].map((y) => <g key={y}><rect x="35" y={y} width="110" height="30" rx="5" fill={theme.surface} stroke={color} strokeWidth="2.5"/>
        <circle cx="49" cy={y + 15} r="3" fill={color}/><path d={`M66 ${y + 15}h60`} stroke={color} strokeWidth="2"/></g>)}
    </> : <>
      <rect x="12" y="10" width="156" height="100" rx="8" fill={theme.surface} stroke={color} strokeWidth="3"/>
      <rect x="22" y="20" width="136" height="78" rx="2" fill={theme.background}/>
      <path d="M65 130h50M90 110v20" stroke={color} strokeWidth="3"/>
      <path d="m75 49-14 12 14 12m30-24 14 12-14 12" stroke={color} strokeWidth="3"/>
    </>}
  </svg>
  <div style={{fontSize: 36, fontWeight: 600, marginTop: 12}}>{label}</div>
  {sublabel && <div style={{fontFamily: fonts.mono, fontSize: 32, color: theme.muted, marginTop: 8, whiteSpace: 'nowrap'}}>{sublabel}</div>}
</div>;
