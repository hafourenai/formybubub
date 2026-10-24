import {theme} from '../config/theme';
import {clamp, ease, pointOnCurve, type Point} from '../lib/motion';
import {Packet} from './Packet';

export const PacketFlight = ({start, end, progress, color = theme.text, label, number, bend = 0,
  lost = false, dot = false, ports = false}: {
  start: Point; end: Point; progress: number; color?: string; label?: string; number?: number;
  bend?: number; lost?: boolean; dot?: boolean; ports?: boolean;
}) => {
  if (progress < 0 || progress > 1) return null;
  const p = ease(progress);
  if (lost && p > 0.65) return null;
  const position = pointOnCurve(start, end, p, bend);
  const disappearing = lost ? clamp((p - 0.45) / 0.2) : 0;
  const trail = Array.from({length: 12}, (_, i) => pointOnCurve(start, end, Math.max(0, p - i * 0.012), bend));
  return <>
    <svg style={{position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', opacity: (1 - disappearing) * 0.45}}>
      <polyline points={trail.map((point) => `${point.x},${point.y}`).join(' ')} fill="none" stroke={color} strokeWidth={dot ? 2 : 4}/>
    </svg>
    <div style={{position: 'absolute', left: position.x, top: position.y, opacity: 1 - disappearing,
      transform: `translate(-50%, -50%) scale(${1 - disappearing * 0.3})`}}>
      {dot ? <div style={{width: 12, height: 12, background: color, borderRadius: 3}}/> :
        <Packet label={label} color={disappearing > 0 ? theme.failure : color} number={number} ports={ports} compact={!label}/>}
    </div>
  </>;
};
