import {theme} from '../config/theme';
import {Reveal} from './Primitives';

export const LayerStack = ({active, frame}: {active: 'ip' | 'transport'; frame: number}) =>
  <div style={{width: 450, display: 'flex', flexDirection: 'column', gap: 16}}>
    {['Aplikasi', 'Transport', 'Internet (IP)', 'Akses Jaringan'].map((label, i) => {
      const highlighted = active === 'ip' ? i === 2 : i === 1;
      return <Reveal key={label} frame={frame} delay={(3 - i) * 8}>
        <div style={{padding: '25px 32px', border: `2px solid ${highlighted ? theme.text : theme.line}`,
          background: highlighted ? '#23324A' : theme.surface, borderRadius: 8, fontSize: 36, fontWeight: 600,
          color: highlighted ? theme.text : theme.muted}}>{label}</div>
      </Reveal>;
    })}
  </div>;
