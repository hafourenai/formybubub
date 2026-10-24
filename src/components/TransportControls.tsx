import {theme} from '../config/theme';
import {range} from '../lib/motion';
import {Icon} from './Icons';
import {PacketFlight} from './PacketFlight';
import {Label, Line} from './Primitives';

export const TransportControls = ({p}: {p: number}) => {
  const flow = range(p, 0, 0.48);
  const congestion = range(p, 0.50, 0.98);
  const fill = 0.28 + range(flow, 0, 0.38) * 0.56;
  return <div style={{display: 'flex', gap: 48, paddingTop: 30}}>
    <div style={{position: 'relative', width: 840, height: 510, background: theme.surface, opacity: p < 0.5 ? 1 : 0.32}}>
      <div style={{fontSize: 44, fontWeight: 600, margin: '30px 36px'}}>Kendali alur</div>
      <Line x1={140} y1={275} x2={650} y2={275}/>
      <Icon name="plane" size={80} color={theme.tcp} style={{position: 'absolute', left: 38, top: 235}}/>
      <div style={{position: 'absolute', left: 650, top: 175, width: 130, height: 200, border: `3px solid ${theme.tcp}`, borderTop: 0, overflow: 'hidden'}}>
        <div style={{position: 'absolute', bottom: 0, width: '100%', height: `${fill * 100}%`, background: `${theme.tcp}80`}}/>
        {[40, 80, 120, 160].map((y) => <div key={y} style={{position: 'absolute', top: y, left: 0, width: 18, height: 2, background: theme.text}}/>)}
      </div>
      <Label style={{position: 'absolute', left: 618, top: 390}}>Penerima</Label>
      {[0.02, 0.07, 0.12, 0.39, 0.68].map((start) => <PacketFlight key={start} start={{x: 160, y: 275}} end={{x: 650, y: 275}}
        progress={(flow - start) / (start > 0.2 ? 0.26 : 0.12)} color={theme.tcp} dot/>)}
      <svg style={{position: 'absolute', left: 170, top: 335}} width="410" height="70">
        <path d="M400 0v45H10l14-10M10 45l14 10" stroke={theme.muted} strokeWidth="2" fill="none"/>
      </svg>
      <Label style={{position: 'absolute', left: 220, top: 412}}>Window penerima</Label>
      <Label color={theme.tcp} style={{position: 'absolute', top: 102, left: 36, opacity: range(flow, 0.4, 0.5)}}>Laju pengirim turun</Label>
    </div>
    <div style={{position: 'relative', width: 840, height: 510, background: theme.surface, opacity: p >= 0.5 ? 1 : 0.32}}>
      <div style={{fontSize: 44, fontWeight: 600, margin: '30px 36px'}}>Kendali kemacetan</div>
      <Line x1={140} y1={275} x2={770} y2={275}/>
      <Icon name="plane" size={80} color={theme.tcp} style={{position: 'absolute', left: 38, top: 235}}/>
      <svg width="840" height="510" style={{position: 'absolute', inset: 0}}>
        <path d="M150 190h250l70 45h300M150 360h250l70-45h300" fill="none" stroke={theme.muted} strokeWidth="2"/>
      </svg>
      {Array.from({length: 8}, (_, i) => <div key={i} style={{position: 'absolute', left: 245 + (i % 4) * 40 + congestion * 45,
        top: 230 + Math.floor(i / 4) * 58, width: 24, height: 24, background: theme.tcp,
        opacity: 1 - range(congestion, 0.40 + i * 0.05, 0.65 + i * 0.04)}}/>)}
      {[0.01, 0.08, 0.15, 0.43, 0.72].map((start) => <PacketFlight key={start} start={{x: 155, y: 275}} end={{x: 755, y: 275}}
        progress={(congestion - start) / (start > 0.2 ? 0.26 : 0.13)} color={theme.tcp} dot/>)}
      <Label style={{position: 'absolute', top: 412, left: 245}}>Jaringan</Label>
      <Label color={theme.tcp} style={{position: 'absolute', top: 102, left: 36, opacity: range(congestion, 0.40, 0.50)}}>Laju pengirim turun</Label>
    </div>
  </div>;
};
