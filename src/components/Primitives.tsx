import type {CSSProperties, ReactNode} from 'react';
import {theme} from '../config/theme';
import {fonts} from '../config/fonts';
import {arrive} from '../lib/motion';
import {Icon, type IconName} from './Icons';

export const Label = ({children, color = theme.muted, style}: {
  children: ReactNode; color?: string; style?: CSSProperties;
}) => <div style={{fontSize: 32, lineHeight: 1.4, color, ...style}}>{children}</div>;

export const Tag = ({children, color = theme.text, style}: {
  children: ReactNode; color?: string; style?: CSSProperties;
}) => <div style={{display: 'inline-flex', alignItems: 'center', gap: 14,
  border: `1px solid ${color}60`, background: theme.surface, color,
  borderRadius: 8, padding: '13px 24px', fontSize: 32, fontWeight: 600, ...style}}>{children}</div>;

export const ProtocolBadge = ({protocol, large = false}: {protocol: 'TCP' | 'UDP'; large?: boolean}) => {
  const color = protocol === 'TCP' ? theme.tcp : theme.udp;
  return <div style={{fontFamily: fonts.mono, fontWeight: 600, color,
    fontSize: large ? 112 : 64, lineHeight: 1, padding: large ? '38px 54px' : '26px 42px',
    border: `2px solid ${color}`, borderRadius: 12, background: theme.background}}>{protocol}</div>;
};

export const Reveal = ({frame, delay = 0, children, style, pop = false}: {
  frame: number; delay?: number; children: ReactNode; style?: CSSProperties; pop?: boolean;
}) => {
  const p = arrive(frame, delay, pop);
  return <div style={{opacity: Math.min(1, p), transform: `translateY(${(1 - p) * 24}px) scale(${pop ? 0.92 + p * 0.08 : 1})`, ...style}}>{children}</div>;
};

export const Uses = ({items, frame, color, spacing = 8}: {
  items: {icon: IconName; label: string; detail?: string}[]; frame: number; color: string; spacing?: number;
}) => <div style={{display: 'flex', gap: 32, alignItems: 'stretch', width: '100%'}}>
  {items.map((item, i) => <Reveal key={item.label} frame={frame} delay={i * spacing} style={{flex: 1}}>
    <div style={{height: 310, borderTop: `3px solid ${color}`, background: theme.surface,
      padding: '38px 30px', boxSizing: 'border-box'}}>
      <Icon name={item.icon} size={88} color={color} style={{transform: `translateY(${Math.sin((frame - i * spacing) / 22) * 3}px)`}}/>
      <div style={{fontSize: 38, fontWeight: 600, marginTop: 22}}>{item.label}</div>
      {item.detail && <Label style={{marginTop: 8}}>{item.detail}</Label>}
    </div>
  </Reveal>)}
</div>;

export const Line = ({x1, y1, x2, y2, color = theme.line, dashed = false, progress = 1, width = 3}: {
  x1: number; y1: number; x2: number; y2: number; color?: string; dashed?: boolean; progress?: number; width?: number;
}) => <svg style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible'}}>
  <line x1={x1} y1={y1} x2={x1 + (x2 - x1) * progress} y2={y1 + (y2 - y1) * progress}
    stroke={color} strokeWidth={width} strokeDasharray={dashed ? '10 12' : undefined}/>
</svg>;
