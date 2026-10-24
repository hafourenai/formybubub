import {theme} from '../config/theme';
import {fonts} from '../config/fonts';
import {Reveal} from './Primitives';

export const HeaderBar = ({protocol, frame = 100, comparison = false}: {
  protocol: 'UDP' | 'TCP'; frame?: number; comparison?: boolean;
}) => {
  const color = protocol === 'UDP' ? theme.udp : theme.tcp;
  const width = comparison ? (protocol === 'UDP' ? 560 : 1400) : 1480;
  return <div style={{width, maxWidth: '100%'}}>
    <div style={{fontSize: 36, fontWeight: 600, color, marginBottom: 22}}>{protocol} · header</div>
    <div style={{display: 'flex', height: comparison ? 80 : 120, border: `2px solid ${color}`, background: theme.surface}}>
      {protocol === 'UDP' && !comparison ? ['Source Port', 'Destination Port', 'Length', 'Checksum'].map((field, i) =>
        <Reveal key={field} frame={frame} delay={i * 8} style={{flex: 1, borderRight: i < 3 ? `1px solid ${color}` : undefined,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.mono, fontSize: 32, color}}>{field}</Reveal>) :
        Array.from({length: protocol === 'TCP' ? 20 : 8}, (_, i) => <div key={i} style={{flex: 1, borderRight: `1px solid ${color}60`,
          background: i % 2 ? `${color}12` : 'transparent'}}/>)}
    </div>
    <div style={{height: 20, border: `2px solid ${color}80`, borderTop: 0, marginTop: 12}}/>
    <div style={{textAlign: 'center', fontSize: 40, color, fontFamily: fonts.mono, marginTop: 10}}>
      {protocol === 'UDP' ? '8 byte' : 'Minimal 20 byte'}
    </div>
  </div>;
};
