import {theme} from '../config/theme';
import {fonts} from '../config/fonts';
import {Icon} from './Icons';
import {Label, Reveal} from './Primitives';

export const PortDoors = ({mode = 'applications', frame, active = false}: {
  mode?: 'applications' | 'protocols'; frame: number; active?: boolean;
}) => <div style={{display: 'flex', gap: mode === 'protocols' ? 64 : 30, width: '100%'}}>
  {(mode === 'applications' ? [
    {title: 'Web', sub: ':80', icon: 'browser' as const, color: theme.text},
    {title: 'Email', sub: ':25', icon: 'email' as const, color: theme.text},
    {title: 'DNS', sub: ':53', icon: 'search' as const, color: theme.text},
  ] : [
    {title: 'UDP', sub: 'Sederhana dan cepat', icon: 'plane' as const, color: theme.udp},
    {title: 'TCP', sub: 'Andal dan terstruktur', icon: 'shield' as const, color: theme.tcp},
  ]).map((door, i) => <Reveal key={door.title} frame={frame} delay={i * 8} style={{flex: 1}}>
    <div style={{height: mode === 'protocols' ? 360 : 280, border: `2px solid ${active && i === 0 ? theme.success : door.color}80`,
      borderBottom: `7px solid ${active && i === 0 ? theme.success : door.color}`, background: theme.surface,
      padding: '30px 24px', textAlign: 'center', boxSizing: 'border-box', opacity: active && i !== 0 ? 0.4 : 1}}>
      <Icon name={door.icon} color={door.color} size={mode === 'protocols' ? 100 : 76}/>
      <div style={{fontSize: mode === 'protocols' ? 64 : 40, fontWeight: 600, color: door.color, marginTop: 14}}>{door.title}</div>
      <Label style={{marginTop: 12, fontFamily: mode === 'applications' ? fonts.mono : fonts.text}}>{door.sub}</Label>
    </div>
  </Reveal>)}
</div>;
