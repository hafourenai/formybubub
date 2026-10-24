import {theme} from '../config/theme';
import {PacketFlight} from './PacketFlight';
import {Icon, type IconName} from './Icons';
import {Host} from './Host';

export const NetworkGraph = ({frame, distributed = false}: {frame: number; distributed?: boolean}) => {
  const nodes: {x: number; y: number; label?: string; icon?: IconName}[] = distributed ? [
    {x: 130, y: 260, label: 'Klien'}, {x: 780, y: 260, label: 'Server aplikasi'},
    {x: 1450, y: 90, label: 'Database', icon: 'database'}, {x: 1450, y: 410, label: 'Cache', icon: 'cache'},
  ] : [
    {x: 130, y: 110}, {x: 640, y: 60}, {x: 1220, y: 110},
    {x: 350, y: 390}, {x: 920, y: 390}, {x: 1550, y: 340},
  ];
  const edges = distributed ? [[0, 1], [1, 2], [1, 3]] : [[0, 1], [1, 2], [0, 3], [1, 3], [1, 4], [2, 5], [3, 4], [4, 5]];
  return <div style={{position: 'absolute', inset: 0}}>
    <svg width="1728" height="590">
      {edges.map(([a, b], i) => <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
        stroke={distributed ? (i % 2 ? theme.udp : theme.tcp) : theme.line} strokeWidth="3"/>)}
    </svg>
    {edges.map(([a, b], i) => <PacketFlight key={i} start={nodes[a]} end={nodes[b]} dot
      progress={((frame + i * 27) % 150) / 150} color={distributed ? (i % 2 ? theme.udp : theme.tcp) : theme.muted}/>)}
    {nodes.map((node, i) => <div key={i} style={{position: 'absolute', left: node.x, top: node.y, transform: 'translate(-50%, -50%)',
      background: theme.background, padding: 18}}>
      {distributed ? <div style={{textAlign: 'center'}}>
        {node.icon ? <><Icon name={node.icon} size={94}/><div style={{fontSize: 32, marginTop: 12}}>{node.label}</div></> :
          <Host label={node.label ?? ''} server={i === 1} size={130}/>}
      </div> : <Host label="" size={90}/>}
    </div>)}
  </div>;
};
