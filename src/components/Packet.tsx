import {theme} from '../config/theme';
import {fonts} from '../config/fonts';

export const Packet = ({label, color = theme.text, number, ports = false, compact = false}: {
  label?: string; color?: string; number?: number; ports?: boolean; compact?: boolean;
}) => <div style={{display: 'flex', flexDirection: 'column', gap: 8, minWidth: compact ? 66 : 130,
  padding: compact ? '12px 16px' : '16px 22px', border: `2px solid ${color}`, background: theme.background,
  borderRadius: 8, color, fontFamily: fonts.mono, boxSizing: 'border-box'}}>
  <div style={{display: 'flex', alignItems: 'center', gap: 18, justifyContent: 'center', fontSize: 32, fontWeight: 600, whiteSpace: 'nowrap'}}>
    {label}{number !== undefined && <span>{number}</span>}
  </div>
  {ports && <div style={{display: 'flex', gap: 20, borderTop: `1px solid ${color}60`, paddingTop: 8, fontSize: 32}}>
    <span>Src Port</span><span>Dst Port</span>
  </div>}
</div>;
