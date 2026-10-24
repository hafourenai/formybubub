import {theme} from '../config/theme';
import {fonts} from '../config/fonts';
import {ease, range} from '../lib/motion';
import {Tag} from './Primitives';
import {Icon} from './Icons';

type Message = {label: string; direction: 'right' | 'left'; at: number; color?: string};
export const SequenceDiagram = ({progress, messages, completeAt = 0.8, closing = false}: {
  progress: number; messages: Message[]; completeAt?: number; closing?: boolean;
}) => {
  const complete = progress >= completeAt;
  const state = complete && !closing ? theme.success : theme.tcp;
  return <div style={{position: 'absolute', inset: 0}}>
    <svg width="1728" height="580" viewBox="0 0 1728 580">
      {[360, 1368].map((x) => <g key={x} opacity={closing && complete ? 0.3 : 1}>
        <rect x={x - 135} y="8" width="270" height="70" rx="8" fill={theme.surface} stroke={state} strokeWidth="2"/>
        <text x={x} y="54" textAnchor="middle" fontSize="36" fill={theme.text} fontFamily={fonts.text}>{x === 360 ? 'Klien' : 'Server'}</text>
        <line x1={x} y1="90" x2={x} y2="465" stroke={state} strokeWidth="3" strokeDasharray={complete ? undefined : '6 9'}/>
      </g>)}
      {messages.map((message, i) => {
        const p = ease(range(progress, message.at, message.at + 0.10));
        const right = message.direction === 'right';
        const from = right ? 360 : 1368;
        const to = right ? 1368 : 360;
        const y = 145 + i * (messages.length === 4 ? 85 : 115);
        const x = from + (to - from) * p;
        const color = message.color ?? theme.tcp;
        return <g key={`${message.label}-${i}`} opacity={progress < message.at ? 0 : 1}>
          <line x1={from} y1={y} x2={x} y2={y} stroke={color} strokeWidth="4"/>
          <path d={right ? `M${x - 14} ${y - 8}L${x} ${y}L${x - 14} ${y + 8}` : `M${x + 14} ${y - 8}L${x} ${y}L${x + 14} ${y + 8}`}
            fill="none" stroke={color} strokeWidth="4"/>
          <rect x="694" y={y - 49} width="340" height="43" fill={theme.background}/>
          <text x="864" y={y - 17} textAnchor="middle" fill={color} fontSize="34" fontFamily={fonts.mono}>{i + 1} · {message.label}</text>
        </g>;
      })}
    </svg>
    <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: range(progress, completeAt, completeAt + 0.04)}}>
      <Tag color={closing ? theme.muted : theme.success}><Icon name="check" size={36} color={closing ? theme.muted : theme.success}/>
        {closing ? 'Koneksi ditutup' : 'Koneksi terbentuk (ESTABLISHED)'}
      </Tag>
    </div>
  </div>;
};
